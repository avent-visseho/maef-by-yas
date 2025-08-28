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

import React, { useState, useEffect, useMemo } from "react";
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
  Minus,
  Check,
  Mail,
  Award,
  Clock,
  MapPin,
  Quote,
  Send,
} from "lucide-react";

// Mock data basé sur vos données existantes
const mockFeaturedProducts = [
  {
    id: "pagne-001",
    name: "Pagne Wax Traditionnel Royal",
    category: "pagnes",
    price: 45.0,
    originalPrice: 60.0,
    images: ["/images/products/pagnes/pagne_7.jpg"],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    quantity: 25,
    featured: true,
    trending: false,
    onSale: true,
    description:
      "Magnifique pagne wax authentique aux motifs traditionnels africains.",
    tags: ["traditionnel", "wax", "coton", "authentique", "africain"],
  },
  {
    id: "bijoux-001",
    name: "Collier Perles Dorées Africaines",
    category: "bijoux",
    price: 89.0,
    images: ["/images/products/bijoux/collier_1.jpg"],
    rating: 4.9,
    reviews: 67,
    inStock: true,
    quantity: 12,
    featured: true,
    trending: false,
    onSale: false,
    description:
      "Sublime collier en perles dorées artisanales inspiré des bijoux traditionnels africains.",
  },
  {
    id: "sac-001",
    name: "Sac à Main Cuir Tressé Artisanal",
    category: "sacs",
    price: 156.0,
    images: ["/images/products/sacs/sac_1.jpg"],
    rating: 4.8,
    reviews: 43,
    inStock: true,
    quantity: 8,
    featured: true,
    trending: false,
    onSale: false,
    description:
      "Sac à main en cuir véritable tressé à la main par nos artisans.",
  },
  {
    id: "chaussure-001",
    name: "Escarpins Élégants Bout Pointu",
    category: "chaussures",
    price: 98.0,
    images: ["/images/products/chaussures/chausure_3.jpg"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    quantity: 35,
    featured: false,
    trending: true,
    onSale: false,
    description: "Escarpins élégants à bout pointu avec talon de 8cm.",
  },
  {
    id: "voile-001",
    name: "Voile Suisse Premium Brodé Main",
    category: "voiles-suisses",
    price: 234.0,
    images: ["/images/products/voiles/voiles_1.jpeg"],
    rating: 4.9,
    reviews: 34,
    inStock: true,
    quantity: 15,
    featured: true,
    trending: false,
    onSale: false,
    description:
      "Voile suisse de qualité premium avec broderies fines réalisées à la main.",
  },
  {
    id: "bijoux-003",
    name: "Bracelet Manchette Cuivre Gravé",
    category: "bijoux",
    price: 67.0,
    originalPrice: 89.0,
    images: ["/images/products/bijoux/bracelet_1.jpg"],
    rating: 4.4,
    reviews: 52,
    inStock: true,
    quantity: 15,
    featured: false,
    trending: true,
    onSale: true,
    description:
      "Bracelet manchette en cuivre avec gravures traditionnelles africaines.",
  },
];

const mockCategories = [
  {
    id: "pagnes",
    name: "Pagnes",
    icon: "🎨",
    color: "#DC2626",
    image: "/images/products/pagnes/pagne_7.jpg",
    description: "Pagnes wax et ankara authentiques",
  },
  {
    id: "bijoux",
    name: "Bijoux",
    icon: "💎",
    color: "#D97706",
    image: "/images/products/pagnes/pagne_7.jpg",
    description: "Bijoux artisanaux uniques",
  },
  {
    id: "sacs",
    name: "Sacs",
    icon: "👜",
    color: "#059669",
    image: "/images/products/pagnes/pagne_7.jpg",
    description: "Maroquinerie de qualité",
  },
  {
    id: "chaussures",
    name: "Chaussures",
    icon: "👠",
    color: "#7C3AED",
    image: "/images/products/pagnes/pagne_7.jpg",
    description: "Chaussures élégantes & confortables",
  },
];

const heroSlides = [
  {
    id: "slide-1",
    title: "Authentique Mode Africaine",
    subtitle: "Collection Premium 2024",
    description:
      "Découvrez nos créations uniques inspirées des traditions africaines. Chaque pièce raconte une histoire d'artisanat et d'authenticité.",
    image: "/images/products/pagnes/pagne_12.jpg",
    ctaText: "Découvrir la Collection",
    theme: "dark",
  },
  {
    id: "slide-2",
    title: "Bijoux Artisanaux Exceptionnels",
    subtitle: "Fait main avec passion",
    description:
      "Des bijoux uniques créés par nos artisans partenaires. Matériaux nobles et techniques ancestrales pour des pièces d'exception.",
    image: "/images/products/pagnes/pagne_15.jpg",
    ctaText: "Voir les Bijoux",
    theme: "light",
  },
  {
    id: "slide-3",
    title: "Maroquinerie de Luxe",
    subtitle: "Cuir véritable et design intemporel",
    description:
      "Sacs et accessoires en cuir de première qualité. Savoir-faire traditionnel et finitions impeccables.",
    image: "/images/products/pagnes/pagne_14.jpg",
    ctaText: "Explorer les Sacs",
    theme: "dark",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Amina K.",
    location: "Paris",
    rating: 5,
    text: "Des produits d'une qualité exceptionnelle ! J'ai commandé plusieurs pagnes et ils sont magnifiques. Livraison rapide et emballage soigné.",
    avatar: "👩🏾",
  },
  {
    id: 2,
    name: "Marie L.",
    location: "Lyon",
    rating: 5,
    text: "Je suis conquise par les bijoux artisanaux. Chaque pièce est unique et raconte une histoire. Service client au top !",
    avatar: "👩🏼",
  },
  {
    id: 3,
    name: "Fatou D.",
    location: "Marseille",
    rating: 5,
    text: "Mes sacs préférés viennent de chez Maef By Yas. La qualité du cuir et les finitions sont irréprochables.",
    avatar: "👩🏿",
  },
];

// Contexte panier simplifié pour la démo
const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({
    items: [],
    totalItems: 0,
    totalAmount: 0,
    isOpen: false,
  });

  const addToCart = (product, quantity = 1) => {
    setCartState((prev) => {
      const existingItem = prev.items.find((item) => item.id === product.id);

      let newItems;
      if (existingItem) {
        newItems = prev.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, { ...product, quantity }];
      }

      const newTotalItems = newItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const newTotalAmount = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...prev,
        items: newItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount,
      };
    });
  };

  const removeFromCart = (productId) => {
    setCartState((prev) => {
      const newItems = prev.items.filter((item) => item.id !== productId);
      const newTotalItems = newItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const newTotalAmount = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...prev,
        items: newItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount,
      };
    });
  };

  const toggleCart = () => {
    setCartState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const isInCart = (productId) => {
    return cartState.items.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        addToCart,
        removeFromCart,
        toggleCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

// Utilitaires
const formatPrice = (price, currency = "EUR") => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
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
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
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
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image d'arrière-plan réelle */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback vers un dégradé si l'image ne charge pas
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            {/* Dégradé de fallback */}
            <div
              className={`w-full h-full ${
                slide.id === "slide-1"
                  ? "bg-gradient-to-r from-pink-600 to-purple-700"
                  : slide.id === "slide-2"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600"
                  : "bg-gradient-to-r from-emerald-600 to-teal-700"
              }`}
              style={{ display: "none" }}
            />
            {/* Overlay gradient */}
            <div
              className={`absolute inset-0 ${
                slide.theme === "dark"
                  ? "bg-gradient-to-r from-black/70 via-black/50 to-black/30"
                  : "bg-gradient-to-r from-black/50 via-black/30 to-black/10"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Contenu */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-2xl">
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
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
                { number: "500+", label: "Produits uniques" },
                { number: "2000+", label: "Clients satisfaits" },
                { number: "100%", label: "Authentique" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold mb-1 text-white">
                    {stat.number}
                  </div>
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
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-colors group"
            aria-label="Slide précédente"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((currentSlide + 1) % heroSlides.length)
            }
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
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
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

  const discountPercentage = calculateDiscountPercentage(
    product.originalPrice,
    product.price
  );
  const isInCartAlready = isInCart(product.id);

  const handleAddToCart = async () => {
    if (isInCartAlready) return;

    setIsAddingToCart(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      addToCart(product, 1);
    } catch (error) {
      console.error("Erreur ajout panier:", error);
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
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-white text-gray-600 hover:text-red-600"
            }`}
            aria-label={
              isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
            }
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <button className="p-2 bg-white text-gray-600 hover:text-pink-600 rounded-full shadow-md transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Image du produit */}
        <img
          src={product.images?.[0] || "/images/products/pagnes/pagne_12.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback vers un dégradé si l'image ne charge pas
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        {/* Dégradé de fallback */}
        <div
          className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
            product.category === "pagnes"
              ? "bg-gradient-to-br from-red-300 to-pink-400"
              : product.category === "bijoux"
              ? "bg-gradient-to-br from-yellow-300 to-amber-400"
              : product.category === "sacs"
              ? "bg-gradient-to-br from-green-300 to-emerald-400"
              : product.category === "chaussures"
              ? "bg-gradient-to-br from-purple-300 to-indigo-400"
              : "bg-gradient-to-br from-gray-300 to-gray-400"
          }`}
          style={{ display: "none" }}
        />

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
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            {product.reviews && (
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviews})
              </span>
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
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-pink-600 text-white hover:bg-pink-700"
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
          <div
            className={`absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-80 transition-opacity`}
            style={{ backgroundColor: category.color }}
          />

          <div className="relative h-full border-dashed border-2  flex flex-col justify-between p-6 text-white z-10">
            <div className="flex items-center justify-between">
              <div className="text-4xl mb-2">{category.icon}</div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-bold group-hover:text-yellow-300 transition-colors">
                {category.name}
              </h3>

              <p
                className={`text-sm text-black-200 leading-relaxed transition-all duration-300 ${
                  hoveredCategory === category.id
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-80 transform translate-y-2"
                }`}
              >
                {category.description}
              </p>

              <div
                className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                  hoveredCategory === category.id
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform -translate-x-4"
                }`}
              >
                <span>Découvrir</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-all duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]"
            style={{ transform: "skewX(-25deg)" }}
          />
        </div>
      ))}
    </div>
  );
};

