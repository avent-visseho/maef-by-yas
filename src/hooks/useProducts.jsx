/**
 * useProducts.jsx - Hook personnalisé pour la gestion des produits
 * 
 * Ce hook fournit des fonctionnalités avancées pour manipuler et filtrer
 * les produits : recherche, filtrage, tri, pagination, et gestion de l'état.
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import PRODUCTS, { 
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getTrendingProducts,
  getProductsOnSale,
  searchProducts,
  filterProductsByPrice,
  sortProducts
} from '@data/products';
import { FILTER_CONFIG, PAGINATION_CONFIG, SEARCH_CONFIG } from '@utils/constants';
import { debounce, secureLocalStorageGet, secureLocalStorageSet } from '@utils/helpers';

/**
 * Hook personnalisé pour la gestion des produits
 * 
 * Fournit des fonctionnalités complètes pour afficher, filtrer,
 * rechercher et paginer les produits avec mise en cache.
 * 
 * @param {Object} options - Options de configuration
 * @returns {Object} État des produits et méthodes de manipulation
 */
export const useProducts = (options = {}) => {
  const {
    initialCategory = '',
    initialSubcategory = '',
    initialFilters = {},
    initialSort = FILTER_CONFIG.DEFAULT_SORT,
    pageSize = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
    enableCache = true,
    enableHistory = true
  } = options;

  // États principaux
  const [allProducts] = useState(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // États des filtres
  const [filters, setFilters] = useState({
    category: initialCategory,
    subcategory: initialSubcategory,
    priceRange: { min: 0, max: Infinity },
    colors: [],
    sizes: [],
    inStock: true,
    onSale: false,
    featured: false,
    trending: false,
    rating: 0,
    ...initialFilters
  });

  // États de recherche et tri
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(initialSort);
  const [searchHistory, setSearchHistory] = useState([]);

  // États de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Cache des résultats
  const [cache, setCache] = useState(new Map());

  /**
   * Génère une clé de cache unique basée sur les filtres actuels
   */
  const generateCacheKey = useCallback(() => {
    return JSON.stringify({
      filters,
      searchQuery,
      sortBy,
      page: currentPage,
      pageSize
    });
  }, [filters, searchQuery, sortBy, currentPage, pageSize]);

  /**
   * Sauvegarde l'historique de recherche
   */
  const saveSearchHistory = useCallback((query) => {
    if (!enableHistory || !query.trim() || query.length < SEARCH_CONFIG.MIN_QUERY_LENGTH) {
      return;
    }

    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(item => item !== query)]
        .slice(0, SEARCH_CONFIG.MAX_HISTORY_ITEMS);
      
      if (enableCache) {
        secureLocalStorageSet(SEARCH_CONFIG.STORAGE_KEY, newHistory);
      }
      
      return newHistory;
    });
  }, [enableHistory, enableCache]);

  /**
   * Charge l'historique de recherche depuis le localStorage
   */
  const loadSearchHistory = useCallback(() => {
    if (enableHistory && enableCache) {
      const history = secureLocalStorageGet(SEARCH_CONFIG.STORAGE_KEY, []);
      setSearchHistory(history);
    }
  }, [enableHistory, enableCache]);

  /**
   * Applique tous les filtres aux produits
   */
  const applyFilters = useCallback((products) => {
    let result = [...products];

    // Filtre par catégorie
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Filtre par sous-catégorie
    if (filters.subcategory) {
      result = result.filter(product => product.subcategory === filters.subcategory);
    }

    // Filtre par prix
    if (filters.priceRange.min > 0 || filters.priceRange.max < Infinity) {
      result = result.filter(product => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
      );
    }

    // Filtre par couleurs
    if (filters.colors.length > 0) {
      result = result.filter(product =>
        product.colors && product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Filtre par tailles
    if (filters.sizes.length > 0) {
      result = result.filter(product =>
        product.sizes && product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Filtre par stock
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Filtre par promotion
    if (filters.onSale) {
      result = result.filter(product => product.onSale);
    }

    // Filtre par mise en avant
    if (filters.featured) {
      result = result.filter(product => product.featured);
    }

    // Filtre par tendance
    if (filters.trending) {
      result = result.filter(product => product.trending);
    }

    // Filtre par note
    if (filters.rating > 0) {
      result = result.filter(product => product.rating >= filters.rating);
    }

    return result;
  }, [filters]);

  /**
   * Recherche et filtre les produits
   */
  const searchAndFilter = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Vérifier le cache
      const cacheKey = generateCacheKey();
      if (enableCache && cache.has(cacheKey)) {
        const cachedResult = cache.get(cacheKey);
        setFilteredProducts(cachedResult.filtered);
        setDisplayedProducts(cachedResult.displayed);
        setTotalProducts(cachedResult.total);
        setTotalPages(cachedResult.totalPages);
        setLoading(false);
        return;
      }

      let result = allProducts;

      // Appliquer la recherche textuelle en premier
      if (searchQuery.trim() && searchQuery.length >= SEARCH_CONFIG.MIN_QUERY_LENGTH) {
        result = searchProducts(searchQuery);
        saveSearchHistory(searchQuery);
      }

      // Appliquer les filtres
      result = applyFilters(result);

      // Appliquer le tri
      result = sortProducts(result, sortBy);

      // Calculer la pagination
      const total = result.length;
      const totalPagesCount = Math.ceil(total / pageSize);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const displayed = result.slice(startIndex, endIndex);

      // Mettre à jour les états
      setFilteredProducts(result);
      setDisplayedProducts(displayed);
      setTotalProducts(total);
      setTotalPages(totalPagesCount);

      // Sauvegarder en cache
      if (enableCache) {
        const cacheData = {
          filtered: result,
          displayed,
          total,
          totalPages: totalPagesCount,
          timestamp: Date.now()
        };
        
        setCache(prev => {
          const newCache = new Map(prev);
          newCache.set(cacheKey, cacheData);
          
          // Limiter la taille du cache
          if (newCache.size > 50) {
            const oldestKey = newCache.keys().next().value;
            newCache.delete(oldestKey);
          }
          
          return newCache;
        });
      }

    } catch (err) {
      console.error('Erreur recherche produits:', err);
      setError('Erreur lors de la recherche des produits');
    } finally {
      setLoading(false);
    }
  }, [
    allProducts,
    searchQuery,
    filters,
    sortBy,
    currentPage,
    pageSize,
    applyFilters,
    saveSearchHistory,
    generateCacheKey,
    enableCache,
    cache
  ]);

  /**
   * Version debouncée de la recherche
   */
  const debouncedSearch = useMemo(
    () => debounce(searchAndFilter, SEARCH_CONFIG.DEBOUNCE_DELAY),
    [searchAndFilter]
  );

  /**
   * Met à jour les filtres
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset à la première page
  }, []);

  /**
   * Met à jour la recherche
   */
  const updateSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  /**
   * Met à jour le tri
   */
  const updateSort = useCallback((newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  }, []);

  /**
   * Change de page
   */
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  /**
   * Réinitialise tous les filtres
   */
  const resetFilters = useCallback(() => {
    setFilters({
      category: '',
      subcategory: '',
      priceRange: { min: 0, max: Infinity },
      colors: [],
      sizes: [],
      inStock: true,
      onSale: false,
      featured: false,
      trending: false,
      rating: 0
    });
    setSearchQuery('');
    setSortBy(FILTER_CONFIG.DEFAULT_SORT);
    setCurrentPage(1);
    setCache(new Map());
  }, []);

  /**
   * Obtient des produits spécifiques par ID
   */
  const getProductsByIds = useCallback((ids) => {
    return ids.map(id => getProductById(id)).filter(Boolean);
  }, []);

  /**
   * Obtient des produits similaires
   */
  const getSimilarProducts = useCallback((productId, limit = 4) => {
    const product = getProductById(productId);
    if (!product) return [];

    return allProducts
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || 
         p.subcategory === product.subcategory)
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }, [allProducts]);

  /**
   * Obtient les filtres actifs sous forme de texte
   */
  const getActiveFiltersText = useMemo(() => {
    const active = [];
    
    if (searchQuery) active.push(`"${searchQuery}"`);
    if (filters.category) active.push(filters.category);
    if (filters.subcategory) active.push(filters.subcategory);
    if (filters.colors.length) active.push(`Couleurs: ${filters.colors.join(', ')}`);
    if (filters.sizes.length) active.push(`Tailles: ${filters.sizes.join(', ')}`);
    if (filters.onSale) active.push('En promotion');
    if (filters.featured) active.push('Mis en avant');
    if (filters.trending) active.push('Tendance');
    if (filters.rating > 0) active.push(`Note ≥ ${filters.rating}`);
    if (filters.priceRange.min > 0 || filters.priceRange.max < Infinity) {
      const min = filters.priceRange.min > 0 ? `${filters.priceRange.min}€` : '';
      const max = filters.priceRange.max < Infinity ? `${filters.priceRange.max}€` : '';
      if (min && max) active.push(`Prix: ${min} - ${max}`);
      else if (min) active.push(`Prix ≥ ${min}`);
      else if (max) active.push(`Prix ≤ ${max}`);
    }
    
    return active;
  }, [searchQuery, filters]);

  /**
   * Statistiques sur les résultats
   */
  const getResultStats = useMemo(() => {
    return {
      total: totalProducts,
      displayed: displayedProducts.length,
      page: currentPage,
      totalPages,
      hasResults: totalProducts > 0,
      hasMore: currentPage < totalPages,
      showing: {
        from: totalProducts > 0 ? (currentPage - 1) * pageSize + 1 : 0,
        to: Math.min(currentPage * pageSize, totalProducts)
      }
    };
  }, [totalProducts, displayedProducts.length, currentPage, totalPages, pageSize]);

  // Effets
  useEffect(() => {
    loadSearchHistory();
  }, [loadSearchHistory]);

  useEffect(() => {
    debouncedSearch();
  }, [debouncedSearch]);

  // Retour de l'API du hook
  return {
    // Données des produits
    products: displayedProducts,
    allFilteredProducts: filteredProducts,
    totalProducts,

    // État
    loading,
    error,
    hasResults: totalProducts > 0,

    // Recherche et filtres
    searchQuery,
    filters,
    sortBy,
    activeFiltersText: getActiveFiltersText,
    searchHistory,

    // Pagination
    currentPage,
    totalPages,
    pageSize,
    stats: getResultStats,

    // Actions
    updateSearch,
    updateFilters,
    updateSort,
    resetFilters,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
    clearSearchHistory: () => {
      setSearchHistory([]);
      secureLocalStorageSet(SEARCH_CONFIG.STORAGE_KEY, []);
    },

    // Utilitaires
    getProductById,
    getProductsByIds,
    getSimilarProducts,
    getFeaturedProducts,
    getTrendingProducts,
    getProductsOnSale,
    getProductsByCategory,

    // Métadonnées
    hasActiveFilters: getActiveFiltersText.length > 0,
    canLoadMore: currentPage < totalPages,
    isEmpty: totalProducts === 0 && !loading
  };
};