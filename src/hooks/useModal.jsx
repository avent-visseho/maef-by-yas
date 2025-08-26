/**
 * useModal.jsx - Hook personnalisé pour gérer les modals
 *
 * Ce hook fournit une API simple pour gérer l'état des modals :
 * - Ouverture/fermeture
 * - État de chargement
 * - Données du modal
 * - Callbacks personnalisés
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import { useState, useCallback, useRef } from "react";

/**
 * Hook personnalisé pour gérer l'état des modals
 * @param {boolean} initialState - État initial du modal (par défaut: false)
 * @param {Object} options - Options du modal
 * @returns {Object} - Objet contenant l'état et les fonctions de contrôle
 */
const useModal = (initialState = false, options = {}) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(options.initialData || null);
  const [error, setError] = useState(null);

  // Référence pour stocker les callbacks
  const callbacksRef = useRef({
    onOpen: options.onOpen,
    onClose: options.onClose,
    onConfirm: options.onConfirm,
  });

  // Mettre à jour les callbacks si les options changent
  callbacksRef.current = {
    onOpen: options.onOpen,
    onClose: options.onClose,
    onConfirm: options.onConfirm,
  };

  /**
   * Ouvrir le modal
   * @param {any} modalData - Données à passer au modal
   */
  const openModal = useCallback(async (modalData = null) => {
    try {
      setError(null);

      if (modalData) {
        setData(modalData);
      }

      setIsOpen(true);

      // Exécuter le callback d'ouverture s'il existe
      if (callbacksRef.current.onOpen) {
        await callbacksRef.current.onOpen(modalData);
      }
    } catch (err) {
      setError(err.message || "Erreur lors de l'ouverture du modal");
      console.error("Erreur openModal:", err);
    }
  }, []);

  /**
   * Fermer le modal
   * @param {any} result - Résultat à retourner
   */
  const closeModal = useCallback(
    async (result = null) => {
      try {
        setLoading(false);
        setError(null);

        // Exécuter le callback de fermeture s'il existe
        if (callbacksRef.current.onClose) {
          await callbacksRef.current.onClose(result, data);
        }

        setIsOpen(false);

        // Réinitialiser les données après un délai pour éviter les flash
        setTimeout(() => {
          setData(options.initialData || null);
        }, 300);
      } catch (err) {
        setError(err.message || "Erreur lors de la fermeture du modal");
        console.error("Erreur closeModal:", err);
      }
    },
    [data, options.initialData]
  );

  /**
   * Basculer l'état du modal
   * @param {any} modalData - Données pour l'ouverture
   */
  const toggleModal = useCallback(
    async (modalData = null) => {
      if (isOpen) {
        await closeModal();
      } else {
        await openModal(modalData);
      }
    },
    [isOpen, closeModal, openModal]
  );

  /**
   * Confirmer une action dans le modal
   * @param {any} confirmData - Données de confirmation
   */
  const confirmModal = useCallback(
    async (confirmData = null) => {
      if (!callbacksRef.current.onConfirm) {
        await closeModal(confirmData);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result = await callbacksRef.current.onConfirm(confirmData, data);

        // Fermer le modal après confirmation réussie
        await closeModal(result);
      } catch (err) {
        setError(err.message || "Erreur lors de la confirmation");
        console.error("Erreur confirmModal:", err);
        setLoading(false);
      }
    },
    [data, closeModal]
  );

  /**
   * Mettre à jour les données du modal
   * @param {any} newData - Nouvelles données
   */
  const updateData = useCallback((newData) => {
    setData((prevData) => {
      if (typeof newData === "function") {
        return newData(prevData);
      }
      return { ...prevData, ...newData };
    });
  }, []);

  /**
   * Réinitialiser l'état du modal
   */
  const resetModal = useCallback(() => {
    setIsOpen(false);
    setLoading(false);
    setData(options.initialData || null);
    setError(null);
  }, [options.initialData]);

  /**
   * Définir l'état de chargement
   * @param {boolean} isLoading - État de chargement
   */
  const setModalLoading = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  /**
   * Définir une erreur
   * @param {string|Error} errorMessage - Message d'erreur
   */
  const setModalError = useCallback((errorMessage) => {
    const message =
      typeof errorMessage === "string"
        ? errorMessage
        : errorMessage?.message || "Une erreur s'est produite";
    setError(message);
  }, []);

  /**
   * Effacer l'erreur
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // État
    isOpen,
    loading,
    data,
    error,

    // Actions principales
    openModal,
    closeModal,
    toggleModal,
    confirmModal,

    // Actions utilitaires
    updateData,
    resetModal,
    setModalLoading,
    setModalError,
    clearError,

    // Actions de base (pour compatibilité)
    setIsOpen,
  };
};

/**
 * Hook spécialisé pour les modals de confirmation
 * @param {Object} options - Options du modal de confirmation
 * @returns {Object} - API du modal de confirmation
 */
export const useConfirmModal = (options = {}) => {
  const modal = useModal(false, {
    ...options,
    onConfirm: options.onConfirm || (() => Promise.resolve(true)),
  });

  /**
   * Ouvrir le modal de confirmation
   * @param {string} message - Message de confirmation
   * @param {Object} config - Configuration du modal
   */
  const confirm = useCallback(
    async (message, config = {}) => {
      return new Promise((resolve, reject) => {
        const confirmData = {
          message,
          type: config.type || "warning",
          title: config.title || "Confirmation",
          confirmText: config.confirmText || "Confirmer",
          cancelText: config.cancelText || "Annuler",
          ...config,
        };

        modal.openModal(confirmData);

        // Remplacer temporairement les callbacks
        const originalOnConfirm = modal.confirmModal;
        const originalOnClose = modal.closeModal;

        modal.confirmModal = async () => {
          try {
            if (options.onConfirm) {
              await options.onConfirm();
            }
            resolve(true);
            originalOnClose();
          } catch (error) {
            reject(error);
          }
        };

        modal.closeModal = () => {
          resolve(false);
          originalOnClose();
        };
      });
    },
    [modal, options.onConfirm]
  );

  return {
    ...modal,
    confirm,
  };
};

/**
 * Hook spécialisé pour les modals d'alerte
 * @param {Object} options - Options du modal d'alerte
 * @returns {Object} - API du modal d'alerte
 */
export const useAlertModal = (options = {}) => {
  const modal = useModal(false, options);

  /**
   * Afficher une alerte
   * @param {string} message - Message d'alerte
   * @param {string} type - Type d'alerte ('success', 'error', 'warning', 'info')
   * @param {Object} config - Configuration supplémentaire
   */
  const alert = useCallback(
    (message, type = "info", config = {}) => {
      const alertData = {
        message,
        type,
        title:
          config.title ||
          {
            success: "Succès",
            error: "Erreur",
            warning: "Attention",
            info: "Information",
          }[type],
        ...config,
      };

      modal.openModal(alertData);
    },
    [modal]
  );

  /**
   * Raccourcis pour les différents types d'alerte
   */
  const success = useCallback(
    (message, config) => alert(message, "success", config),
    [alert]
  );
  const error = useCallback(
    (message, config) => alert(message, "error", config),
    [alert]
  );
  const warning = useCallback(
    (message, config) => alert(message, "warning", config),
    [alert]
  );
  const info = useCallback(
    (message, config) => alert(message, "info", config),
    [alert]
  );

  return {
    ...modal,
    alert,
    success,
    error,
    warning,
    info,
  };
};

export default useModal;
