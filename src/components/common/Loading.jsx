/**
 * Loading.jsx - Composant de chargement pour Maef By Yas
 *
 * Ce composant affiche différents types d'indicateurs de chargement :
 * - Spinner simple
 * - Chargement plein écran
 * - Skeleton loaders
 * - Chargement avec message
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React from "react";
import { Loader2, ShoppingBag } from "lucide-react";
import { APP_CONFIG } from "@utils/constants";

/**
 * Composant Spinner simple
 */
const Spinner = ({ size = "md", color = "primary" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-primary-600",
    white: "text-white",
    secondary: "text-secondary-600",
  };

  return (
    <Loader2
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      aria-hidden="true"
    />
  );
};

/**
 * Composant de chargement avec logo animé
 */
const LogoSpinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return (
    <div className="relative">
      <div className="animate-pulse">
        <ShoppingBag className={`${sizeClasses[size]} text-primary-600`} />
      </div>
      <div className="absolute inset-0 animate-ping">
        <ShoppingBag
          className={`${sizeClasses[size]} text-primary-300 opacity-75`}
        />
      </div>
    </div>
  );
};

/**
 * Composant de skeleton pour cartes produit
 */
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-square bg-secondary-200 animate-pulse" />

      {/* Contenu skeleton */}
      <div className="p-4 space-y-3">
        {/* Titre */}
        <div className="h-4 bg-secondary-200 rounded animate-pulse" />
        <div className="h-4 bg-secondary-200 rounded w-3/4 animate-pulse" />

        {/* Prix */}
        <div className="flex items-center space-x-2">
          <div className="h-5 bg-secondary-200 rounded w-16 animate-pulse" />
          <div className="h-4 bg-secondary-200 rounded w-12 animate-pulse" />
        </div>

        {/* Bouton */}
        <div className="h-10 bg-secondary-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

/**
 * Composant de skeleton pour grille de produits
 */
const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

/**
 * Composant de skeleton pour page produit
 */
const ProductPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-secondary-200 rounded-lg animate-pulse" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="aspect-square bg-secondary-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Infos skeleton */}
        <div className="space-y-6">
          {/* Titre et prix */}
          <div className="space-y-4">
            <div className="h-8 bg-secondary-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-secondary-200 rounded w-1/3 animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-4 bg-secondary-200 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="h-6 bg-secondary-200 rounded w-1/4 animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="h-10 bg-secondary-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Boutons */}
          <div className="space-y-3">
            <div className="h-12 bg-secondary-200 rounded animate-pulse" />
            <div className="h-10 bg-secondary-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Composant de points de chargement
 */
const DotLoader = ({ color = "primary" }) => {
  const colorClasses = {
    primary: "bg-primary-600",
    white: "bg-white",
    secondary: "bg-secondary-600",
  };

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${colorClasses[color]} animate-bounce`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Composant de chargement avec message
 */
const LoadingWithMessage = ({
  message = "Chargement...",
  size = "md",
  showLogo = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {showLogo ? <LogoSpinner size={size} /> : <Spinner size={size} />}
      <p className="text-secondary-600 font-medium">{message}</p>
    </div>
  );
};

/**
 * Composant de chargement plein écran
 */
const FullScreenLoading = ({ message = "Chargement...", showLogo = true }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/images/logos/maef-by-yas-logo.png"
            alt={APP_CONFIG.NAME}
            className="h-16 w-auto opacity-90"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Indicateur de chargement */}
        <div className="flex justify-center">
          {showLogo ? <LogoSpinner size="xl" /> : <Spinner size="xl" />}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-secondary-700">{message}</p>
          <p className="text-sm text-secondary-500">
            Veuillez patienter quelques instants...
          </p>
        </div>

        {/* Barre de progression animée */}
        <div className="w-64 h-1 bg-secondary-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 rounded-full animate-pulse"
            style={{
              animation: "loading-bar 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Composant de chargement inline (petit)
 */
const InlineLoading = ({ text = "Chargement...", color = "primary" }) => {
  return (
    <div className="flex items-center space-x-2">
      <Spinner size="sm" color={color} />
      <span className="text-sm text-secondary-600">{text}</span>
    </div>
  );
};

/**
 * Composant de chargement pour bouton
 */
const ButtonLoading = ({ text = "Chargement...", color = "white" }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Spinner size="sm" color={color} />
      <span>{text}</span>
    </div>
  );
};

/**
 * Composant principal Loading
 *
 * @param {string} type - Type de loading (spinner, fullscreen, skeleton, etc.)
 * @param {string} message - Message à afficher
 * @param {string} size - Taille du loader
 * @param {string} color - Couleur du loader
 * @param {boolean} showLogo - Afficher le logo animé
 * @param {number} skeletonCount - Nombre de skeletons à afficher
 */
const Loading = ({
  type = "spinner",
  message,
  size = "md",
  color = "primary",
  showLogo = false,
  skeletonCount = 8,
}) => {
  switch (type) {
    case "fullscreen":
      return <FullScreenLoading message={message} showLogo={showLogo} />;

    case "with-message":
      return (
        <LoadingWithMessage message={message} size={size} showLogo={showLogo} />
      );

    case "inline":
      return <InlineLoading text={message} color={color} />;

    case "button":
      return <ButtonLoading text={message} color={color} />;

    case "dots":
      return <DotLoader color={color} />;

    case "logo":
      return <LogoSpinner size={size} />;

    case "product-grid-skeleton":
      return <ProductGridSkeleton count={skeletonCount} />;

    case "product-page-skeleton":
      return <ProductPageSkeleton />;

    case "product-card-skeleton":
      return <ProductCardSkeleton />;

    default:
      return <Spinner size={size} color={color} />;
  }
};

// Export des composants individuels pour usage spécifique
export {
  Spinner,
  LogoSpinner,
  ProductCardSkeleton,
  ProductGridSkeleton,
  ProductPageSkeleton,
  DotLoader,
  LoadingWithMessage,
  FullScreenLoading,
  InlineLoading,
  ButtonLoading,
};

// Export du composant principal
export default Loading;
