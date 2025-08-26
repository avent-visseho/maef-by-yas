/**
 * CartItem.jsx - Composant d'item du panier pour Maef By Yas
 *
 * Ce composant affiche un produit dans le panier avec :
 * - Image et informations du produit
 * - Sélecteur de quantité
 * - Prix total
 * - Bouton de suppression
 * - Gestion des variantes (taille, couleur)
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Minus, Plus, Trash2, Heart, ExternalLink } from "lucide-react";
import { useCart } from "@hooks/useCart";
import {
  formatPrice,
  generateSlug,
  optimizeImageUrl,
  handleImageError,
} from "@utils/helpers";
import { CART_CONFIG } from "@utils/constants";

/**
 * Composant CartItem principal
 */
const CartItem = ({
  item,
  showRemoveButton = true,
  showQuantityControls = true,
  compact = false,
  className = "",
}) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * Met à jour la quantité d'un item
   */
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > CART_CONFIG.MAX_QUANTITY_PER_ITEM) {
      return;
    }

    setIsUpdating(true);
    try {
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Supprime un item du panier
   */
  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await removeFromCart(item.id);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Gestion du chargement d'image
   */
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  /**
   * Génère le lien vers la page produit
   */
  const productLink = `/product/${item.productId}`;
  const productSlug = generateSlug(item.name);

  // Prix total pour cet item
  const totalPrice = item.price * item.quantity;

  return (
    <div
      className={`bg-white border border-secondary-200 rounded-lg transition-all duration-200 hover:shadow-soft ${className}`}
    >
      <div className={`flex gap-4 p-4 ${compact ? "p-3" : "p-4"}`}>
        {/* Image du produit */}
        <div
          className={`flex-shrink-0 ${
            compact ? "w-16 h-16" : "w-20 h-20"
          } relative`}
        >
          <Link to={productLink} className="block w-full h-full group">
            {/* Placeholder pendant le chargement */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-secondary-200 rounded-md animate-pulse" />
            )}

            <img
              src={optimizeImageUrl(item.image, {
                width: compact ? 64 : 80,
                height: compact ? 64 : 80,
              })}
              alt={item.name}
              className={`w-full h-full object-cover rounded-md transition-transform group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={(e) => handleImageError(e)}
            />

            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-colors rounded-md flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </div>

        {/* Informations du produit */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              {/* Nom du produit */}
              <Link
                to={productLink}
                className="block font-medium text-secondary-900 hover:text-primary-600 transition-colors"
              >
                <h3 className={`truncate ${compact ? "text-sm" : "text-base"}`}>
                  {item.name}
                </h3>
              </Link>

              {/* Variantes (taille, couleur) */}
              {(item.selectedSize || item.selectedColor) && (
                <div
                  className={`flex flex-wrap gap-2 mt-1 ${
                    compact ? "text-xs" : "text-sm"
                  } text-secondary-600`}
                >
                  {item.selectedSize && (
                    <span className="bg-secondary-100 px-2 py-1 rounded-full">
                      Taille: {item.selectedSize}
                    </span>
                  )}
                  {item.selectedColor && (
                    <span className="bg-secondary-100 px-2 py-1 rounded-full">
                      Couleur: {item.selectedColor}
                    </span>
                  )}
                </div>
              )}

              {/* Prix unitaire */}
              <p
                className={`mt-1 font-semibold text-primary-600 ${
                  compact ? "text-sm" : "text-base"
                }`}
              >
                {formatPrice(item.price)}
                {item.quantity > 1 && (
                  <span className="text-secondary-500 font-normal ml-1">
                    × {item.quantity}
                  </span>
                )}
              </p>
            </div>

            {/* Bouton de suppression */}
            {showRemoveButton && (
              <button
                onClick={handleRemove}
                disabled={isUpdating}
                className="p-1 text-secondary-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                aria-label="Supprimer cet article"
              >
                <Trash2 className={`${compact ? "w-4 h-4" : "w-5 h-5"}`} />
              </button>
            )}
          </div>

          {/* Contrôles de quantité et prix total */}
          <div className="flex items-center justify-between mt-3">
            {showQuantityControls && (
              <div className="flex items-center space-x-2">
                {/* Bouton diminuer */}
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={isUpdating || item.quantity <= 1}
                  className="p-1 rounded-md border border-secondary-300 hover:border-primary-500 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="w-4 h-4 text-secondary-600" />
                </button>

                {/* Affichage de la quantité */}
                <span
                  className={`min-w-[2rem] text-center font-medium ${
                    compact ? "text-sm" : "text-base"
                  } text-secondary-900`}
                >
                  {isUpdating ? (
                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    item.quantity
                  )}
                </span>

                {/* Bouton augmenter */}
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={
                    isUpdating ||
                    item.quantity >= CART_CONFIG.MAX_QUANTITY_PER_ITEM
                  }
                  className="p-1 rounded-md border border-secondary-300 hover:border-primary-500 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="w-4 h-4 text-secondary-600" />
                </button>
              </div>
            )}

            {/* Prix total */}
            <div className="text-right">
              <p
                className={`font-bold text-secondary-900 ${
                  compact ? "text-sm" : "text-lg"
                }`}
              >
                {formatPrice(totalPrice)}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-secondary-500">
                  {formatPrice(item.price)} chacun
                </p>
              )}
            </div>
          </div>

          {/* Limite de quantité atteinte */}
          {item.quantity >= CART_CONFIG.MAX_QUANTITY_PER_ITEM && (
            <p className="text-xs text-orange-600 mt-1">
              Quantité maximum atteinte
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    selectedSize: PropTypes.string,
    selectedColor: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  showRemoveButton: PropTypes.bool,
  showQuantityControls: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string,
};

export default CartItem;
