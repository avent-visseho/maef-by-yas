/**
 * AuthContext.jsx - Contexte global pour la gestion de l'authentification
 * 
 * Ce contexte fournit les fonctionnalités d'authentification :
 * - Connexion/déconnexion
 * - Inscription
 * - Gestion de l'état utilisateur
 * - Persistance de la session
 * 
 * Note: Pour cette version front-end uniquement, la logique d'auth est simulée
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Actions pour le reducer d'authentification
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOAD_USER: 'LOAD_USER'
};

// État initial de l'authentification
const initialAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

/**
 * Reducer pour gérer les actions d'authentification
 * @param {Object} state - État actuel de l'auth
 * @param {Object} action - Action à exécuter
 * @returns {Object} Nouvel état de l'auth
 */
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialAuthState
      };

    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        isLoading: false
      };

    default:
      return state;
  }
};

// Création du contexte
const AuthContext = createContext();

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 * @returns {Object} Contexte d'auth avec état et actions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

/**
 * Provider du contexte d'authentification
 * @param {Object} props - Props du composant
 * @param {ReactNode} props.children - Composants enfants
 */
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('maef-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch({ 
          type: AUTH_ACTIONS.LOAD_USER, 
          payload: { user: parsedUser } 
        });
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        localStorage.removeItem('maef-user');
      }
    }
  }, []);

  /**
   * Simuler une connexion utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise} Promesse de connexion
   */
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // Simulation d'un appel API avec délai
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Vérifications basiques pour la démo
      if (!email || !password) {
        throw new Error('Email et mot de passe requis');
      }

      if (password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }

      // Créer un utilisateur factice
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+33 6 12 34 56 78',
        avatar: '/images/default-avatar.png',
        createdAt: new Date().toISOString(),
        preferences: {
          newsletter: true,
          notifications: true
        }
      };

      // Sauvegarder dans localStorage
      localStorage.setItem('maef-user', JSON.stringify(user));

      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_SUCCESS, 
        payload: { user } 
      });

      return { success: true, user };
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_FAILURE, 
        payload: { error: error.message } 
      });
      return { success: false, error: error.message };
    }
  };

  /**
   * Simuler une inscription utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise} Promesse d'inscription
   */
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1200));

      const { email, password, firstName, lastName, phone } = userData;

      // Validations basiques
      if (!email || !password || !firstName || !lastName) {
        throw new Error('Tous les champs obligatoires doivent être remplis');
      }

      if (password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Format d\'email invalide');
      }

      // Créer le nouvel utilisateur
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        firstName,
        lastName,
        phone: phone || '',
        avatar: '/images/default-avatar.png',
        createdAt: new Date().toISOString(),
        preferences: {
          newsletter: false,
          notifications: true
        }
      };

      // Sauvegarder dans localStorage
      localStorage.setItem('maef-user', JSON.stringify(user));

      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_SUCCESS, 
        payload: { user } 
      });

      return { success: true, user };
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_FAILURE, 
        payload: { error: error.message } 
      });
      return { success: false, error: error.message };
    }
  };

  /**
   * Déconnecter l'utilisateur
   */
  const logout = () => {
    localStorage.removeItem('maef-user');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  /**
   * Mettre à jour les informations utilisateur
   * @param {Object} updatedData - Nouvelles données utilisateur
   */
  const updateUser = (updatedData) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updatedData };
      localStorage.setItem('maef-user', JSON.stringify(updatedUser));
      dispatch({ 
        type: AUTH_ACTIONS.LOAD_USER, 
        payload: { user: updatedUser } 
      });
    }
  };

  /**
   * Réinitialiser les erreurs d'auth
   */
  const clearError = () => {
    dispatch({ 
      type: AUTH_ACTIONS.LOGIN_FAILURE, 
      payload: { error: null } 
    });
  };

  // Valeurs du contexte
  const contextValue = {
    // État
    ...authState,
    
    // Actions
    login,
    register,
    logout,
    updateUser,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};