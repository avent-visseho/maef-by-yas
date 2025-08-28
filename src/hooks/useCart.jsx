/**
 * useCart.jsx - Hook personnalisé pour la gestion du panier
 * 
 * Ce hook fournit une interface simplifiée pour interagir avec le contexte du panier.
 * Il inclut des fonctionnalités avancées comme les validations, les notifications
 * et la gestion des erreurs.
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import { useContext, useCallback, useMemo } from 'react';
import { CartContext } from '@context/CartContext';
import { CART_CONFIG, MESSAGES } from '@utils/constants';
import { generateUniqueId } from '@utils/helpers';

/**
 * Hook personnalisé pour la gestion du panier
 * 
 * Fournit des méthodes avancées pour manipuler le panier avec
 * validation, notifications et gestion d'erreurs intégrées.
 * 
 * @returns {Object} Objet contenant l'état du panier et les méthodes
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart doit être utilisé à l\'intérieur d\'un CartProvider');
  }

  const {
    items,
    totalItems,
    totalAmount,
    isOpen,
    addToCart: contextAddToCart,
    removeFromCart: contextRemoveFromCart,
    updateQuantity: contextUpdateQuantity,
    clearCart: contextClearCart,
    toggleCart,
    isInCart
  } = context;

  /**
   * Valide qu'un produit peut être ajouté au panier
   * @param {Object} product - Produit à valider
   * @param {number} quantity - Quantité demandée
   * @param {string} selectedSize - Taille sélectionnée
   * @param {string} selectedColor - Couleur sélectionnée
   * @returns {Object} Résultat de la validation
   */
  const validateAddToCart = useCallback((product, quantity, selectedSize, selectedColor) => {
    // Vérifications de base
    if (!product) {
      return { isValid: false, error: 'Produit non spécifié' };
    }

    if (!product.inStock) {
      return { isValid: false, error: MESSAGES.ERROR.OUT_OF_STOCK };
    }

    if (quantity <= 0) {
      return { isValid: false, error: 'Quantité invalide' };
    }

    if (quantity > CART_CONFIG.MAX_QUANTITY_PER_ITEM) {
      return { isValid: false, error: `Quantité maximum: ${CART_CONFIG.MAX_QUANTITY_PER_ITEM}` };
    }

    // Vérifier la quantité en stock
    if (product.quantity && quantity > product.quantity) {
      return { isValid: false, error: MESSAGES.ERROR.QUANTITY_EXCEEDED };
    }

    // Vérifier le nombre total d'articles dans le panier
    if (totalItems + quantity > CART_CONFIG.MAX_ITEMS) {
      return { isValid: false, error: MESSAGES.ERROR.CART_LIMIT_REACHED };
    }

    // Vérifier si les variantes sont requises
    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      return { isValid: false, error: 'Veuillez sélectionner une taille' };
    }

    if (product.colors && product.colors.length > 1 && !selectedColor) {
      return { isValid: false, error: 'Veuillez sélectionner une couleur' };
    }

    return { isValid: true };
  }, [totalItems]);

  /**
   * Ajoute un produit au panier avec validation
   * @param {Object} product - Produit à ajouter
   * @param {number} quantity - Quantité à ajouter
   * @param {string} selectedSize - Taille sélectionnée
   * @param {string} selectedColor - Couleur sélectionnée
   * @returns {Promise<Object>} Résultat de l'opération
   */
  const addToCart = useCallback(async (product, quantity = 1, selectedSize = '', selectedColor = '') => {
    try {
      // Validation
      const validation = validateAddToCart(product, quantity, selectedSize, selectedColor);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error,
          type: 'validation'
        };
      }

      // Ajouter au panier
      contextAddToCart(product, quantity, selectedSize, selectedColor);

      return {
        success: true,
        message: MESSAGES.SUCCESS.PRODUCT_ADDED_TO_CART,
        product,
        quantity,
        selectedSize,
        selectedColor
      };
    } catch (error) {
      console.error('Erreur ajout panier:', error);
      return {
        success: false,
        error: MESSAGES.ERROR.GENERIC,
        type: 'system'
      };
    }
  }, [contextAddToCart, validateAddToCart]);

  /**
   * Supprime un produit du panier avec confirmation
   * @param {string} itemId - ID de l'item à supprimer
   * @param {boolean} skipConfirmation - Skip la confirmation
   * @returns {Promise<Object>} Résultat de l'opération
   */
  const removeFromCart = useCallback(async (itemId, skipConfirmation = false) => {
    try {
      if (!itemId) {
        return { success: false, error: 'ID item manquant' };
      }

      // Trouver l'item
      const item = items.find(item => item.id === itemId);
      if (!item) {
        return { success: false, error: 'Produit non trouvé dans le panier' };
      }

      // Confirmation (peut être gérée par le composant appelant)
      if (!skipConfirmation) {
        const confirmed = window.confirm(`Supprimer "${item.name}" du panier ?`);
        if (!confirmed) {
          return { success: false, cancelled: true };
        }
      }

      contextRemoveFromCart(itemId);

      return {
        success: true,
        message: MESSAGES.SUCCESS.PRODUCT_REMOVED_FROM_CART,
        removedItem: item
      };
    } catch (error) {
      console.error('Erreur suppression panier:', error);
      return {
        success: false,
        error: MESSAGES.ERROR.GENERIC
      };
    }
  }, [items, contextRemoveFromCart]);

  /**
   * Met à jour la quantité d'un produit avec validation
   * @param {string} itemId - ID de l'item
   * @param {number} newQuantity - Nouvelle quantité
   * @returns {Promise<Object>} Résultat de l'opération
   */
  const updateQuantity = useCallback(async (itemId, newQuantity) => {
    try {
      if (!itemId || newQuantity < 0) {
        return { success: false, error: 'Paramètres invalides' };
      }

      // Si la quantité est 0, supprimer l'item
      if (newQuantity === 0) {
        return removeFromCart(itemId, true);
      }

      // Trouver l'item
      const item = items.find(item => item.id === itemId);
      if (!item) {
        return { success: false, error: 'Produit non trouvé' };
      }

      // Validations
      if (newQuantity > CART_CONFIG.MAX_QUANTITY_PER_ITEM) {
        return { 
          success: false, 
          error: `Quantité maximum: ${CART_CONFIG.MAX_QUANTITY_PER_ITEM}` 
        };
      }

      // Calculer la différence pour vérifier le total
      const quantityDiff = newQuantity - item.quantity;
      if (totalItems + quantityDiff > CART_CONFIG.MAX_ITEMS) {
        return { success: false, error: MESSAGES.ERROR.CART_LIMIT_REACHED };
      }

      contextUpdateQuantity(itemId, newQuantity);

      return {
        success: true,
        message: MESSAGES.SUCCESS.CART_UPDATED,
        item,
        oldQuantity: item.quantity,
        newQuantity
      };
    } catch (error) {
      console.error('Erreur mise à jour quantité:', error);
      return {
        success: false,
        error: MESSAGES.ERROR.GENERIC
      };
    }
  }, [items, totalItems, contextUpdateQuantity, removeFromCart]);

  /**
   * Vide le panier avec confirmation
   * @param {boolean} skipConfirmation - Skip la confirmation
   * @returns {Promise<Object>} Résultat de l'opération
   */
  const clearCart = useCallback(async (skipConfirmation = false) => {
    try {
      if (items.length === 0) {
        return { success: false, error: MESSAGES.ERROR.CART_EMPTY };
      }

      // Confirmation
      if (!skipConfirmation) {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir vider votre panier ?');
        if (!confirmed) {
          return { success: false, cancelled: true };
        }
      }

      const itemsCount = items.length;
      contextClearCart();

      return {
        success: true,
        message: MESSAGES.SUCCESS.CART_CLEARED,
        clearedItemsCount: itemsCount
      };
    } catch (error) {
      console.error('Erreur vidage panier:', error);
      return {
        success: false,
        error: MESSAGES.ERROR.GENERIC
      };
    }
  }, [items, contextClearCart]);

  /**
   * Calcule les détails de livraison
   * @returns {Object} Informations de livraison
   */
  const getShippingInfo = useMemo(() => {
    const freeShippingThreshold = CART_CONFIG.FREE_SHIPPING_THRESHOLD;
    const isFreeShipping = totalAmount >= freeShippingThreshold;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalAmount);
    
    return {
      isFreeShipping,
      threshold: freeShippingThreshold,
      remaining: remainingForFreeShipping,
      message: isFreeShipping 
        ? 'Livraison gratuite !' 
        : `Plus que ${remainingForFreeShipping.toFixed(2)}FCFA pour la livraison gratuite`
    };
  }, [totalAmount]);

  /**
   * Vérifie si le panier respecte le montant minimum de commande
   * @returns {Object} Informations sur le montant minimum
   */
  const getMinOrderInfo = useMemo(() => {
    const minOrderAmount = CART_CONFIG.MIN_ORDER_AMOUNT;
    const isValidOrder = totalAmount >= minOrderAmount;
    const remaining = Math.max(0, minOrderAmount - totalAmount);
    
    return {
      isValid: isValidOrder,
      minAmount: minOrderAmount,
      remaining,
      message: isValidOrder 
        ? 'Montant minimum atteint' 
        : `Montant minimum: ${minOrderAmount}FCFA (manque ${remaining.toFixed(2)}FCFA)`
    };
  }, [totalAmount]);

  /**
   * Obtient les statistiques du panier
   * @returns {Object} Statistiques détaillées
   */
  const getCartStats = useMemo(() => {
    if (items.length === 0) {
      return {
        isEmpty: true,
        totalItems: 0,
        totalAmount: 0,
        averageItemPrice: 0,
        categories: [],
        mostExpensiveItem: null,
        cheapestItem: null
      };
    }

    const categories = [...new Set(items.map(item => item.category))];
    const prices = items.map(item => item.price);
    const mostExpensiveItem = items.reduce((max, item) => 
      item.price > max.price ? item : max
    );
    const cheapestItem = items.reduce((min, item) => 
      item.price < min.price ? item : min
    );

    return {
      isEmpty: false,
      totalItems,
      totalAmount,
      averageItemPrice: totalAmount / totalItems,
      categories,
      uniqueProducts: items.length,
      mostExpensiveItem,
      cheapestItem,
      totalByCategory: categories.reduce((acc, category) => {
        acc[category] = items
          .filter(item => item.category === category)
          .reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return acc;
      }, {})
    };
  }, [items, totalItems, totalAmount]);

  /**
   * Trouve des produits similaires dans le panier
   * @param {string} productId - ID du produit de référence
   * @returns {Array} Liste des produits similaires
   */
  const getSimilarItemsInCart = useCallback((productId) => {
    const referenceItem = items.find(item => item.productId === productId);
    if (!referenceItem) return [];

    return items.filter(item => 
      item.productId !== productId && 
      item.category === referenceItem.category
    );
  }, [items]);

  /**
   * Génère un résumé textuel du panier
   * @returns {string} Résumé du panier
   */
  const getCartSummary = useCallback(() => {
    if (items.length === 0) {
      return 'Panier vide';
    }

    const stats = getCartStats;
    let summary = `${stats.totalItems} article${stats.totalItems > 1 ? 's' : ''} - ${totalAmount.toFixed(2)}FCFA`;
    
    if (stats.categories.length > 1) {
      summary += ` (${stats.categories.length} catégories)`;
    }

    return summary;
  }, [items, totalAmount, getCartStats]);

  /**
   * Exporte les données du panier (pour sauvegarde ou partage)
   * @returns {Object} Données exportables du panier
   */
  const exportCartData = useCallback(() => {
    return {
      items: items.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        category: item.category
      })),
      totals: {
        items: totalItems,
        amount: totalAmount
      },
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
  }, [items, totalItems, totalAmount]);

  /**
   * Recherche dans le panier
   * @param {string} query - Terme de recherche
   * @returns {Array} Items correspondants
   */
  const searchInCart = useCallback((query) => {
    if (!query.trim()) return items;
    
    const searchTerm = query.toLowerCase().trim();
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      (item.selectedColor && item.selectedColor.toLowerCase().includes(searchTerm)) ||
      (item.selectedSize && item.selectedSize.toLowerCase().includes(searchTerm))
    );
  }, [items]);

  // Retourner toutes les fonctionnalités
  return {
    // État du panier
    items,
    totalItems,
    totalAmount,
    isOpen,
    isEmpty: items.length === 0,

    // Actions de base
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,

    // Utilitaires
    isInCart,
    getShippingInfo,
    getMinOrderInfo,
    getCartStats,
    getSimilarItemsInCart,
    getCartSummary,
    exportCartData,
    searchInCart,

    // Méthodes de validation
    validateAddToCart,

    // Actions avancées
    openCart: () => !isOpen && toggleCart(),
    closeCart: () => isOpen && toggleCart(),

    // Raccourcis utiles
    canCheckout: getMinOrderInfo.isValid && totalItems > 0,
    hasItems: totalItems > 0,
    itemsCount: totalItems,
    formattedTotal: `${totalAmount.toFixed(2)}FCFA`
  };
};