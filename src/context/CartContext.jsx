/**
 * CartContext.jsx - Contexte global pour la gestion du panier
 * 
 * Ce contexte fournit les fonctionnalités de gestion du panier d'achat :
 * - Ajout/suppression de produits
 * - Modification des quantités
 * - Calculs des totaux
 * - Persistance dans le localStorage
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Actions pour le reducer du panier
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// État initial du panier
const initialCartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false
};

/**
 * Reducer pour gérer les actions du panier
 * @param {Object} state - État actuel du panier
 * @param {Object} action - Action à exécuter
 * @returns {Object} Nouvel état du panier
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, selectedSize, selectedColor } = action.payload;
      
      // Créer un identifiant unique pour les variantes du produit
      const itemId = `${product.id}-${selectedSize}-${selectedColor}`;
      
      // Vérifier si l'item existe déjà dans le panier
      const existingItemIndex = state.items.findIndex(item => item.id === itemId);
      
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Mettre à jour la quantité si l'item existe
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Ajouter un nouvel item
        const newItem = {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity,
          selectedSize,
          selectedColor,
          category: product.category
        };
        updatedItems = [...state.items, newItem];
      }
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item.id !== action.payload.itemId);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Si la quantité est 0 ou négative, supprimer l'item
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: { itemId } });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return initialCartState;
    
    case CART_ACTIONS.LOAD_CART: {
      const loadedCart = action.payload;
      return {
        ...loadedCart,
        totalItems: loadedCart.items.reduce((total, item) => total + item.quantity, 0),
        totalAmount: loadedCart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      };
    }
    
    default:
      return state;
  }
};

// Création du contexte
const CartContext = createContext();

/**
 * Hook personnalisé pour utiliser le contexte du panier
 * @returns {Object} Contexte du panier avec état et actions
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé à l\'intérieur d\'un CartProvider');
  }
  return context;
};

/**
 * Provider du contexte panier
 * @param {Object} props - Props du composant
 * @param {ReactNode} props.children - Composants enfants
 */
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('maef-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (cartState.items.length > 0 || cartState.totalItems > 0) {
      localStorage.setItem('maef-cart', JSON.stringify(cartState));
    }
  }, [cartState]);

  /**
   * Ajouter un produit au panier
   * @param {Object} product - Produit à ajouter
   * @param {number} quantity - Quantité à ajouter
   * @param {string} selectedSize - Taille sélectionnée
   * @param {string} selectedColor - Couleur sélectionnée
   */
  const addToCart = (product, quantity = 1, selectedSize = '', selectedColor = '') => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, selectedSize, selectedColor }
    });
  };

  /**
   * Supprimer un item du panier
   * @param {string} itemId - ID de l'item à supprimer
   */
  const removeFromCart = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { itemId }
    });
  };

  /**
   * Mettre à jour la quantité d'un item
   * @param {string} itemId - ID de l'item
   * @param {number} quantity - Nouvelle quantité
   */
  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity }
    });
  };

  /**
   * Vider complètement le panier
   */
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    localStorage.removeItem('maef-cart');
  };

  /**
   * Basculer l'ouverture/fermeture du drawer du panier
   */
  const toggleCart = () => {
    dispatch({
      type: 'TOGGLE_CART',
      payload: !cartState.isOpen
    });
  };

  // Fonctions utilitaires
  const getItemCount = () => cartState.totalItems;
  const getCartTotal = () => cartState.totalAmount;
  const isInCart = (productId, size = '', color = '') => {
    const itemId = `${productId}-${size}-${color}`;
    return cartState.items.some(item => item.id === itemId);
  };

  // Valeurs du contexte
  const contextValue = {
    // État du panier
    ...cartState,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    
    // Utilitaires
    getItemCount,
    getCartTotal,
    isInCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};