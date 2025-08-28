/**
 * Shop.jsx - Page boutique de Maef By Yas
 *
 * Cette page affiche :
 * - Filtres de produits (sidebar)
 * - Grille de produits avec pagination
 * - Tri et recherche
 * - CartDrawer intégré
 * - Vue responsive
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  Grid,
  List,
  Search,
  SortAsc,
  X,
  ChevronDown,
  ShoppingCart,
  Heart,
  Eye,
  Star,
  Package,
  ArrowRight,
  RefreshCw,
  Settings,
  Tag,
  Zap,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";

// Imports des données et composants
import {
  PRODUCTS,
  CATEGORIES,
  getProductsByCategory,
  getProductById,
} from "@data/products";
import { CATEGORY_DETAILS } from "@data/categories";
import { useCart } from "@context/CartContext";
import CartDrawer from "@components/cart/CartDrawer";
import ProductCard from "@components/shop/ProductCard";
import ProductFilter from "@components/shop/ProductFilter";
import Pagination from "@components/shop/Pagination";
import {
  formatPrice,
  calculateDiscountPercentage,
  debounce,
} from "@utils/helpers";
import { FILTER_CONFIG, PAGINATION_CONFIG } from "@utils/constants";

/**
 * Composant Shop principal
 */
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleCart, isOpen: isCartOpen, totalItems } = useCart();

  // États principaux
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // États des filtres
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    subcategory: searchParams.get("subcategory") || "",
    search: searchParams.get("search") || "",
    priceRange: { min: 0, max: 300 },
    colors: [],
    sizes: [],
    inStock: false,
    onSale: false,
    featured: false,
    trending: false,
    rating: 0,
  });

  // États de l'interface
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // États de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    PAGINATION_CONFIG.DEFAULT_PAGE_SIZE
  );

  /**
   * Charger les produits initiaux
   */
  useEffect(() => {
    setLoading(true);
    try {
      setProducts(PRODUCTS);
      setFilteredProducts(PRODUCTS);
    } catch (error) {
      console.error("Erreur chargement produits:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Recherche debouncée
   */
  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm) => {
        if (!searchTerm.trim()) return products;

        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.tags?.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        return filtered;
      }, 300),
    [products]
  );

  /**
   * Appliquer les filtres
   */
  const applyFilters = useMemo(() => {
    let result = [...products];

    // Recherche textuelle
    if (filters.search.trim()) {
      result = debouncedSearch(filters.search);
    }

    // Filtre par catégorie
    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Filtre par sous-catégorie
    if (filters.subcategory) {
      result = result.filter(
        (product) => product.subcategory === filters.subcategory
      );
    }

    // Filtre par prix
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    // Filtre par couleurs
    if (filters.colors.length > 0) {
      result = result.filter(
        (product) =>
          product.colors &&
          product.colors.some((color) => filters.colors.includes(color))
      );
    }

    // Filtre par tailles
    if (filters.sizes.length > 0) {
      result = result.filter(
        (product) =>
          product.sizes &&
          product.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    // Filtre par stock
    if (filters.inStock) {
      result = result.filter((product) => product.inStock);
    }

    // Filtre par promotion
    if (filters.onSale) {
      result = result.filter((product) => product.onSale);
    }

    // Filtre par vedette
    if (filters.featured) {
      result = result.filter((product) => product.featured);
    }

    // Filtre par tendance
    if (filters.trending) {
      result = result.filter((product) => product.trending);
    }

    // Filtre par note
    if (filters.rating > 0) {
      result = result.filter(
        (product) => product.rating && product.rating >= filters.rating
      );
    }

    return result;
  }, [products, filters, debouncedSearch]);

  /**
   * Trier les produits
   */
  const sortedProducts = useMemo(() => {
    const sorted = [...applyFilters];

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
      default:
        // Tri par vedette par défaut
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }
  }, [applyFilters, sortBy]);

  /**
   * Pagination des produits
   */
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  /**
   * Synchroniser les filtres avec l'URL
   */
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (filters.category) newSearchParams.set("category", filters.category);
    if (filters.subcategory)
      newSearchParams.set("subcategory", filters.subcategory);
    if (filters.search) newSearchParams.set("search", filters.search);
    if (currentPage > 1) newSearchParams.set("page", currentPage.toString());
    if (sortBy !== "featured") newSearchParams.set("sort", sortBy);

    setSearchParams(newSearchParams, { replace: true });
  }, [filters, currentPage, sortBy, setSearchParams]);

  /**
   * Mise à jour des filtres
   */
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  /**
   * Gestion des favoris
   */
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  /**
   * Reset des filtres
   */
  const resetFilters = () => {
    setFilters({
      category: "",
      subcategory: "",
      search: "",
      priceRange: { min: 0, max: 300 },
      colors: [],
      sizes: [],
      inStock: false,
      onSale: false,
      featured: false,
      trending: false,
      rating: 0,
    });
    setCurrentPage(1);
  };

  /**
   * Statistiques des filtres actifs
   */
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.subcategory) count++;
    if (filters.search) count++;
    if (filters.colors.length > 0) count++;
    if (filters.sizes.length > 0) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    if (filters.featured) count++;
    if (filters.trending) count++;
    if (filters.rating > 0) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 300) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête de la page */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Titre et breadcrumb */}
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                Boutique
              </h1>
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Accueil</span>
                <span>/</span>
                <span>Boutique</span>
                {filters.category && (
                  <>
                    <span>/</span>
                    <span className="capitalize">{filters.category}</span>
                  </>
                )}
              </nav>
            </div>

            {/* Barre de recherche */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                  placeholder="Rechercher des produits..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {filters.search && (
                  <button
                    onClick={() => handleFilterChange({ search: "" })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Panier */}
            <button
              onClick={toggleCart}
              className="relative flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar des filtres - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8 ">
              <ProductFilter
                products={products}
                filters={filters}
                onFiltersChange={handleFilterChange}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              />
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 ">
            {/* Barre d'outils */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Informations et filtres mobiles */}
                <div className="flex items-center space-x-4">
                  <p className="text-gray-700 font-medium">
                    {loading
                      ? "Chargement..."
                      : `${sortedProducts.length} produit${
                          sortedProducts.length !== 1 ? "s" : ""
                        } trouvé${sortedProducts.length !== 1 ? "s" : ""}`}
                  </p>

                  {/* Bouton filtres mobile */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filtres</span>
                    {activeFiltersCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  {/* Reset filtres */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Contrôles de tri et vue */}
                <div className="flex items-center space-x-3">
                  {/* Sélecteur de tri */}
                  <div className="flex items-center space-x-2">
                    <SortAsc className="w-4 h-4 text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                    >
                      {FILTER_CONFIG.SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Toggle vue grille/liste */}
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 transition-colors ${
                        viewMode === "grid"
                          ? "bg-primary-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
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
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="Vue liste"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Items par page */}
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    {PAGINATION_CONFIG.PAGE_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size} par page
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtres actifs */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {filters.category && (
                      <span className="inline-flex items-center space-x-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                        <Package className="w-3 h-3" />
                        <span className="capitalize">{filters.category}</span>
                        <button
                          onClick={() =>
                            handleFilterChange({
                              category: "",
                              subcategory: "",
                            })
                          }
                          className="ml-1 hover:text-primary-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.search && (
                      <span className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        <Search className="w-3 h-3" />
                        <span>"{filters.search}"</span>
                        <button
                          onClick={() => handleFilterChange({ search: "" })}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.onSale && (
                      <span className="inline-flex items-center space-x-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        <Tag className="w-3 h-3" />
                        <span>En promotion</span>
                        <button
                          onClick={() => handleFilterChange({ onSale: false })}
                          className="ml-1 hover:text-red-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.featured && (
                      <span className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        <Zap className="w-3 h-3" />
                        <span>Mis en avant</span>
                        <button
                          onClick={() =>
                            handleFilterChange({ featured: false })
                          }
                          className="ml-1 hover:text-yellow-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.trending && (
                      <span className="inline-flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        <TrendingUp className="w-3 h-3" />
                        <span>Tendance</span>
                        <button
                          onClick={() =>
                            handleFilterChange({ trending: false })
                          }
                          className="ml-1 hover:text-orange-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Grille de produits */}
            {loading ? (
              // Skeleton loading
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-8 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              // État vide
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Essayez de modifier vos critères de recherche ou de
                  navigation.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Voir tous les produits
                </button>
              </div>
            ) : (
              // Produits
              <>
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      compact={viewMode === "list"}
                      showQuickActions={true}
                      showRating={true}
                      showDescription={viewMode === "list"}
                      onClick={(product) => {
                        // Navigation vers la page produit
                        window.location.href = `/product/${product.id}`;
                      }}
                      onToggleFavorite={toggleFavorite}
                      onQuickView={(product) => {
                        // Ouvrir modal de vue rapide
                        console.log("Vue rapide:", product);
                      }}
                      isFavorite={favorites.includes(product.id)}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={sortedProducts.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                      className="justify-center"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filtres mobiles */}
      {showMobileFilters && (
        <ProductFilter
          products={products}
          filters={filters}
          onFiltersChange={handleFilterChange}
          showMobileOverlay={true}
          onToggle={() => setShowMobileFilters(false)}
        />
      )}

      {/* CartDrawer */}
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
};

export default Shop;
