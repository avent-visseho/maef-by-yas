/**
 * CartSummary.jsx - Composant de résumé du panier pour Maef By Yas
 *
 * Ce composant affiche :
 * - Récapitulatif des prix (sous-total, frais de port, total)
 * - Informations sur la livraison gratuite
 * - Boutons d'action (continuer les achats, passer commande)
 * - Code promo (fonctionnalité future)
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ShoppingBag, Truck, Gift, Lock, CreditCard } from "lucide-react";
import { useCart } from "@hooks/useCart";
import { formatPrice } from "@utils/helpers";
import { CART_CONFIG } from "@utils/constants";

/**
 * Composant CartSummary principal
 */
const CartSummary = ({
  className = "",
  showActions = true,
  showPromoCode = true,
  compact = false,
}) => {
  const { items, totalItems, totalAmount } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Calculs des prix
  const subtotal = totalAmount;
  const promoDiscount = appliedPromo
    ? (subtotal * appliedPromo.percentage) / 100
    : 0;
  const subtotalAfterPromo = subtotal - promoDiscount;

  // Frais de livraison
  const freeShippingThreshold = CART_CONFIG.FREE_SHIPPING_THRESHOLD;
  const shippingCost = subtotalAfterPromo >= freeShippingThreshold ? 0 : 5.99;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotalAfterPromo
  );

  // Total final
  const finalTotal = subtotalAfterPromo + shippingCost;

  /**
   * Gestionnaire d'application du code promo
   */
  const handleApplyPromo = async (e) => {
    e.preventDefault();

    if (!promoCode.trim()) return;

    setPromoLoading(true);
    setPromoError("");

    try {
      // Simulation d'appel API pour valider le code promo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Codes promo fictifs pour la démo
      const mockPromoCodes = {
        WELCOME10: {
          percentage: 10,
          description: "Bienvenue - 10% de réduction",
        },
        SUMMER15: { percentage: 15, description: "Été - 15% de réduction" },
        MAEF20: {
          percentage: 20,
          description: "Code spécial - 20% de réduction",
        },
      };

      const promo = mockPromoCodes[promoCode.toUpperCase()];

      if (promo) {
        setAppliedPromo({
          code: promoCode.toUpperCase(),
          ...promo,
        });
        setPromoCode("");
      } else {
        setPromoError("Code promo invalide");
      }
    } catch (error) {
      setPromoError("Erreur lors de l'application du code");
    } finally {
      setPromoLoading(false);
    }
  };

  /**
   * Supprimer le code promo appliqué
   */
  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError("");
  };

  // Si le panier est vide, afficher un message
  if (totalItems === 0) {
    return (
      <div
        className={`bg-white rounded-lg border border-secondary-200 p-6 text-center ${className}`}
      >
        <ShoppingBag className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">
          Votre panier est vide
        </h3>
        <p className="text-secondary-600 mb-4">
          Découvrez nos magnifiques produits africains authentiques
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Découvrir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg border border-secondary-200 ${className}`}
    >
      {/* En-tête */}
      <div className="p-6 border-b border-secondary-200">
        <h3
          className={`font-semibold text-secondary-900 ${
            compact ? "text-lg" : "text-xl"
          }`}
        >
          Résumé de la commande
        </h3>
        <p className="text-sm text-secondary-600 mt-1">
          {totalItems} article{totalItems > 1 ? "s" : ""} dans votre panier
        </p>
      </div>

      {/* Contenu principal */}
      <div className="p-6 space-y-4">
        {/* Sous-total */}
        <div className="flex justify-between items-center">
          <span className="text-secondary-700">Sous-total</span>
          <span className="font-medium text-secondary-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Code promo appliqué */}
        {appliedPromo && (
          <div className="flex justify-between items-center text-green-600">
            <span className="flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              {appliedPromo.description}
            </span>
            <span className="font-medium">-{formatPrice(promoDiscount)}</span>
            <button
              onClick={removePromo}
              className="ml-2 text-red-500 hover:text-red-700 text-xs"
            >
              Retirer
            </button>
          </div>
        )}

        {/* Frais de livraison */}
        <div className="flex justify-between items-center">
          <span className="flex items-center text-secondary-700">
            <Truck className="w-4 h-4 mr-2" />
            Livraison
          </span>
          <span className="font-medium text-secondary-900">
            {shippingCost === 0 ? (
              <span className="text-green-600">Gratuite</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>

        {/* Progression vers la livraison gratuite */}
        {remainingForFreeShipping > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center text-blue-800 mb-2">
              <Truck className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                Plus que {formatPrice(remainingForFreeShipping)} pour la
                livraison gratuite !
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (subtotalAfterPromo / freeShippingThreshold) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Séparateur */}
        <hr className="border-secondary-200" />

        {/* Total final */}
        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-secondary-900">Total</span>
          <span className="text-primary-600">{formatPrice(finalTotal)}</span>
        </div>

        {/* Code promo */}
        {showPromoCode && !appliedPromo && (
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Code promo"
                className="flex-1 px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                disabled={promoLoading}
              />
              <button
                type="submit"
                disabled={promoLoading || !promoCode.trim()}
                className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
              >
                {promoLoading ? "Vérification..." : "Appliquer"}
              </button>
            </div>
            {promoError && <p className="text-red-600 text-sm">{promoError}</p>}
          </form>
        )}

        {/* Actions */}
        {showActions && (
          <div className="space-y-3 pt-4">
            {/* Bouton principal de commande */}
            <button
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              aria-label="Procéder au paiement"
            >
              <Lock className="w-5 h-5 mr-2" />
              Procéder au paiement
            </button>

            {/* Bouton continuer les achats */}
            <Link
              to="/shop"
              className="w-full block text-center py-3 border border-secondary-300 text-secondary-700 rounded-lg font-medium hover:bg-secondary-50 transition-colors"
            >
              Continuer les achats
            </Link>
          </div>
        )}

        {/* Garanties et sécurité */}
        <div className="pt-4 border-t border-secondary-200">
          <div className="grid grid-cols-1 gap-2 text-sm text-secondary-600">
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-2 text-green-600" />
              <span>Paiement 100% sécurisé</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-2 text-blue-600" />
              <span>Livraison en 2-5 jours ouvrés</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
              <span>Paiement en plusieurs fois disponible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  className: PropTypes.string,
  showActions: PropTypes.bool,
  showPromoCode: PropTypes.bool,
  compact: PropTypes.bool,
};

export default CartSummary;
