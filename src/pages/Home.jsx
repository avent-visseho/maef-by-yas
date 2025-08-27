/**
 * Home.jsx - Page d'accueil principale de Maef By Yas
 *
 * Cette page affiche :
 * - Section hero avec carrousel
 * - Catégories en vedette
 * - Produits vedette et tendances
 * - Newsletter et témoignages
 * - Informations sur la livraison et garanties
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Truck, 
  Shield, 
  RotateCcw, 
  Headphones, 
  Star, 
  Users, 
  Package, 
  Heart, 
  ArrowRight, 
  ShoppingBag, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Gift,
  Eye,
  TrendingUp,
  Zap,
  Plus,
  Minus
} from 'lucide-react';

// Mock data basé sur vos données existantes
const mockFeaturedProducts = [
  {
    id: 'pagne-001',
    name: 'Pagne Wax Traditionnel Royal',
    category: 'pagnes',
    price: 45.00,
    originalPrice: 60.00,
    images: ['/images/products/pagnes/pagne-001-1.jpg'],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    quantity: 25,
    featured: true,
    trending: false,
    onSale: true,
    description: 'Magnifique pagne wax authentique aux motifs traditionnels africains.',
    tags: ['traditionnel', 'wax', 'coton', 'authentique', 'africain']
  },
  {
    id: 'bijoux-001', 
    name: 'Collier Perles Dorées Africaines',
    category: 'bijoux',
    price: 89.00,
    images: ['/images/products/bijoux/collier-001-1.jpg'],
    rating: 4.9,
    reviews: 67,
    inStock: true,
    quantity: 12,
    featured: true,
    trending: false,
    onSale: false,
    description: 'Sublime collier en perles dorées artisanales inspiré des bijoux traditionnels africains.'
  },
  {
    id: 'sac-001',
    name: 'Sac à Main Cuir Tressé Artisanal', 
    category: 'sacs',
    price: 156.00,
    images: ['/images/products/sacs/sac-001-1.jpg'],
    rating: 4.8,
    reviews: 43,
    inStock: true,
    quantity: 8,
    featured: true,
    trending: false,
    onSale: false,
    description: 'Sac à main en cuir véritable tressé à la main par nos artisans.'
  },
  {
    id: 'chaussure-001',
    name: 'Escarpins Élégants Bout Pointu',
    category: 'chaussures',
    price: 98.00,
    images: ['/images/products/chaussures/escarpin-001-1.jpg'],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    quantity: 35,
    featured: false,
    trending: true,
    onSale: false,
    description: 'Escarpins élégants à bout pointu avec talon de 8cm.'
  },
  {
    id: 'voile-001',
    name: 'Voile Suisse Premium Brodé Main',
    category: 'voiles-suisses',
    price: 234.00,
    images: ['/images/products/voiles/voile-001-1.jpg'],
    rating: 4.9,
    reviews: 34,
    inStock: true,
    quantity: 15,
    featured: true,
    trending: false,
    onSale: false,
    description: 'Voile suisse de qualité premium avec broderies fines réalisées à la main.'
  },
  {
    id: 'bijoux-003',
    name: 'Bracelet Manchette Cuivre Gravé',
    category: 'bijoux',
    price: 67.00,
    originalPrice: 89.00,
    images: ['/images/products/bijoux/bracelet-001-1.jpg'],
    rating: 4.4,
    reviews: 52,
    inStock: true,
    quantity: 15,
    featured: false,
    trending: true,
    onSale: true,
    description: 'Bracelet manchette en cuivre avec gravures traditionnelles africaines.'
  }
];

const mockCategories = [
  { 
    id: 'pagnes', 
    name: 'Pagnes', 
    icon: '🎨', 
    color: '#DC2626', 
    image: '/images/categories/pagnes-hero.jpg', 
    description: 'Pagnes wax et ankara authentiques' 
  },
  { 
    id: 'bijoux', 
    name: 'Bijoux', 
    icon: '💎', 
    color: '#D97706', 
    image: '/images/categories/bijoux-hero.jpg', 
    description: 'Bijoux artisanaux uniques' 
  },
  { 
    id: 'sacs', 
    name: 'Sacs', 
    icon: '👜', 
    color: '#059669', 
    image: '/images/categories/sacs-hero.jpg', 
    description: 'Maroquinerie de qualité' 
  },
  { 
    id: 'chaussures', 
    name: 'Chaussures', 
    icon: '👠', 
    color: '#7C3AED', 
    image: '/images/categories/chaussures-hero.jpg', 
    description: 'Chaussures élégantes & confortables' 
  }
];

const heroSlides = [
  {
    id: 'slide-1',
    title: 'Authentique Mode Africaine',
    subtitle: 'Collection Premium 2024', 
    description: 'Découvrez nos créations uniques inspirées des traditions africaines. Chaque pièce raconte une histoire d\'artisanat et d\'authenticité.',
    image: '/images/hero/hero-1.jpg',
    ctaText: 'Découvrir la Collection',
    theme: 'dark'
  },
  {
    id: 'slide-2',
    title: 'Bijoux Artisanaux Exceptionnels',
    subtitle: 'Fait main avec passion',
    description: 'Des bijoux uniques créés par nos artisans partenaires. Matériaux nobles et techniques ancestrales pour des pièces d\'exception.',
    image: '/images/hero/hero-2.jpg', 
    ctaText: 'Voir les Bijoux',
    theme: 'light'
  },
  {
    id: 'slide-3',
    title: 'Maroquinerie de Luxe',
    subtitle: 'Cuir véritable et design intemporel',
    description: 'Sacs et accessoires en cuir de première qualité. Savoir-faire traditionnel et finitions impeccables.',
    image: '/images/hero/hero-3.jpg',
    ctaText: 'Explorer les Sacs',
    theme: 'dark'
  }
];

// Contexte panier simplifié pour la démo
const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({
    items: [],
    totalItems: 0,
    totalAmount: 0,
    isOpen: false
  });

  const addToCart = (product, quantity = 1) => {
    setCartState(prev => {
      const existingItem = prev.items.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = prev.items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, { ...product, quantity }];
      }

      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...prev,
        items: newItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount
      };
    });
  };

  const removeFromCart = (productId) => {
    setCartState(prev => {
      const newItems = prev.items.filter(item => item.id !== productId);
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...prev,
        items: newItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount
      };
    });
  };

  const toggleCart = () => {
    setCartState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const isInCart = (productId) => {
    return cartState.items.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider value={{
      ...cartState,
      addToCart,
      removeFromCart,
      toggleCart,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Utilitaires
const formatPrice = (price, currency = 'EUR') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

const calculateDiscountPercentage = (originalPrice, salePrice) => {
  if (originalPrice <= 0 || salePrice <= 0 || salePrice >= originalPrice) {
    return 0;
  }
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
};

// Composant Hero
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Images de fond avec dégradés */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Simule des images avec des dégradés colorés */}
            <div className={`w-full h-full ${
              slide.id === 'slide-1' ? 'bg-gradient-to-r from-pink-600 to-purple-700' :
              slide.id === 'slide-2' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
              'bg-gradient-to-r from-emerald-600 to-teal-700'
            }`} />
            <div className={`absolute inset-0 ${
              slide.theme === 'dark' 
                ? 'bg-gradient-to-r from-black/70 via-black/50 to-black/30'
                : 'bg-gradient-to-r from-black/50 via-black/30 to-black/10'
            }`} />
          </div>
        ))}
      </div>

      {/* Contenu */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-2xl">
          <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium tracking-wider uppercase text-yellow-300">
                {currentSlideData.subtitle}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-white">
              {currentSlideData.title}
            </h1>

            <p className="text-lg sm:text-xl mb-8 leading-relaxed text-gray-100">
              {currentSlideData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center space-x-3">
                <ShoppingBag className="w-5 h-5" />
                <span>{currentSlideData.ctaText}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="group px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-3">
                <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Voir la vidéo</span>
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { number: '500+', label: 'Produits uniques' },
                { number: '2000+', label: 'Clients satisfaits' },
                { number: '100%', label: 'Authentique' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold mb-1 text-white">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {heroSlides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-colors group"
            aria-label="Slide précédente"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </button>
          <button
            onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-colors group"
            aria-label="Slide suivante"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>
        </>
      )}

      {/* Indicateurs */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

// Composant ProductCard
const ProductCard = ({ product, onToggleFavorite, isFavorite = false }) => {
  const { addToCart, isInCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);
  const isInCartAlready = isInCart(product.id);

  const handleAddToCart = async () => {
    if (isInCartAlready) return;
    
    setIsAddingToCart(true);
    try {
      // Simulation d'un délai d'ajout
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart(product, 1);
    } catch (error) {
      console.error('Erreur ajout panier:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
          {product.onSale && discountPercentage > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
              -{discountPercentage}%
            </div>
          )}
          {product.featured && (
            <div className="bg-pink-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              Vedette
            </div>
          )}
          {product.trending && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              🔥 Tendance
            </div>
          )}
        </div>

        {/* Actions rapides */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleFavorite?.(product.id)}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isFavorite
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-white text-gray-600 hover:text-red-600'
            }`}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button className="p-2 bg-white text-gray-600 hover:text-pink-600 rounded-full shadow-md transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Image simulée avec dégradé */}
        <div className={`w-full h-full ${
          product.category === 'pagnes' ? 'bg-gradient-to-br from-red-300 to-pink-400' :
          product.category === 'bijoux' ? 'bg-gradient-to-br from-yellow-300 to-amber-400' :
          product.category === 'sacs' ? 'bg-gradient-to-br from-green-300 to-emerald-400' :
          product.category === 'chaussures' ? 'bg-gradient-to-br from-purple-300 to-indigo-400' :
          'bg-gradient-to-br from-gray-300 to-gray-400'
        } transition-transform duration-500 group-hover:scale-110`} />
        
        {/* Stock faible */}
        {product.inStock && product.quantity && product.quantity < 10 && (
          <div className="absolute bottom-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
            Plus que {product.quantity}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-pink-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {product.rating && (
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            {product.reviews && (
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            )}
          </div>
        )}

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
        </div>

        {product.inStock && (
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isInCartAlready}
            className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
              isInCartAlready
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-pink-600 text-white hover:bg-pink-700'
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
                <ShoppingBag className="w-4 h-4 mr-2" />
                Ajouter au panier
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// Composant Categories
const Categories = ({ onCategoryClick }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockCategories.map((category, index) => (
        <div
          key={category.id}
          onClick={() => onCategoryClick?.(category)}
          onMouseEnter={() => setHoveredCategory(category.id)}
          onMouseLeave={() => setHoveredCategory(null)}
          className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 aspect-[4/3]"
        >
          {/* Background simulé */}
          <div className={`absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-80 transition-opacity`}
            style={{ backgroundColor: category.color }} />
          
          <div className="relative h-full flex flex-col justify-between p-6 text-white z-10">
            <div className="flex items-center justify-between">
              <div className="text-4xl mb-2">{category.icon}</div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-bold group-hover:text-yellow-300 transition-colors">
                {category.name}
              </h3>

              <p className={`text-sm text-gray-200 leading-relaxed transition-all duration-300 ${
                hoveredCategory === category.id
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-80 transform translate-y-2'
              }`}>
                {category.description}
              </p>

              <div className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                hoveredCategory === category.id
                  ? 'opacity-100 transform translate-x-0'
                  : 'opacity-0 transform -translate-x-4'
              }`}>
                <span>Découvrir</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Effet de brillance au hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-all duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]"
            style={{ transform: 'skewX(-25deg)' }} />
        </div>
      ))}
    </div>
  );
};

// Composant FeaturedProducts
const FeaturedProducts = ({ title, products = [], onProductClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 4;
  const maxSlide = Math.ceil(products.length / itemsPerView) - 1;

  const goToSlide = (direction) => {
    if (direction === 'next') {
      setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
    } else {
      setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
    }
  };

  const visibleProducts = products.slice(
    currentSlide * itemsPerView,
    (currentSlide + 1) * itemsPerView
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de créations exceptionnelles
          </p>
        </div>

        <div className="relative">
          {products.length > itemsPerView && (
            <>
              <button
                onClick={() => goToSlide('prev')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors group"
                aria-label="Produits précédents"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={() => goToSlide('next')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors group"
                aria-label="Produits suivants"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-in"
                style={{