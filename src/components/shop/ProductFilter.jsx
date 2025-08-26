/**
 * ProductFilter.jsx - Composant de filtrage des produits
 *
 * Ce composant gère :
 * - Filtrage par catégorie et sous-catégorie
 * - Filtrage par prix (slider)
 * - Filtrage par couleur et taille
 * - Filtrage par évaluation et disponibilité
 * - Reset des filtres
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  Star,
  Palette,
  Ruler,
  DollarSign,
  Package,
} from "lucide-react";
import { CATEGORIES, SUBCATEGORIES, COLORS } from "@data/products";
import { CATEGORY_DETAILS, SUBCATEGORY_DETAILS } from "@data/categories";
import { formatPrice } from "@utils/helpers";

/**
 * Composant ProductFilter principal
 */
const ProductFilter = ({
  products = [],
  filters = {},
  onFiltersChange,
  className = "",
  isOpen = true,
  onToggle,
  showMobileOverlay = false,
}) => {
  const [localFilters, setLocalFilters] = useState({
    categories: [],
    subcategories: [],
    priceRange: { min: 0, max: 1000 },
    colors: [],
    sizes: [],
    rating: 0,
    inStock: false,
    onSale: false,
    ...filters,
  });

  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    colors: false,
    sizes: false,
    rating: false,
    availability: false,
  });

  // Calculer les données de filtrage basées sur les produits
  const filterData = useMemo(() => {
    if (!products.length)
      return {
        priceRange: { min: 0, max: 1000 },
        availableColors: [],
        availableSizes: [],
      };

    const prices = products.map((p) => p.price);
    const colors = [...new Set(products.flatMap((p) => p.colors || []))];
    const sizes = [...new Set(products.flatMap((p) => p.sizes || []))];

    return {
      priceRange: {
        min: Math.floor(Math.min(...prices) / 10) * 10,
        max: Math.ceil(Math.max(...prices) / 10) * 10,
      },
      availableColors: colors,
      availableSizes: sizes,
    };
  }, [products]);

  // Synchroniser les filtres locaux avec les props
  useEffect(() => {
    setLocalFilters((prev) => ({ ...prev, ...filters }));
  }, [filters]);

  /**
   * Met à jour un filtre spécifique
   */
  const updateFilter = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  /**
   * Ajoute/Retire un élément d'un filtre en tableau
   */
  const toggleArrayFilter = (key, value) => {
    const currentArray = localFilters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFilter(key, newArray);
  };

  /**
   * Reset tous les filtres
   */
  const resetFilters = () => {
    const resetFilters = {
      categories: [],
      subcategories: [],
      priceRange: filterData.priceRange,
      colors: [],
      sizes: [],
      rating: 0,
      inStock: false,
      onSale: false,
    };
    setLocalFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  /**
   * Toggle une section
   */
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  /**
   * Composant FilterSection
   */
  const FilterSection = ({ title, icon: Icon, sectionKey, children }) => {
    const isOpen = openSections[sectionKey];

    return (
      <div className="border-b border-secondary-200 last:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between py-4 text-left hover:bg-secondary-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {Icon && <Icon className="w-5 h-5 text-secondary-600" />}
            <span className="font-medium text-secondary-900">{title}</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-secondary-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-secondary-500" />
          )}
        </button>

        {isOpen && <div className="pb-4 px-1">{children}</div>}
      </div>
    );
  };

  /**
   * Rendu des filtres par catégorie
   */
  const renderCategoryFilters = () => (
    <FilterSection title="Catégories" icon={Package} sectionKey="categories">
      <div className="space-y-3">
        {Object.values(CATEGORIES).map((categoryKey) => {
          const categoryData = CATEGORY_DETAILS[categoryKey];
          if (!categoryData) return null;

          const isSelected = localFilters.categories.includes(categoryKey);
          const productCount = products.filter(
            (p) => p.category === categoryKey
          ).length;

          return (
            <div key={categoryKey} className="space-y-2">
              {/* Catégorie principale */}
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() =>
                      toggleArrayFilter("categories", categoryKey)
                    }
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-secondary-900 group-hover:text-primary-600 transition-colors">
                    {categoryData.name}
                  </span>
                </div>
                <span className="text-xs text-secondary-500">
                  ({productCount})
                </span>
              </label>

              {/* Sous-catégories */}
              {isSelected && categoryData.subcategories && (
                <div className="ml-6 space-y-2">
                  {categoryData.subcategories.map((subKey) => {
                    const subData = SUBCATEGORY_DETAILS[subKey];
                    if (!subData) return null;

                    const subProductCount = products.filter(
                      (p) => p.subcategory === subKey
                    ).length;
                    const isSubSelected =
                      localFilters.subcategories.includes(subKey);

                    return (
                      <label
                        key={subKey}
                        className="flex items-center justify-between cursor-pointer text-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={isSubSelected}
                            onChange={() =>
                              toggleArrayFilter("subcategories", subKey)
                            }
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 w-3 h-3"
                          />
                          <span className="text-secondary-700">
                            {subData.name}
                          </span>
                        </div>
                        <span className="text-xs text-secondary-400">
                          ({subProductCount})
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FilterSection>
  );

  /**
   * Rendu du filtre de prix
   */
  const renderPriceFilter = () => (
    <FilterSection title="Prix" icon={DollarSign} sectionKey="price">
      <div className="space-y-4">
        {/* Slider de prix */}
        <div className="px-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-secondary-900">
              {formatPrice(localFilters.priceRange.min)}
            </span>
            <span className="text-sm font-medium text-secondary-900">
              {formatPrice(localFilters.priceRange.max)}
            </span>
          </div>

          {/* Double range slider */}
          <div className="relative">
            <input
              type="range"
              min={filterData.priceRange.min}
              max={filterData.priceRange.max}
              value={localFilters.priceRange.min}
              onChange={(e) =>
                updateFilter("priceRange", {
                  ...localFilters.priceRange,
                  min: parseInt(e.target.value),
                })
              }
              className="absolute w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min={filterData.priceRange.min}
              max={filterData.priceRange.max}
              value={localFilters.priceRange.max}
              onChange={(e) =>
                updateFilter("priceRange", {
                  ...localFilters.priceRange,
                  max: parseInt(e.target.value),
                })
              }
              className="absolute w-full h-2 bg-primary-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Inputs numériques */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <label className="block text-xs text-secondary-600 mb-1">Min</label>
            <input
              type="number"
              value={localFilters.priceRange.min}
              onChange={(e) =>
                updateFilter("priceRange", {
                  ...localFilters.priceRange,
                  min: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-secondary-600 mb-1">Max</label>
            <input
              type="number"
              value={localFilters.priceRange.max}
              onChange={(e) =>
                updateFilter("priceRange", {
                  ...localFilters.priceRange,
                  max: parseInt(e.target.value) || 1000,
                })
              }
              className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    </FilterSection>
  );

  /**
   * Rendu du filtre de couleurs
   */
  const renderColorFilter = () => (
    <FilterSection title="Couleurs" icon={Palette} sectionKey="colors">
      <div className="grid grid-cols-4 gap-3">
        {filterData.availableColors.map((color) => {
          const isSelected = localFilters.colors.includes(color);
          const productCount = products.filter((p) =>
            p.colors?.includes(color)
          ).length;

          return (
            <button
              key={color}
              onClick={() => toggleArrayFilter("colors", color)}
              className={`relative w-12 h-12 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-primary-600 scale-110"
                  : "border-secondary-300 hover:border-primary-400"
              }`}
              style={{ backgroundColor: color }}
              title={`${color} (${productCount} produits)`}
            >
              {isSelected && (
                <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );

  /**
   * Rendu du filtre de tailles
   */
  const renderSizeFilter = () => (
    <FilterSection title="Tailles" icon={Ruler} sectionKey="sizes">
      <div className="grid grid-cols-4 gap-2">
        {filterData.availableSizes.map((size) => {
          const isSelected = localFilters.sizes.includes(size);
          const productCount = products.filter((p) =>
            p.sizes?.includes(size)
          ).length;

          return (
            <button
              key={size}
              onClick={() => toggleArrayFilter("sizes", size)}
              className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                isSelected
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-secondary-300 text-secondary-700 hover:border-primary-400"
              }`}
              title={`Taille ${size} (${productCount} produits)`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );

  /**
   * Rendu du filtre d'évaluation
   */
  const renderRatingFilter = () => (
    <FilterSection title="Évaluation" icon={Star} sectionKey="rating">
      <div className="space-y-3">
        {[4, 3, 2, 1].map((rating) => {
          const productCount = products.filter(
            (p) => p.rating >= rating
          ).length;

          return (
            <label
              key={rating}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="rating"
                  checked={localFilters.rating === rating}
                  onChange={() => updateFilter("rating", rating)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < rating
                          ? "text-yellow-400 fill-current"
                          : "text-secondary-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-secondary-700">& plus</span>
                </div>
              </div>
              <span className="text-xs text-secondary-500">
                ({productCount})
              </span>
            </label>
          );
        })}
      </div>
    </FilterSection>
  );

  /**
   * Rendu du filtre de disponibilité
   */
  const renderAvailabilityFilter = () => (
    <FilterSection
      title="Disponibilité"
      icon={Package}
      sectionKey="availability"
    >
      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={localFilters.inStock}
              onChange={(e) => updateFilter("inStock", e.target.checked)}
              className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-secondary-900">
              En stock uniquement
            </span>
          </div>
          <span className="text-xs text-secondary-500">
            ({products.filter((p) => p.inStock).length})
          </span>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={localFilters.onSale}
              onChange={(e) => updateFilter("onSale", e.target.checked)}
              className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-secondary-900">En promotion</span>
          </div>
          <span className="text-xs text-secondary-500">
            ({products.filter((p) => p.onSale).length})
          </span>
        </label>
      </div>
    </FilterSection>
  );

  /**
   * Compte le nombre de filtres actifs
   */
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (localFilters.categories.length > 0) count++;
    if (localFilters.subcategories.length > 0) count++;
    if (localFilters.colors.length > 0) count++;
    if (localFilters.sizes.length > 0) count++;
    if (localFilters.rating > 0) count++;
    if (localFilters.inStock) count++;
    if (localFilters.onSale) count++;
    if (
      localFilters.priceRange.min > filterData.priceRange.min ||
      localFilters.priceRange.max < filterData.priceRange.max
    )
      count++;
    return count;
  }, [localFilters, filterData.priceRange]);

  const filterContent = (
    <div className="space-y-0">
      {/* En-tête avec reset */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-secondary-600" />
          <h3 className="font-semibold text-secondary-900">
            Filtres
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </h3>
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        )}

        {/* Bouton fermer pour mobile */}
        {showMobileOverlay && onToggle && (
          <button
            onClick={onToggle}
            className="p-2 text-secondary-500 hover:text-secondary-700 sm:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filtres */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {renderCategoryFilters()}
        {renderPriceFilter()}
        {renderColorFilter()}
        {renderSizeFilter()}
        {renderRatingFilter()}
        {renderAvailabilityFilter()}
      </div>
    </div>
  );

  if (showMobileOverlay) {
    return (
      <>
        {/* Overlay mobile */}
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onToggle}
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl">
            {filterContent}
          </div>
        </div>
      </>
    );
  }

  if (!isOpen) return null;

  return (
    <div className={`bg-white rounded-lg shadow-soft ${className}`}>
      {filterContent}
    </div>
  );
};

ProductFilter.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object,
  onFiltersChange: PropTypes.func,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  showMobileOverlay: PropTypes.bool,
};

export default ProductFilter;
