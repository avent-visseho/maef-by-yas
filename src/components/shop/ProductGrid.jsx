/**
 * ProductGrid.jsx - Composant de grille de produits
 *
 * Ce composant gère :
 * - Affichage en grille responsive des produits
 * - États de chargement et vide
 * - Pagination et tri
 * - Animations d'entrée
 * - Vue liste/grille
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Grid, List, Filter, SortAsc, Eye, EyeOff } from "lucide-react";
import ProductCard from "@components/shop/ProductCard";
import { ProductCardSkeleton } from "@components/common/Loading";
import { FILTER_CONFIG, PAGINATION_CONFIG } from "@utils/constants";

/**
 * Composant ProductGrid principal
 */
const ProductGrid = ({
  products = [],
  loading = false,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  showControls = true,
  showViewToggle = true,
  showSort = true,
  showFilter = false,
  emptyMessage = "Aucun produit trouvé",
  emptyDescription = "Essayez de modifier vos critères de recherche",
  onProductClick,
  onSort,
  onFilter,
  className = "",
}) => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' ou 'list'
  const [sortBy, setSortBy] = useState(FILTER_CONFIG.DEFAULT_SORT);
  const [showFilters, setShowFilters] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  // Animation d'entrée des produits
  useEffect(() => {
    if (products.length > 0 && !loading) {
      setAnimateItems(true);
    }
  }, [products, loading]);

  /**
   * Classes CSS responsives pour la grille
   */
  const gridClasses = useMemo(() => {
    const baseClasses = "grid gap-6 transition-all duration-300";
    const responsiveClasses = [
      `grid-cols-${columns.xs}`,
      `sm:grid-cols-${columns.sm}`,
      `md:grid-cols-${columns.md}`,
      `lg:grid-cols-${columns.lg}`,
      `xl:grid-cols-${columns.xl}`,
    ].join(" ");

    return `${baseClasses} ${responsiveClasses}`;
  }, [columns]);

  /**
   * Classes CSS pour la vue liste
   */
  const listClasses = "space-y-4 transition-all duration-300";

  /**
   * Gestionnaire de changement de tri
   */
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    if (onSort) {
      onSort(newSort);
    }
  };

  /**
   * Gestionnaire de basculement de vue
   */
  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  /**
   * Gestionnaire de basculement des filtres
   */
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (onFilter) {
      onFilter(!showFilters);
    }
  };

  /**
   * Rendu des contrôles (tri, vue, filtres)
   */
  const renderControls = () => {
    if (!showControls) return null;

    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Informations et résultats */}
        <div className="flex items-center space-x-4">
          <p className="text-secondary-700">
            {loading
              ? "Chargement..."
              : `${products.length} produit${
                  products.length !== 1 ? "s" : ""
                } trouvé${products.length !== 1 ? "s" : ""}`}
          </p>

          {/* Toggle filtres */}
          {showFilter && (
            <button
              onClick={toggleFilters}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                showFilters
                  ? "bg-primary-100 text-primary-700"
                  : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>{showFilters ? "Masquer" : "Filtrer"}</span>
            </button>
          )}
        </div>

        {/* Contrôles de tri et vue */}
        <div className="flex items-center space-x-3">
          {/* Sélecteur de tri */}
          {showSort && (
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-secondary-500" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-secondary-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {FILTER_CONFIG.SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Toggle vue grille/liste */}
          {showViewToggle && (
            <div className="flex items-center border border-secondary-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary-600 text-white"
                    : "text-secondary-600 hover:bg-secondary-100"
                }`}
                aria-label="Vue grille"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-primary-600 text-white"
                    : "text-secondary-600 hover:bg-secondary-100"
                }`}
                aria-label="Vue liste"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * Rendu des skeletons de chargement
   */
  const renderLoading = () => {
    const skeletonCount = 12;

    return (
      <div className={viewMode === "grid" ? gridClasses : listClasses}>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <ProductCardSkeleton
            key={`skeleton-${index}`}
            compact={viewMode === "list"}
          />
        ))}
      </div>
    );
  };

  /**
   * Rendu de l'état vide
   */
  const renderEmpty = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
        <EyeOff className="w-12 h-12 text-secondary-400" />
      </div>
      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
        {emptyMessage}
      </h3>
      <p className="text-secondary-600 mb-6 max-w-md mx-auto">
        {emptyDescription}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        <Eye className="w-4 h-4 mr-2" />
        Voir tous les produits
      </button>
    </div>
  );

  /**
   * Rendu des produits
   */
  const renderProducts = () => {
    return (
      <div className={viewMode === "grid" ? gridClasses : listClasses}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`${animateItems ? "animate-fade-in" : "opacity-0"}`}
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: "forwards",
            }}
          >
            <ProductCard
              product={product}
              compact={viewMode === "list"}
              showQuickActions={viewMode === "grid"}
              onClick={() => onProductClick?.(product)}
              className={viewMode === "list" ? "flex-row" : ""}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Contrôles */}
      {renderControls()}

      {/* Contenu principal */}
      <div className="min-h-[400px]">
        {loading
          ? renderLoading()
          : products.length === 0
          ? renderEmpty()
          : renderProducts()}
      </div>

      {/* CSS personnalisé pour les animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      category: PropTypes.string,
      inStock: PropTypes.bool,
      rating: PropTypes.number,
      reviews: PropTypes.number,
    })
  ),
  loading: PropTypes.bool,
  columns: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }),
  showControls: PropTypes.bool,
  showViewToggle: PropTypes.bool,
  showSort: PropTypes.bool,
  showFilter: PropTypes.bool,
  emptyMessage: PropTypes.string,
  emptyDescription: PropTypes.string,
  onProductClick: PropTypes.func,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Composant ProductGridWithPagination - Version avec pagination intégrée
 */
export const ProductGridWithPagination = ({
  products,
  pageSize = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
  }, [products, currentPage, pageSize]);

  const totalPages = Math.ceil(products.length / pageSize);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          {/* Page précédente */}
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-secondary-600 hover:bg-secondary-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Précédent
          </button>

          {/* Numéros de pages */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
            const pageNumber =
              currentPage <= 3 ? index + 1 : currentPage + index - 2;

            if (pageNumber > totalPages) return null;

            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pageNumber === currentPage
                    ? "bg-primary-600 text-white"
                    : "text-secondary-600 hover:bg-secondary-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Page suivante */}
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-secondary-600 hover:bg-secondary-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Suivant
          </button>
        </nav>
      </div>
    );
  };

  return (
    <>
      <ProductGrid products={paginatedProducts} {...props} />
      {renderPagination()}
    </>
  );
};

export default ProductGrid;
