/**
 * ProductCard.jsx - Composant carte produit pour Maef By Yas
 *
 * Ce composant gère :
 * - Affichage des informations produit
 * - Images avec hover et lightbox
 * - Actions rapides (favoris, panier)
 * - États de promotion et stock
 * - Mode compact pour vue liste
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Heart,
  ShoppingBag,
  Eye,
  Star,
  ShoppingCart,
  Zap,
  Tag,
  Truck,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@hooks/useCart";
import {
  formatPrice,
  calculateDiscountPercentage,
  optimizeImageUrl,
  handleImageError,
} from "@utils/helpers";

/**
 * Composant ProductCard principal
 */
const ProductCard = ({
  product,
  compact = false,
  showQuickActions = true,
  showRating = true,
  showDescription = false,
  onClick,
  onToggleFavorite,
  onQuickView,
  isFavorite = false,
  className = "",
}) => {
  const { addToCart, isInCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showQuickActionMenu, setShowQuickActionMenu] = useState(false);
  const cardRef = useRef(null);

  // Variables calculées
  const discountPercentage = calculateDiscountPercentage(
    product.originalPrice,
    product.price
  );
  const isOnSale = product.onSale && discountPercentage > 0;
  const isInCartAlready = isInCart(product.id);
  const mainImage =
    product.images?.[currentImageIndex] ||
    product.images?.[0] ||
    "/images/placeholder-product.jpg";
  const hasMultipleImages = product.images && product.images.length > 1;

  /**
   * Gestionnaire d'ajout au panier rapide
   */
  const handleQuickAddToCart = async (e) => {
    e.stopPropagation();
    if (isInCartAlready) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error("Erreur ajout panier rapide:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  /**
   * Gestionnaire de basculement des favoris
   */
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  /**
   * Gestionnaire de vue rapide
   */
  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  /**
   * Gestionnaire de clic sur la carte
   */
  const handleCardClick = () => {
    onClick?.(product);
  };

  /**
   * Gestionnaire de survol d'image
   */
  const handleImageHover = (index) => {
    if (hasMultipleImages) {
      setCurrentImageIndex(index);
    }
  };

  /**
   * Rendu des étoiles de notation
   */
  const renderStars = () => {
    if (!product.rating) return null;

    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(product.rating)
                ? "text-yellow-400 fill-current"
                : "text-secondary-300"
            }`}
          />
        ))}
        {product.reviews && (
          <span className="text-xs text-secondary-500 ml-1">
            ({product.reviews})
          </span>
        )}
      </div>
    );
  };

  /**
   * Rendu des badges (promotion, nouveau, etc.)
   */
  const renderBadges = () => {
    return (
      <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
        {isOnSale && (
          <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
            <Tag className="w-3 h-3 mr-1" />-{discountPercentage}%
          </div>
        )}
        {product.featured && (
          <div className="bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            Vedette
          </div>
        )}
        {product.trending && (
          <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            🔥 Tendance
          </div>
        )}
        {!product.inStock && (
          <div className="bg-secondary-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            Épuisé
          </div>
        )}
      </div>
    );
  };

  /**
   * Rendu des actions rapides
   */
  const renderQuickActions = () => {
    if (!showQuickActions) return null;

    return (
      <div
        className={`absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          compact ? "relative opacity-100" : ""
        }`}
      >
        {/* Favoris */}
        <button
          onClick={handleToggleFavorite}
          className={`p-2 rounded-full shadow-md transition-colors ${
            isFavorite
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-white text-secondary-600 hover:text-red-600 border border-secondary-200"
          }`}
          aria-label={
            isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
          }
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Vue rapide */}
        {onQuickView && (
          <button
            onClick={handleQuickView}
            className="p-2 bg-white text-secondary-600 hover:text-primary-600 rounded-full shadow-md transition-colors border border-secondary-200"
            aria-label="Vue rapide"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Ajout panier rapide */}
        {product.inStock && (
          <button
            onClick={handleQuickAddToCart}
            disabled={isAddingToCart || isInCartAlready}
            className={`p-2 rounded-full shadow-md transition-colors border ${
              isInCartAlready
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-white text-secondary-600 hover:text-primary-600 border-secondary-200"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={
              isInCartAlready ? "Dans le panier" : "Ajouter au panier"
            }
          >
            {isAddingToCart ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    );
  };

  /**
   * Rendu des indicateurs d'images multiples
   */
  const renderImageIndicators = () => {
    if (!hasMultipleImages || compact) return null;

    return (
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {product.images.slice(0, 3).map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              handleImageHover(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImageIndex
                ? "bg-white"
                : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    );
  };

  /**
   * Rendu en mode compact (liste)
   */
  if (compact) {
    return (
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 cursor-pointer group ${className}`}
      >
        <div className="flex p-4 space-x-4">
          {/* Image */}
          <div className="relative w-20 h-20 flex-shrink-0">
            {renderBadges()}
            <img
              src={optimizeImageUrl(mainImage, { width: 80, height: 80 })}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
              onLoad={() => setIsImageLoaded(true)}
              onError={handleImageError}
            />
          </div>

          {/* Informations */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-secondary-900 truncate mb-1">
              {product.name}
            </h3>

            {product.category && (
              <p className="text-sm text-secondary-500 capitalize mb-2">
                {product.category}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-secondary-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {showRating && product.rating && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-secondary-600 ml-1">
                    {product.rating}
                  </span>
                </div>
              )}
            </div>

            {showDescription && product.description && (
              <p className="text-sm text-secondary-600 mt-2 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-center">
            {renderQuickActions()}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Rendu en mode grille (par défaut)
   */
  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer group product-card ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        {renderBadges()}
        {renderQuickActions()}

        {!isImageLoaded && (
          <div className="absolute inset-0 bg-secondary-100 animate-pulse" />
        )}

        <img
          src={optimizeImageUrl(mainImage, { width: 400, height: 400 })}
          alt={product.name}
          className="w-full h-full object-cover product-image"
          onLoad={() => setIsImageLoaded(true)}
          onError={handleImageError}
          onMouseEnter={() => hasMultipleImages && handleImageHover(1)}
          onMouseLeave={() => hasMultipleImages && handleImageHover(0)}
        />

        {renderImageIndicators()}

        {/* Livraison gratuite */}
        {product.price >= 100 && (
          <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Truck className="w-3 h-3 mr-1" />
            Livraison gratuite
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4 space-y-3">
        {/* Titre et catégorie */}
        <div>
          <h3 className="font-semibold text-secondary-900 truncate mb-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {product.category && (
            <p className="text-sm text-secondary-500 capitalize">
              {product.category}
            </p>
          )}
        </div>

        {/* Prix */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-secondary-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        {showRating && renderStars()}

        {/* Description */}
        {showDescription && product.description && (
          <p className="text-sm text-secondary-600 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* État du stock */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm">
            {product.inStock ? (
              <span className="text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                En stock
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                Épuisé
              </span>
            )}
          </div>

          {/* Quantité restante faible */}
          {product.inStock && product.quantity && product.quantity < 10 && (
            <span className="text-xs text-orange-600">
              Plus que {product.quantity}
            </span>
          )}
        </div>

        {/* Bouton d'ajout au panier */}
        {product.inStock && (
          <button
            onClick={handleQuickAddToCart}
            disabled={isAddingToCart || isInCartAlready}
            className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
              isInCartAlready
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-primary-600 text-white hover:bg-primary-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isAddingToCart ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Ajout...
              </div>
            ) : isInCartAlready ? (
              <div className="flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Dans le panier
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Ajouter au panier
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    inStock: PropTypes.bool,
    quantity: PropTypes.number,
    featured: PropTypes.bool,
    trending: PropTypes.bool,
    onSale: PropTypes.bool,
  }).isRequired,
  compact: PropTypes.bool,
  showQuickActions: PropTypes.bool,
  showRating: PropTypes.bool,
  showDescription: PropTypes.bool,
  onClick: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  onQuickView: PropTypes.func,
  isFavorite: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Composant ProductCardSkeleton - Skeleton loader pour ProductCard
 */
export const ProductCardSkeleton = ({ compact = false, className = "" }) => {
  if (compact) {
    return (
      <div className={`bg-white rounded-lg shadow-soft p-4 ${className}`}>
        <div className="flex space-x-4">
          <div className="w-20 h-20 bg-secondary-200 rounded-md animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-secondary-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-secondary-200 rounded animate-pulse w-1/2" />
            <div className="h-4 bg-secondary-200 rounded animate-pulse w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-soft overflow-hidden ${className}`}
    >
      <div className="aspect-square bg-secondary-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-secondary-200 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-secondary-200 rounded animate-pulse w-1/2" />
        <div className="h-4 bg-secondary-200 rounded animate-pulse w-1/3" />
        <div className="h-8 bg-secondary-200 rounded animate-pulse w-full" />
      </div>
    </div>
  );
};

ProductCardSkeleton.propTypes = {
  compact: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Composant ProductCardGrid - Grille de cartes produits avec skeleton
 */
export const ProductCardGrid = ({
  products,
  loading = false,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  className = "",
  ...cardProps
}) => {
  const gridClasses = `grid gap-6 ${`grid-cols-${columns.xs} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg}`}`;

  if (loading) {
    return (
      <div className={`${gridClasses} ${className}`}>
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`${gridClasses} ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} {...cardProps} />
      ))}
    </div>
  );
};

ProductCardGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  columns: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default ProductCard;
