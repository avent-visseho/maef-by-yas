/**
 * FeaturedProducts.jsx - Composant produits en vedette pour Maef By Yas
 *
 * Ce composant gère :
 * - Affichage des produits vedette
 * - Carrousel/grille responsive
 * - Filtrage par catégorie
 * - Actions rapides sur les produits
 * - Animations d'entrée
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Filter,
} from "lucide-react";
import ProductCard from "@components/shop/ProductCard";
import { ProductCardSkeleton } from "@components/shop/ProductCard";
import {
  getFeaturedProducts,
  getTrendingProducts,
  getProductsByCategory,
} from "@data/products";
import { CATEGORY_DETAILS } from "@data/categories";

/**
 * Composant FeaturedProducts principal
 */
const FeaturedProducts = ({
  title = "Produits en Vedette",
  subtitle = "Découvrez nos créations les plus appréciées",
  products = [],
  loading = false,
  showFilters = true,
  showCarousel = true,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
  autoPlay = false,
  autoPlayInterval = 5000,
  onProductClick,
  onViewAll,
  className = "",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  // Observer pour l'animation d'entrée
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("featured-products");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Auto-play du carrousel
  useEffect(() => {
    if (
      !autoPlay ||
      !showCarousel ||
      filteredProducts.length <= itemsPerView.desktop
    )
      return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlide =
          Math.ceil(filteredProducts.length / itemsPerView.desktop) - 1;
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [
    autoPlay,
    autoPlayInterval,
    showCarousel,
    filteredProducts.length,
    itemsPerView.desktop,
  ]);

  // Produits à afficher (soit props, soit récupération depuis la base)
  const displayProducts = useMemo(() => {
    if (products.length > 0) return products;
    return [...getFeaturedProducts(), ...getTrendingProducts()].slice(0, 12);
  }, [products]);

  // Filtrage des produits
  const filteredProducts = useMemo(() => {
    if (selectedFilter === "all") return displayProducts;
    if (selectedFilter === "trending")
      return displayProducts.filter((p) => p.trending);
    if (selectedFilter === "sale")
      return displayProducts.filter((p) => p.onSale);
    return getProductsByCategory(selectedFilter);
  }, [displayProducts, selectedFilter]);

  // Options de filtre
  const filterOptions = useMemo(() => {
    const options = [
      { value: "all", label: "Tous", icon: Sparkles },
      { value: "trending", label: "Tendances", icon: TrendingUp },
      { value: "sale", label: "Promotions", icon: Star },
    ];

    // Ajouter les catégories qui ont des produits
    Object.entries(CATEGORY_DETAILS).forEach(([key, category]) => {
      const categoryProducts = displayProducts.filter(
        (p) => p.category === key
      );
      if (categoryProducts.length > 0) {
        options.push({
          value: key,
          label: category.name,
          count: categoryProducts.length,
        });
      }
    });

    return options;
  }, [displayProducts]);

  /**
   * Navigation du carrousel
   */
  const goToSlide = (direction) => {
    const maxSlide =
      Math.ceil(filteredProducts.length / itemsPerView.desktop) - 1;

    if (direction === "next") {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    } else {
      setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    }
  };

  /**
   * Changement de filtre
   */
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentSlide(0);
  };

  /**
   * Rendu des filtres
   */
  const renderFilters = () => {
    if (!showFilters || filterOptions.length <= 3) return null;

    return (
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = selectedFilter === option.value;

          return (
            <button
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-primary-600 text-white shadow-lg scale-105"
                  : "bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200"
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{option.label}</span>
              {option.count && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? "bg-primary-700" : "bg-secondary-200"
                  }`}
                >
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  /**
   * Rendu en mode grille
   */
  const renderGrid = () => {
    const productsToShow = filteredProducts.slice(0, 8);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : productsToShow.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  product={product}
                  onClick={onProductClick}
                  showQuickActions={true}
                  showRating={true}
                />
              </div>
            ))}
      </div>
    );
  };

  /**
   * Rendu en mode carrousel
   */
  const renderCarousel = () => {
    const itemsToShow = itemsPerView.desktop;
    const maxSlide = Math.ceil(filteredProducts.length / itemsToShow) - 1;
    const startIndex = currentSlide * itemsToShow;
    const visibleProducts = filteredProducts.slice(
      startIndex,
      startIndex + itemsToShow
    );

    return (
      <div className="relative">
        {/* Navigation */}
        {filteredProducts.length > itemsToShow && (
          <>
            <button
              onClick={() => goToSlide("prev")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors group"
              aria-label="Produits précédents"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </button>

            <button
              onClick={() => goToSlide("next")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors group"
              aria-label="Produits suivants"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </>
        )}

        {/* Produits */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: itemsToShow }, (_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : visibleProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <ProductCard
                      product={product}
                      onClick={onProductClick}
                      showQuickActions={true}
                      showRating={true}
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* Indicateurs */}
        {filteredProducts.length > itemsToShow && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxSlide + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary-600 scale-125"
                    : "bg-secondary-300 hover:bg-primary-400"
                }`}
                aria-label={`Aller à la page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="featured-products" className={`section-padding ${className}`}>
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-secondary-900 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Filtres */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          {renderFilters()}
        </div>

        {/* Produits */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          {showCarousel ? renderCarousel() : renderGrid()}
        </div>

        {/* Message si aucun produit */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-secondary-600 mb-4">
              Essayez de modifier vos critères de sélection
            </p>
            <button
              onClick={() => handleFilterChange("all")}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Voir tous les produits
            </button>
          </div>
        )}

        {/* Bouton "Voir plus" */}
        {!loading && filteredProducts.length > 0 && onViewAll && (
          <div
            className={`text-center mt-12 transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <button
              onClick={onViewAll}
              className="group inline-flex items-center space-x-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span>Voir tous les produits</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

FeaturedProducts.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  showFilters: PropTypes.bool,
  showCarousel: PropTypes.bool,
  itemsPerView: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  onProductClick: PropTypes.func,
  onViewAll: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Composant FeaturedProductsCompact - Version compacte
 */
export const FeaturedProductsCompact = ({
  title = "Sélection du moment",
  products = [],
  maxItems = 3,
  onViewAll,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const displayProducts = products.slice(0, maxItems);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("featured-compact");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="featured-compact" className={`py-12 ${className}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h3
            className={`text-2xl font-serif font-bold text-secondary-900 transition-all duration-700 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-8"
            }`}
          >
            {title}
          </h3>

          {onViewAll && (
            <button
              onClick={onViewAll}
              className={`group flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-8"
              }`}
            >
              <span>Voir plus</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-500 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <ProductCard
                product={product}
                compact={true}
                showQuickActions={true}
                showRating={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

FeaturedProductsCompact.propTypes = {
  title: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxItems: PropTypes.number,
  onViewAll: PropTypes.func,
  className: PropTypes.string,
};

export default FeaturedProducts;
