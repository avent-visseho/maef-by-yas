/**
 * Categories.jsx - Composant catégories pour la page d'accueil Maef By Yas
 *
 * Ce composant gère :
 * - Affichage des catégories principales
 * - Navigation vers les catégories
 * - Animations et hover effects
 * - Version responsive
 * - Statistiques par catégorie
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowRight, TrendingUp, Package, Eye } from "lucide-react";
import { getFeaturedCategories, getCategoryById } from "@data/categories";
import { getProductsByCategory } from "@data/products";
import { optimizeImageUrl } from "@utils/helpers";

/**
 * Composant Categories principal
 */
const Categories = ({
  title = "Nos Collections",
  subtitle = "Explorez notre univers d'artisanat authentique",
  categories = [],
  layout = "grid", // 'grid', 'masonry', 'carousel'
  showStats = true,
  showDescription = true,
  onCategoryClick,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

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

    const element = document.getElementById("categories-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Catégories à afficher
  const displayCategories =
    categories.length > 0 ? categories : getFeaturedCategories();

  /**
   * Gestionnaire de clic sur catégorie
   */
  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      window.location.href = `/shop?category=${category.id}`;
    }
  };

  /**
   * Obtenir les statistiques d'une catégorie
   */
  const getCategoryStats = (categoryId) => {
    const products = getProductsByCategory(categoryId);
    return {
      totalProducts: products.length,
      inStock: products.filter((p) => p.inStock).length,
      trending: products.filter((p) => p.trending).length,
    };
  };

  /**
   * Composant CategoryCard
   */
  const CategoryCard = ({ category, index, variant = "default" }) => {
    const stats = showStats ? getCategoryStats(category.id) : null;
    const isHovered = hoveredCategory === category.id;

    const baseClasses =
      "group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2";

    const variantClasses = {
      default: "aspect-[4/3]",
      tall: "aspect-[3/4]",
      wide: "aspect-[5/3]",
      square: "aspect-square",
    };

    return (
      <div
        onClick={() => handleCategoryClick(category)}
        onMouseEnter={() => setHoveredCategory(category.id)}
        onMouseLeave={() => setHoveredCategory(null)}
        className={`${baseClasses} ${
          variantClasses[variant]
        } transition-all duration-500 ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src={optimizeImageUrl(category.image, { width: 600, height: 400 })}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              category.gradient
                ? `bg-gradient-to-br ${category.gradient} opacity-60`
                : "bg-gradient-to-br from-black/50 to-black/70"
            } group-hover:opacity-80`}
          />
        </div>

        {/* Contenu */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white z-10">
          {/* Badge/Icône */}
          <div className="flex items-center justify-between">
            <div className="text-4xl mb-2">{category.icon}</div>

            {stats && stats.trending > 0 && (
              <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </div>
            )}
          </div>

          {/* Titre et description */}
          <div className="space-y-3">
            <h3 className="text-2xl font-serif font-bold group-hover:text-accent-300 transition-colors">
              {category.name}
            </h3>

            {showDescription && category.description && (
              <p
                className={`text-sm text-gray-200 leading-relaxed transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-80 transform translate-y-2"
                }`}
              >
                {category.description}
              </p>
            )}

            {/* Statistiques */}
            {showStats && stats && (
              <div
                className={`flex items-center space-x-4 text-xs transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-4"
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Package className="w-3 h-3" />
                  <span>{stats.totalProducts} produits</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{stats.inStock} en stock</span>
                </div>
              </div>
            )}

            {/* Bouton d'action */}
            <div
              className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                isHovered
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform -translate-x-4"
              }`}
            >
              <span>Découvrir</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Effet de brillance au hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-all duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]`}
          style={{ transform: "skewX(-25deg)" }}
        />
      </div>
    );
  };

  /**
   * Rendu en grille
   */
  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayCategories.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category}
          index={index}
          variant={index === 0 ? "wide" : "default"}
        />
      ))}
    </div>
  );

  /**
   * Rendu en mosaïque
   */
  const renderMasonry = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {displayCategories.map((category, index) => {
        let variant = "default";
        if (index === 0) variant = "tall";
        else if (index === 1 || index === 4) variant = "square";
        else if (index === 2) variant = "wide";

        return (
          <div
            key={category.id}
            className={
              index === 0 ? "md:row-span-2" : index === 2 ? "md:col-span-2" : ""
            }
          >
            <CategoryCard category={category} index={index} variant={variant} />
          </div>
        );
      })}
    </div>
  );

  /**
   * Rendu en carrousel
   */
  const renderCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 3;
    const maxSlide = Math.ceil(displayCategories.length / itemsPerView) - 1;

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
      }, 4000);

      return () => clearInterval(interval);
    }, [maxSlide]);

    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from(
              { length: Math.ceil(displayCategories.length / itemsPerView) },
              (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                    {displayCategories
                      .slice(
                        slideIndex * itemsPerView,
                        (slideIndex + 1) * itemsPerView
                      )
                      .map((category, index) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          index={index}
                        />
                      ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Indicateurs */}
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
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="categories-section"
      className={`section-padding bg-gradient-to-b from-secondary-50 to-white ${className}`}
    >
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
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

        {/* Rendu selon le layout */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          {layout === "masonry"
            ? renderMasonry()
            : layout === "carousel"
            ? renderCarousel()
            : renderGrid()}
        </div>

        {/* Message d'encouragement */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-soft p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-3">
              L'authenticité à portée de main
            </h3>
            <p className="text-secondary-600 mb-6">
              Chaque création porte l'histoire et le savoir-faire de nos
              artisans partenaires. Découvrez des pièces uniques qui racontent
              une histoire.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-secondary-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  100%
                </div>
                <div>Authentique</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  500+
                </div>
                <div>Créations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  50+
                </div>
                <div>Artisans</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Categories.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  layout: PropTypes.oneOf(["grid", "masonry", "carousel"]),
  showStats: PropTypes.bool,
  showDescription: PropTypes.bool,
  onCategoryClick: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Composant CategoriesSimple - Version simplifiée
 */
export const CategoriesSimple = ({
  categories = [],
  maxItems = 6,
  onCategoryClick,
  className = "",
}) => {
  const displayCategories = (
    categories.length > 0 ? categories : getFeaturedCategories()
  ).slice(0, maxItems);

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}
    >
      {displayCategories.map((category, index) => (
        <button
          key={category.id}
          onClick={() =>
            onCategoryClick
              ? onCategoryClick(category)
              : (window.location.href = `/shop?category=${category.id}`)
          }
          className="group flex flex-col items-center p-4 bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
            {category.icon}
          </div>
          <span className="text-sm font-medium text-secondary-900 text-center group-hover:text-primary-600 transition-colors">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};

CategoriesSimple.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  maxItems: PropTypes.number,
  onCategoryClick: PropTypes.func,
  className: PropTypes.string,
};

export default Categories;
