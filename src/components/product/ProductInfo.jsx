/**
 * ProductInfo.jsx - Composant d'informations détaillées du produit
 *
 * Ce composant affiche :
 * - Nom et description du produit
 * - Prix et promotions
 * - Sélecteur de variantes (couleur, taille)
 * - Boutons d'action (ajouter au panier, favoris)
 * - Informations de livraison
 * - Détails techniques
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Info,
} from "lucide-react";
import { useCart } from "@hooks/useCart";
import { formatPrice, calculateDiscountPercentage } from "@utils/helpers";
import { CART_CONFIG, PRODUCT_COLORS, SIZE_CONFIG } from "@utils/constants";

/**
 * Composant ProductInfo principal
 */
const ProductInfo = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className = "",
}) => {
  const { addToCart, isInCart } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Initialiser les variantes par défaut
  useEffect(() => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedColor, selectedSize]);

  /**
   * Validation des sélections avant ajout au panier
   */
  const validateSelections = () => {
    const errors = {};

    if (product.colors && product.colors.length > 1 && !selectedColor) {
      errors.color = "Veuillez sélectionner une couleur";
    }

    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      errors.size = "Veuillez sélectionner une taille";
    }

    if (quantity < 1) {
      errors.quantity = "La quantité doit être d'au moins 1";
    }

    if (quantity > CART_CONFIG.MAX_QUANTITY_PER_ITEM) {
      errors.quantity = `Quantité maximum: ${CART_CONFIG.MAX_QUANTITY_PER_ITEM}`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Gestionnaire d'ajout au panier
   */
  const handleAddToCart = async () => {
    if (!validateSelections()) return;

    setIsAddingToCart(true);
    try {
      const result = await addToCart(
        product,
        quantity,
        selectedSize,
        selectedColor
      );
      if (result?.success && onAddToCart) {
        onAddToCart(result);
      }
    } catch (error) {
      console.error("Erreur ajout panier:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  /**
   * Mise à jour de la quantité
   */
  const updateQuantity = (newQuantity) => {
    const clampedQuantity = Math.max(
      1,
      Math.min(CART_CONFIG.MAX_QUANTITY_PER_ITEM, newQuantity)
    );
    setQuantity(clampedQuantity);

    if (validationErrors.quantity) {
      setValidationErrors((prev) => ({ ...prev, quantity: "" }));
    }
  };

  /**
   * Gestionnaire de sélection de couleur
   */
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (validationErrors.color) {
      setValidationErrors((prev) => ({ ...prev, color: "" }));
    }
  };

  /**
   * Gestionnaire de sélection de taille
   */
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    if (validationErrors.size) {
      setValidationErrors((prev) => ({ ...prev, size: "" }));
    }
  };

  /**
   * Rendu des étoiles de notation
   */
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-secondary-300"
        }`}
      />
    ));
  };

  /**
   * Rendu du sélecteur de couleurs
   */
  const renderColorSelector = () => {
    if (!product.colors || product.colors.length <= 1) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-secondary-900">Couleur</h4>
          {selectedColor && (
            <span className="text-sm text-secondary-600 capitalize">
              {Object.entries(PRODUCT_COLORS).find(
                ([_, colorData]) => colorData.hex === selectedColor
              )?.[1]?.name || selectedColor}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {product.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorSelect(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color
                  ? "border-primary-600 scale-110 shadow-md"
                  : "border-secondary-300 hover:border-primary-400"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Sélectionner la couleur ${color}`}
            >
              {selectedColor === color && (
                <Check className="w-4 h-4 text-white mx-auto drop-shadow-sm" />
              )}
            </button>
          ))}
        </div>

        {validationErrors.color && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {validationErrors.color}
          </p>
        )}
      </div>
    );
  };

  /**
   * Rendu du sélecteur de tailles
   */
  const renderSizeSelector = () => {
    if (!product.sizes || product.sizes.length <= 1) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-secondary-900">Taille</h4>
          <button className="text-sm text-primary-600 hover:text-primary-700 underline">
            Guide des tailles
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((size, index) => (
            <button
              key={index}
              onClick={() => handleSizeSelect(size)}
              className={`py-2 px-3 border rounded-md text-sm font-medium transition-all duration-200 ${
                selectedSize === size
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-secondary-300 text-secondary-700 hover:border-primary-400 hover:bg-primary-50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {validationErrors.size && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {validationErrors.size}
          </p>
        )}
      </div>
    );
  };

  if (!product) {
    return (
      <div className={`animate-pulse space-y-6 ${className}`}>
        <div className="h-8 bg-secondary-200 rounded w-3/4"></div>
        <div className="h-6 bg-secondary-200 rounded w-1/4"></div>
        <div className="h-4 bg-secondary-200 rounded"></div>
        <div className="h-4 bg-secondary-200 rounded w-5/6"></div>
      </div>
    );
  }

  const discountPercentage = calculateDiscountPercentage(
    product.originalPrice,
    product.price
  );
  const isInCartAlready = isInCart(product.id, selectedSize, selectedColor);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* En-tête avec nom et favoris */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            {product.name}
          </h1>

          {/* Catégorie et marque */}
          <div className="flex items-center space-x-4 text-sm text-secondary-600">
            <span className="capitalize">{product.category}</span>
            {product.brand && (
              <>
                <span>•</span>
                <span>{product.brand}</span>
              </>
            )}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleFavorite?.(product.id)}
            className={`p-3 rounded-full border transition-colors ${
              isFavorite
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-secondary-300 text-secondary-600 hover:border-red-400 hover:text-red-600"
            }`}
            aria-label={
              isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
            }
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <button
            className="p-3 rounded-full border border-secondary-300 text-secondary-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
            aria-label="Partager ce produit"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rating et avis */}
      {product.rating && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-lg font-semibold text-secondary-900">
            {product.rating}
          </span>
          {product.reviews && (
            <span className="text-secondary-600">({product.reviews} avis)</span>
          )}
        </div>
      )}

      {/* Prix */}
      <div className="flex items-center space-x-4">
        <span className="text-3xl font-bold text-primary-600">
          {formatPrice(product.price)}
        </span>

        {product.originalPrice && (
          <>
            <span className="text-xl text-secondary-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
            {discountPercentage > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                -{discountPercentage}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Stock et disponibilité */}
      <div className="flex items-center space-x-2">
        {product.inStock ? (
          <>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">En stock</span>
            {product.quantity && product.quantity < 10 && (
              <span className="text-orange-600 text-sm">
                (Plus que {product.quantity} disponibles)
              </span>
            )}
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-medium">Rupture de stock</span>
          </>
        )}
      </div>

      {/* Description */}
      <div className="space-y-3">
        <p className="text-secondary-700 leading-relaxed">
          {showFullDescription
            ? product.longDescription || product.description
            : product.description}
        </p>

        {product.longDescription &&
          product.longDescription !== product.description && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {showFullDescription ? "Voir moins" : "Voir plus"}
            </button>
          )}
      </div>

      {/* Sélecteurs de variantes */}
      {renderColorSelector()}
      {renderSizeSelector()}

      {/* Quantité */}
      <div className="space-y-3">
        <h4 className="font-medium text-secondary-900">Quantité</h4>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-secondary-300 rounded-lg">
            <button
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1}
              className="p-2 text-secondary-600 hover:text-secondary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
              {quantity}
            </span>

            <button
              onClick={() => updateQuantity(quantity + 1)}
              disabled={quantity >= CART_CONFIG.MAX_QUANTITY_PER_ITEM}
              className="p-2 text-secondary-600 hover:text-secondary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <span className="text-sm text-secondary-600">
            Max {CART_CONFIG.MAX_QUANTITY_PER_ITEM} articles
          </span>
        </div>

        {validationErrors.quantity && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {validationErrors.quantity}
          </p>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || !product.inStock}
          className="w-full flex items-center justify-center space-x-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-medium text-lg transition-colors"
        >
          {isAddingToCart ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Ajout en cours...</span>
            </>
          ) : isInCartAlready ? (
            <>
              <Check className="w-5 h-5" />
              <span>Déjà dans le panier</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Ajouter au panier</span>
            </>
          )}
        </button>

        {/* Achat immédiat */}
        <button
          disabled={!product.inStock}
          className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed py-4 px-6 rounded-lg font-medium text-lg transition-colors"
        >
          Acheter maintenant
        </button>
      </div>

      {/* Informations de livraison et garanties */}
      <div className="border-t pt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
            <Truck className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-secondary-900">
                Livraison gratuite
              </p>
              <p className="text-sm text-secondary-600">
                À partir de 100€ d'achat
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
            <Shield className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-secondary-900">
                Paiement sécurisé
              </p>
              <p className="text-sm text-secondary-600">
                Protection SSL garantie
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
            <RotateCcw className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-secondary-900">Retours gratuits</p>
              <p className="text-sm text-secondary-600">
                30 jours pour changer d'avis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Détails du produit */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-secondary-900 mb-4">
          Détails du produit
        </h3>
        <dl className="grid grid-cols-1 gap-3">
          {product.material && (
            <div className="flex justify-between">
              <dt className="text-secondary-600">Matière :</dt>
              <dd className="text-secondary-900 font-medium">
                {product.material}
              </dd>
            </div>
          )}

          {product.origin && (
            <div className="flex justify-between">
              <dt className="text-secondary-600">Origine :</dt>
              <dd className="text-secondary-900 font-medium">
                {product.origin}
              </dd>
            </div>
          )}

          {product.dimensions && (
            <div className="flex justify-between">
              <dt className="text-secondary-600">Dimensions :</dt>
              <dd className="text-secondary-900 font-medium">
                {product.dimensions}
              </dd>
            </div>
          )}

          {product.weight && (
            <div className="flex justify-between">
              <dt className="text-secondary-600">Poids :</dt>
              <dd className="text-secondary-900 font-medium">
                {product.weight}
              </dd>
            </div>
          )}

          {product.care && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="text-secondary-600">Entretien :</dt>
              <dd className="text-secondary-900 font-medium text-right">
                {product.care}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Tags du produit */}
      {product.tags && product.tags.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-secondary-900 mb-3">Mots-clés</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full hover:bg-secondary-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Informations supplémentaires */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">
              Produit authentique
            </p>
            <p className="text-blue-800 text-sm">
              Tous nos produits sont sélectionnés pour leur authenticité et leur
              qualité exceptionnelle. Chaque pièce est unique et peut présenter
              de légères variations qui font son charme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    longDescription: PropTypes.string,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    currency: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    sizes: PropTypes.arrayOf(PropTypes.string),
    inStock: PropTypes.bool,
    quantity: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    category: PropTypes.string,
    brand: PropTypes.string,
    material: PropTypes.string,
    origin: PropTypes.string,
    dimensions: PropTypes.string,
    weight: PropTypes.string,
    care: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onAddToCart: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,
  className: PropTypes.string,
};

export default ProductInfo;
