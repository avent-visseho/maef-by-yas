/**
 * ProductGallery.jsx - Composant galerie d'images pour les produits
 *
 * Ce composant gère :
 * - Affichage des images principales et miniatures
 * - Navigation entre les images
 * - Zoom et lightbox
 * - Indicateurs de chargement
 * - Support responsive
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, Expand, X, ZoomIn } from "lucide-react";
import { optimizeImageUrl, handleImageError } from "@utils/helpers";

/**
 * Composant ProductGallery principal
 */
const ProductGallery = ({
  images = [],
  productName = "",
  className = "",
  showThumbnails = true,
  showZoom = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // AutoPlay effect
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  // Gestion du clavier pour la lightbox
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isLightboxOpen) return;

      switch (event.key) {
        case "Escape":
          setIsLightboxOpen(false);
          break;
        case "ArrowLeft":
          navigateLightbox("prev");
          break;
        case "ArrowRight":
          navigateLightbox("next");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, lightboxImageIndex, images.length]);

  /**
   * Navigation vers l'image précédente
   */
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  /**
   * Navigation vers l'image suivante
   */
  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  /**
   * Sélection directe d'une image
   */
  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  /**
   * Ouvrir la lightbox
   */
  const openLightbox = (index = currentImageIndex) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  /**
   * Fermer la lightbox
   */
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  /**
   * Navigation dans la lightbox
   */
  const navigateLightbox = (direction) => {
    if (direction === "prev") {
      setLightboxImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    } else {
      setLightboxImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  /**
   * Gestion du zoom sur hover
   */
  const handleMouseMove = (event) => {
    if (!showZoom) return;

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    setMousePosition({ x, y });
  };

  /**
   * Gestion du chargement d'image
   */
  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-secondary-100 rounded-lg flex items-center justify-center h-96 ${className}`}
      >
        <p className="text-secondary-500">Aucune image disponible</p>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];

  return (
    <div className={`relative ${className}`}>
      {/* Image principale */}
      <div className="relative mb-4">
        <div
          className="relative aspect-square overflow-hidden rounded-lg bg-secondary-100 group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => showZoom && setIsZoomed(true)}
          onMouseLeave={() => showZoom && setIsZoomed(false)}
        >
          {/* Indicateur de chargement */}
          {!imageLoaded[currentImageIndex] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Image principale */}
          <img
            src={optimizeImageUrl(currentImage, { width: 600, height: 600 })}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded[currentImageIndex] ? "opacity-100" : "opacity-0"
            } ${isZoomed ? "scale-150" : "scale-100"}`}
            style={
              isZoomed && showZoom
                ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }
                : {}
            }
            onLoad={() => handleImageLoad(currentImageIndex)}
            onError={handleImageError}
          />

          {/* Overlay avec contrôles */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
            {/* Boutons de navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6 text-secondary-700" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6 text-secondary-700" />
                </button>
              </>
            )}

            {/* Bouton d'agrandissement */}
            <button
              onClick={() => openLightbox()}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Agrandir l'image"
            >
              {showZoom ? (
                <ZoomIn className="w-5 h-5 text-secondary-700" />
              ) : (
                <Expand className="w-5 h-5 text-secondary-700" />
              )}
            </button>

            {/* Indicateur de zoom */}
            {showZoom && (
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black bg-opacity-60 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Survoler pour zoomer
              </div>
            )}
          </div>

          {/* Indicateurs de position */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Miniatures */}
      {showThumbnails && images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`flex-shrink-0 relative w-16 h-16 rounded-md overflow-hidden transition-all duration-200 ${
                index === currentImageIndex
                  ? "ring-2 ring-primary-600 scale-105"
                  : "hover:ring-2 hover:ring-primary-400"
              }`}
            >
              {!imageLoaded[`thumb-${index}`] && (
                <div className="absolute inset-0 bg-secondary-200 animate-pulse" />
              )}
              <img
                src={optimizeImageUrl(image, { width: 64, height: 64 })}
                alt={`${productName} - Miniature ${index + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  imageLoaded[`thumb-${index}`] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(`thumb-${index}`)}
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors z-10"
            aria-label="Fermer la lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors z-10"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Image lightbox */}
          <div className="relative max-w-4xl max-h-full">
            <img
              src={optimizeImageUrl(images[lightboxImageIndex], {
                width: 1200,
                height: 1200,
              })}
              alt={`${productName} - Image ${lightboxImageIndex + 1} agrandie`}
              className="max-w-full max-h-full object-contain"
              onError={handleImageError}
            />

            {/* Compteur d'images */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black bg-opacity-60 text-white text-sm rounded-full">
              {lightboxImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  productName: PropTypes.string,
  className: PropTypes.string,
  showThumbnails: PropTypes.bool,
  showZoom: PropTypes.bool,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
};

export default ProductGallery;
