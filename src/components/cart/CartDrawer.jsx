/**
 * CartDrawer.jsx - Composant de panier coulissant pour Maef By Yas
 *
 * Ce composant affiche un drawer/tiroir coulissant avec :
 * - Liste des articles du panier
 * - Résumé rapide des prix
 * - Actions rapides (voir panier, commander)
 * - Animation d'ouverture/fermeture
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@hooks/useCart";
import CartItem from "./CartItem";
import { formatPrice } from "@utils/helpers";

/**
 * Composant CartDrawer principal
 */
const CartDrawer = ({ isOpen = false, onClose, className = "" }) => {
  const { items, totalItems, totalAmount, clearCart } = useCart();
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Gestion du focus et du scroll
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder l'élément qui avait le focus
      previousFocusRef.current = document.activeElement;

      // Bloquer le scroll du body
      document.body.style.overflow = "hidden";

      // Focus sur le drawer
      setTimeout(() => {
        drawerRef.current?.focus();
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

  // Gestion de la fermeture avec Échap
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  /**
   * Gestion du clic sur l'overlay
   */
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  /**
   * Trap focus dans le drawer
   */
  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      const focusableElements = drawerRef.current?.querySelectorAll(
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

  // Calculer les frais de livraison (simplifié)
  const freeShippingThreshold = 100;
  const shippingCost = totalAmount >= freeShippingThreshold ? 0 : 5.99;
  const finalTotal = totalAmount + shippingCost;

  const drawerContent = (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOverlayClick}
    >
      {/* Overlay sombre */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div
          ref={drawerRef}
          className={`relative w-screen max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } ${className}`}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* En-tête */}
          <div className="sticky top-0 z-10 bg-white border-b border-secondary-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2
                id="cart-drawer-title"
                className="text-lg font-semibold text-secondary-900"
              >
                Panier ({totalItems})
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contenu */}
          <div className="flex flex-col h-full">
            {/* Liste des articles */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                // Panier vide
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-secondary-300 mb-4" />
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">
                    Votre panier est vide
                  </h3>
                  <p className="text-secondary-600 mb-6">
                    Découvrez nos magnifiques produits africains
                  </p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Découvrir la boutique
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              ) : (
                // Articles du panier
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      compact={true}
                      showRemoveButton={true}
                      showQuantityControls={true}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Résumé et actions (uniquement si des articles) */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-secondary-200 px-6 py-4 space-y-4">
                {/* Résumé des prix */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Sous-total</span>
                    <span className="font-medium">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Livraison</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  <hr className="border-secondary-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Progression vers livraison gratuite */}
                {totalAmount < freeShippingThreshold && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      Plus que{" "}
                      {formatPrice(freeShippingThreshold - totalAmount)} pour la
                      livraison gratuite
                    </p>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (totalAmount / freeShippingThreshold) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="space-y-3">
                  {/* Voir le panier complet */}
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="w-full block text-center py-3 border border-secondary-300 text-secondary-700 rounded-lg font-medium hover:bg-secondary-50 transition-colors"
                  >
                    Voir le panier complet
                  </Link>

                  {/* Procéder au paiement */}
                  <button
                    onClick={() => {
                      // Rediriger vers checkout (à implémenter)
                      onClose();
                    }}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                  >
                    Procéder au paiement
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>

                {/* Continuer les achats */}
                <button
                  onClick={onClose}
                  className="w-full text-sm text-secondary-600 hover:text-secondary-800 transition-colors py-2"
                >
                  Continuer les achats
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Ne pas rendre si pas ouvert
  if (!isOpen && typeof window === "undefined") {
    return null;
  }

  // Utiliser un portal pour rendre à la racine du DOM
  return createPortal(drawerContent, document.body);
};

CartDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CartDrawer;
