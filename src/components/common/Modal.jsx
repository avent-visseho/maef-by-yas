import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

/**
 * Modal.jsx - Composant Modal réutilisable pour Maef By Yas
 *
 * Ce composant fournit différents types de modales :
 * - Modal simple avec contenu personnalisé
 * - Modal de confirmation
 * - Modal d'alerte
 * - Modal de formulaire
 * - Modal plein écran
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */
/**
 * Composant Modal principal
 * @param {Object} props - Props du composant
 * @param {boolean} props.isOpen - État d'ouverture du modal
 * @param {Function} props.onClose - Fonction de fermeture du modal
 * @param {React.ReactNode} props.children - Contenu du modal
 * @param {string} props.title - Titre du modal (optionnel)
 * @param {string} props.size - Taille du modal ('sm', 'md', 'lg', 'xl', 'full')
 * @param {string} props.type - Type de modal ('default', 'confirm', 'alert', 'success', 'error')
 * @param {boolean} props.closeOnOverlay - Fermer au clic sur l'overlay
 * @param {boolean} props.closeOnEsc - Fermer avec la touche Échap
 * @param {boolean} props.showCloseButton - Afficher le bouton de fermeture
 * @param {string} props.className - Classes CSS supplémentaires
 * @param {Function} props.onConfirm - Fonction de confirmation (pour les modals confirm)
 * @param {string} props.confirmText - Texte du bouton de confirmation
 * @param {string} props.cancelText - Texte du bouton d'annulation
 * @param {boolean} props.loading - État de chargement
 * @param {string} props.maxHeight - Hauteur maximale du modal
 */
const Modal = ({
  isOpen = false,
  onClose,
  children,
  title,
  size = "md",
  type = "default",
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = "",
  onConfirm,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  loading = false,
  maxHeight = "max-h-[90vh]",
  ...props
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Icônes selon le type de modal
  const typeIcons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    confirm: AlertTriangle,
  };

  // Couleurs selon le type
  const typeStyles = {
    success: {
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      bgColor: "bg-green-50",
    },
    error: {
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      bgColor: "bg-red-50",
    },
    warning: {
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
      bgColor: "bg-orange-50",
    },
    info: {
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
    },
    confirm: {
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
      bgColor: "bg-orange-50",
    },
  };

  // Gestion de la fermeture avec la touche Échap
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && closeOnEsc && isOpen && !loading) {
        onClose?.();
      }
    };

    if (isOpen && closeOnEsc) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, closeOnEsc, onClose, loading]);

  // Gestion du focus et du scroll
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder l'élément qui avait le focus
      previousFocusRef.current = document.activeElement;

      // Bloquer le scroll du body
      document.body.style.overflow = "hidden";

      // Focus sur le modal pour l'accessibilité
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      // Restaurer le scroll
      document.body.style.overflow = "unset";

      // Restaurer le focus précédent
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Gestion du clic sur l'overlay
  const handleOverlayClick = (event) => {
    if (closeOnOverlay && event.target === overlayRef.current && !loading) {
      onClose?.();
    }
  };

  // Gestionnaire de confirmation
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
  };

  // Trap focus dans le modal
  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    }
  };

  // Classes CSS pour les différentes tailles
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4 h-full",
  };

  // Classes d'animation selon le type
  const animationClasses = {
    default: "transform transition-all duration-300 ease-out",
    fullscreen: "transform transition-all duration-500 ease-out",
  };

  // Animations d'entrée/sortie
  const modalClasses = `
    fixed inset-0 z-50 flex items-center justify-center p-4
    transition-all duration-300 ease-in-out
    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
    ${size === "full" ? "p-0" : "p-4"}
  `;

  const contentClasses = `
    relative bg-white rounded-lg shadow-xl w-full overflow-hidden
    ${animationClasses.default}
    ${sizeClasses[size]}
    ${maxHeight}
    ${isOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"}
    ${size === "full" ? "rounded-none h-full" : ""}
    ${className}
  `;

  // Classes pour les différents types
  const currentTypeStyle = typeStyles[type] || {};
  const IconComponent = typeIcons[type];

  // Rendu du modal via portal
  const modalContent = (
    <div
      ref={overlayRef}
      className={modalClasses}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby="modal-description"
      {...props}
    >
      {/* Overlay sombre */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        aria-hidden="true"
      />

      {/* Contenu du modal */}
      <div
        ref={modalRef}
        className={contentClasses}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête avec titre et bouton de fermeture */}
        {(title || showCloseButton) && (
          <div
            className={`flex items-center justify-between p-6 border-b border-secondary-200 ${
              currentTypeStyle.bgColor || ""
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* Icône selon le type */}
              {IconComponent && (
                <div className={`p-2 rounded-full ${currentTypeStyle.bgColor}`}>
                  <IconComponent
                    className={`w-6 h-6 ${currentTypeStyle.iconColor}`}
                  />
                </div>
              )}

              {title && (
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-secondary-900"
                >
                  {title}
                </h2>
              )}
            </div>

            {showCloseButton && onClose && (
              <button
                onClick={onClose}
                disabled={loading}
                className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Fermer le modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Contenu principal */}
        <div className="flex-1 overflow-y-auto">
          <div id="modal-description" className="p-6">
            {children}
          </div>
        </div>

        {/* Boutons d'action pour les modals de confirmation */}
        {(type === "confirm" || onConfirm) && (
          <div className="flex justify-end space-x-3 p-6 border-t border-secondary-200 bg-secondary-50">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-secondary-700 bg-white border border-secondary-300 hover:bg-secondary-50 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                type === "error"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : type === "warning"
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                  : "bg-primary-600 hover:bg-primary-700 text-white"
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Chargement...</span>
                </div>
              ) : (
                confirmText
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Ne pas rendre si le modal n'est pas ouvert
  if (!isOpen) {
    return null;
  }

  // Utiliser un portal pour rendre le modal à la racine du DOM
  return createPortal(modalContent, document.body);
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
  type: PropTypes.oneOf([
    "default",
    "confirm",
    "alert",
    "success",
    "error",
    "warning",
    "info",
  ]),
  closeOnOverlay: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
  maxHeight: PropTypes.string,
};

/**
 * Composant ConfirmModal spécialisé pour les confirmations
 */
export const ConfirmModal = ({ message, variant = "warning", ...props }) => {
  return (
    <Modal type={variant} size="sm" {...props}>
      <p className="text-secondary-700 text-base leading-relaxed">{message}</p>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["warning", "error", "info"]),
};

/**
 * Composant AlertModal pour les alertes
 */
export const AlertModal = ({ message, type = "info", ...props }) => {
  return (
    <Modal type={type} size="sm" showCloseButton={true} {...props}>
      <p className="text-secondary-700 text-base leading-relaxed">{message}</p>
    </Modal>
  );
};

AlertModal.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
};

export default Modal;
