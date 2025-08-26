/**
 * useLocalStorage.jsx - Hook personnalisé pour la gestion du localStorage (Suite et fin)
 * 
 * Ce hook fournit une interface sécurisée et réactive pour interagir
 * avec le localStorage du navigateur, avec gestion des erreurs,
 * expiration des données et synchronisation entre onglets.
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { STORAGE_CONFIG } from '@utils/constants';

/**
 * Hook personnalisé pour le localStorage avec fonctionnalités avancées
 * 
 * @param {string} key - Clé de stockage
 * @param {*} initialValue - Valeur initiale par défaut
 * @param {Object} options - Options de configuration
 * @returns {Array} [value, setValue, removeValue, isLoading, error]
 */
export const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    expiry = null, // Durée d'expiration en millisecondes
    syncAcrossTabs = true,
    onError = null
  } = options;

  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Référence pour éviter les boucles infinies dans les effets
  const initialValueRef = useRef(initialValue);
  
  /**
   * Génère la clé de stockage avec métadonnées d'expiration
   */
  const getExpiryKey = useCallback((storageKey) => {
    return `${storageKey}_expiry`;
  }, []);

  /**
   * Vérifie si une donnée stockée est expirée
   */
  const isExpired = useCallback((storageKey) => {
    if (!expiry) return false;
    
    const expiryKey = getExpiryKey(storageKey);
    const expiryTime = localStorage.getItem(expiryKey);
    
    if (!expiryTime) return false;
    
    return Date.now() > parseInt(expiryTime);
  }, [expiry, getExpiryKey]);

  /**
   * Définit l'expiration d'une donnée
   */
  const setExpiry = useCallback((storageKey) => {
    if (!expiry) return;
    
    const expiryKey = getExpiryKey(storageKey);
    const expiryTime = Date.now() + expiry;
    localStorage.setItem(expiryKey, expiryTime.toString());
  }, [expiry, getExpiryKey]);

  /**
   * Lit une valeur du localStorage avec gestion d'erreurs
   */
  const readFromStorage = useCallback(() => {
    try {
      setError(null);
      
      // Vérifier si la donnée est expirée
      if (isExpired(key)) {
        localStorage.removeItem(key);
        localStorage.removeItem(getExpiryKey(key));
        return initialValueRef.current;
      }

      const item = localStorage.getItem(key);
      
      if (item === null) {
        return initialValueRef.current;
      }

      // Tenter de désérialiser la valeur
      try {
        return deserialize(item);
      } catch (deserializeError) {
        console.warn(`Erreur désérialisation pour la clé "${key}":`, deserializeError);
        // Si la désérialisation échoue, supprimer l'item corrompu
        localStorage.removeItem(key);
        return initialValueRef.current;
      }

    } catch (err) {
      const errorMessage = `Erreur lecture localStorage pour "${key}": ${err.message}`;
      console.error(errorMessage);
      setError(errorMessage);
      onError?.(err);
      return initialValueRef.current;
    }
  }, [key, deserialize, isExpired, getExpiryKey, onError]);

  /**
   * Écrit une valeur dans le localStorage
   */
  const writeToStorage = useCallback((value) => {
    try {
      setError(null);

      // Si la valeur est undefined, supprimer l'item
      if (value === undefined) {
        localStorage.removeItem(key);
        localStorage.removeItem(getExpiryKey(key));
        return;
      }

      // Sérialiser et stocker la valeur
      const serializedValue = serialize(value);
      localStorage.setItem(key, serializedValue);
      
      // Définir l'expiration si nécessaire
      setExpiry(key);

      // Déclencher l'événement storage pour la synchronisation
      if (syncAcrossTabs) {
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: serializedValue,
          oldValue: localStorage.getItem(key),
          storageArea: localStorage
        }));
      }

    } catch (err) {
      const errorMessage = `Erreur écriture localStorage pour "${key}": ${err.message}`;
      console.error(errorMessage);
      setError(errorMessage);
      onError?.(err);
    }
  }, [key, serialize, setExpiry, getExpiryKey, syncAcrossTabs, onError]);

  /**
   * Met à jour la valeur stockée
   */
  const setValue = useCallback((value) => {
    try {
      // Permettre à value d'être une fonction pour la mise à jour basée sur l'état précédent
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      writeToStorage(valueToStore);
    } catch (err) {
      console.error(`Erreur setValue pour "${key}":`, err);
      setError(err.message);
      onError?.(err);
    }
  }, [key, storedValue, writeToStorage, onError]);

  /**
   * Supprime la valeur du localStorage
   */
  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(getExpiryKey(key));
      setStoredValue(initialValueRef.current);
      setError(null);

      // Déclencher l'événement storage pour la synchronisation
      if (syncAcrossTabs) {
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: null,
          oldValue: localStorage.getItem(key),
          storageArea: localStorage
        }));
      }
    } catch (err) {
      console.error(`Erreur removeValue pour "${key}":`, err);
      setError(err.message);
      onError?.(err);
    }
  }, [key, getExpiryKey, syncAcrossTabs, onError]);

  /**
   * Gestionnaire pour les changements de localStorage depuis d'autres onglets
   */
  const handleStorageChange = useCallback((e) => {
    if (e.key === key && e.storageArea === localStorage) {
      if (e.newValue === null) {
        setStoredValue(initialValueRef.current);
      } else {
        try {
          const newValue = deserialize(e.newValue);
          setStoredValue(newValue);
        } catch (err) {
          console.error(`Erreur sync localStorage pour "${key}":`, err);
          setError(err.message);
        }
      }
    }
  }, [key, deserialize]);

  /**
   * Initialisation et nettoyage des event listeners
   */
  useEffect(() => {
    // Lire la valeur initiale
    const value = readFromStorage();
    setStoredValue(value);
    setIsLoading(false);

    // Ajouter l'event listener pour la synchronisation
    if (syncAcrossTabs) {
      window.addEventListener('storage', handleStorageChange);
    }

    // Nettoyage
    return () => {
      if (syncAcrossTabs) {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, [readFromStorage, handleStorageChange, syncAcrossTabs]);

  /**
   * Utilitaire pour vérifier si la valeur existe en localStorage
   */
  const hasValue = useCallback(() => {
    return localStorage.getItem(key) !== null && !isExpired(key);
  }, [key, isExpired]);

  /**
   * Utilitaire pour obtenir la taille de stockage utilisée par cette clé
   */
  const getStorageSize = useCallback(() => {
    const item = localStorage.getItem(key);
    const expiryItem = localStorage.getItem(getExpiryKey(key));
    
    let size = 0;
    if (item) size += item.length;
    if (expiryItem) size += expiryItem.length;
    
    return size; // En caractères
  }, [key, getExpiryKey]);

  /**
   * Met à jour seulement si la valeur a changé (évite les re-renders inutiles)
   */
  const setValueIfDifferent = useCallback((newValue) => {
    if (JSON.stringify(storedValue) !== JSON.stringify(newValue)) {
      setValue(newValue);
    }
  }, [storedValue, setValue]);

  return [
    storedValue, 
    setValue, 
    removeValue, 
    {
      isLoading,
      error,
      hasValue,
      getStorageSize,
      setValueIfDifferent,
      clearError: () => setError(null)
    }
  ];
};

/**
 * Hook spécialisé pour les préférences utilisateur
 */
export const useUserPreferences = (defaultPreferences = {}) => {
  return useLocalStorage(
    STORAGE_CONFIG.KEYS.PREFERENCES,
    defaultPreferences,
    {
      expiry: STORAGE_CONFIG.EXPIRY.PREFERENCES,
      syncAcrossTabs: true
    }
  );
};

/**
 * Hook spécialisé pour la langue
 */
export const useLanguage = (defaultLanguage = 'fr') => {
  return useLocalStorage(
    STORAGE_CONFIG.KEYS.LANGUAGE,
    defaultLanguage,
    {
      expiry: STORAGE_CONFIG.EXPIRY.PREFERENCES,
      syncAcrossTabs: true
    }
  );
};

/**
 * Hook spécialisé pour l'historique de navigation
 */
export const useNavigationHistory = () => {
  return useLocalStorage(
    'navigation-history',
    [],
    {
      expiry: STORAGE_CONFIG.EXPIRY.SESSION,
      serialize: (value) => JSON.stringify(value.slice(-10)), // Garder seulement les 10 dernières
      syncAcrossTabs: false
    }
  );
};

export default useLocalStorage;