// Composant FeaturedProducts
const FeaturedProducts = ({ title, products = [], onProductClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const itemsPerView = 4;
  const maxSlide = Math.ceil(products.length / itemsPerView) - 1;

  const goToSlide = (direction) => {
    if (direction === "next") {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    } else {
      setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
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
                onClick={() => goToSlide("prev")}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors group"
                aria-label="Produits précédents"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={() => goToSlide("next")}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors group"
                aria-label="Produits suivants"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
                onClick={() => onProductClick?.(product)}
              />
            ))}
          </div>

          {/* Indicateurs */}
          {products.length > itemsPerView && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: maxSlide + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-pink-600 scale-125"
                      : "bg-gray-300 hover:bg-pink-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button className="group inline-flex items-center space-x-2 px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
            <span>Voir tous les produits</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Composant TrustedBy
const TrustedBy = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-lg font-medium text-gray-600 mb-6">
            Ils nous font confiance
          </h3>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {[
              "Partner 1",
              "Partner 2",
              "Partner 3",
              "Partner 4",
              "Partner 5",
            ].map((partner, index) => (
              <div
                key={index}
                className="w-24 h-12 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-500"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Features
const Features = () => {
  const features = [
    {
      icon: Truck,
      title: "Livraison Gratuite",
      description: "Dès 50€ d'achat en France métropolitaine",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Paiement Sécurisé",
      description: "Transactions 100% sécurisées SSL",
      color: "text-green-600",
    },
    {
      icon: RotateCcw,
      title: "Retour Gratuit",
      description: "30 jours pour changer d'avis",
      color: "text-purple-600",
    },
    {
      icon: Headphones,
      title: "Service Client",
      description: "Support 7j/7 par chat ou téléphone",
      color: "text-pink-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Testimonials
const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les avis authentiques de notre communauté
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-8">
                  <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-2xl">
                    <div className="flex items-center justify-center mb-6">
                      <Quote className="w-8 h-8 text-pink-300" />
                    </div>

                    <blockquote className="text-lg text-gray-700 text-center mb-6 italic">
                      "{testimonial.text}"
                    </blockquote>

                    <div className="flex items-center justify-center space-x-1 mb-4">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-center">
                      <div className="text-2xl mb-2">{testimonial.avatar}</div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-pink-600 scale-125"
                    : "bg-gray-300 hover:bg-pink-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Newsletter
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Erreur inscription newsletter:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {isSubscribed ? (
            <div className="text-white">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">
                Merci pour votre inscription !
              </h2>
              <p className="text-xl text-pink-100">
                Vous recevrez bientôt votre code de réduction par email.
              </p>
            </div>
          ) : (
            <>
              <div className="text-white mb-8">
                <h2 className="text-3xl sm:text-4xl text-white font-serif font-bold mb-4">
                  Restez connecté à l'authenticité
                </h2>
                <p className="text-xl text-pink-100 max-w-2xl mx-auto">
                  Recevez en exclusivité nos nouveautés, bons plans et 10% de
                  réduction sur votre première commande
                </p>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                  {[
                    {
                      icon: Gift,
                      text: "10% de réduction sur votre première commande",
                    },
                    {
                      icon: TrendingUp,
                      text: "Accès exclusif aux ventes privées",
                    },
                    {
                      icon: Sparkles,
                      text: "Conseils et tendances mode africaine",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <benefit.icon className="w-6 h-6 text-pink-300" />
                      <span className="text-sm">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      className="w-full pl-12 pr-4 py-4 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900"
                      disabled={isSubscribing}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing || !email.trim()}
                    className="px-8 py-4 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubscribing ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mr-2" />
                        ...
                      </div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-pink-200 mt-4">
                  En vous inscrivant, vous acceptez de recevoir nos emails
                  marketing. Vous pouvez vous désabonner à tout moment.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Composant AboutPreview
const AboutPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-6">
              L'authenticité à portée de main
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Chez Maef By Yas, nous célébrons la richesse et la beauté de
              l'artisanat africain. Chaque produit est soigneusement sélectionné
              auprès d'artisans talentueux qui perpétuent des traditions
              séculaires avec passion et expertise.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              De nos pagnes wax authentiques à nos bijoux artisanaux uniques, en
              passant par notre maroquinerie de qualité, nous vous invitons à
              découvrir un univers où chaque création raconte une histoire.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  icon: Award,
                  label: "500+ Créations uniques",
                  color: "text-pink-600",
                },
                {
                  icon: Users,
                  label: "50+ Artisans partenaires",
                  color: "text-purple-600",
                },
                {
                  icon: Package,
                  label: "2000+ Clients satisfaits",
                  color: "text-green-600",
                },
                {
                  icon: Clock,
                  label: "5+ Années d'expérience",
                  color: "text-blue-600",
                },
              ].map((stat, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="font-medium text-gray-900">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <button className="group inline-flex items-center space-x-2 px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              <span>En savoir plus sur nous</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="relative">
            {/* Image de la section About */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="/images/products/pagnes/pagne_12.jpg"
                alt="Nos artisans au travail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback vers un dégradé si l'image ne charge pas
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              {/* Dégradé de fallback */}
              <div
                className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400"
                style={{ display: "none" }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">
                  Notre Histoire
                </h3>
                <p className="text-pink-100">
                  Une passion partagée pour l'art et la culture africaine
                </p>
              </div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant principal Home
const Home = () => {
  const [featuredProducts] = useState(
    mockFeaturedProducts.filter((p) => p.featured)
  );
  const [trendingProducts] = useState(
    mockFeaturedProducts.filter((p) => p.trending)
  );

  const handleCategoryClick = (category) => {
    console.log("Navigate to category:", category.id);
    // Navigation vers la page catégorie
  };

  const handleProductClick = (product) => {
    console.log("Navigate to product:", product.id);
    // Navigation vers la page produit
  };

  return (
    <CartProvider>
      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Trust Indicators */}
        <TrustedBy />

        {/* Categories Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
                Nos Collections
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explorez notre univers d'artisanat authentique
              </p>
            </div>
            <Categories onCategoryClick={handleCategoryClick} />
          </div>
        </section>

        {/* Featured Products */}
        <FeaturedProducts
          title="Produits en Vedette"
          products={featuredProducts}
          onProductClick={handleProductClick}
        />

        {/* Features */}
        <Features />

        {/* Trending Products */}
        <FeaturedProducts
          title="Tendances du Moment"
          products={trendingProducts}
          onProductClick={handleProductClick}
        />

        {/* About Preview */}
        <AboutPreview />

        {/* Testimonials */}
        <Testimonials />

        {/* Newsletter */}
        <Newsletter />
      </div>
    </CartProvider>
  );
};

export default Home;
