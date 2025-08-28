/**
 * ProductDetail.jsx - Page de détail de produit Maef By Yas
 *
 * Cette page affiche :
 * - Galerie d'images avec zoom
 * - Informations détaillées du produit
 * - Sélecteur de variantes
 * - Boutons d'action (panier, favoris)
 * - Onglets avec description, avis, etc.
 * - Produits recommandés
 * - Breadcrumb navigation
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Share2,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Info,
  Check,
  AlertCircle,
  Plus,
  Minus,
  Package,
  User,
  Calendar,
  Eye,
  ThumbsUp,
  MessageCircle,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";

// Imports des données et composants
import { PRODUCTS, getProductById } from "../data/products";
import ProductInfo from "../components/product/ProductInfo";
import { useCart } from "../hooks/useCart";
import { formatPrice, calculateDiscountPercentage } from "../utils/helpers";

// Mock données pour les avis
const mockReviews = [
  {
    id: 1,
    user: "Amina K.",
    avatar: "👩🏾",
    rating: 5,
    date: "2024-01-15",
    verified: true,
    title: "Qualité exceptionnelle !",
    comment:
      "Absolument magnifique ! La qualité des tissus et les finitions sont parfaites. Je recommande vivement.",
    images: [],
    helpful: 12,
    size: "M",
    color: "Rouge",
  },
  {
    id: 2,
    user: "Marie L.",
    avatar: "👩🏼",
    rating: 4,
    date: "2024-01-10",
    verified: true,
    title: "Très satisfaite de mon achat",
    comment:
      "Produit conforme à la description. Livraison rapide et emballage soigné. Une étoile en moins pour le délai de traitement un peu long.",
    images: [],
    helpful: 8,
    size: "L",
    color: "Bleu",
  },
  {
    id: 3,
    user: "Fatou D.",
    avatar: "👩🏿",
    rating: 5,
    date: "2024-01-08",
    verified: true,
    title: "Parfait pour les occasions spéciales",
    comment:
      "J'ai porté ce produit pour un mariage et j'ai reçu tellement de compliments ! La coupe est parfaite et les couleurs éclatantes.",
    images: [],
    helpful: 15,
    size: "S",
    color: "Jaune",
  },
];

// Composant Galerie d'images
const ProductGallery = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  const images = product?.images || ["/images/products/pagnes/pagne_12.jpg"];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <img
          src={images[currentImage]}
          alt={`${product?.name} - Image ${currentImage + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          onError={(e) => {
            e.target.src = "/images/products/pagnes/pagne_12.jpg";
          }}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product?.onSale && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              -
              {calculateDiscountPercentage(
                product.originalPrice,
                product.price
              )}
              %
            </span>
          )}
          {product?.featured && (
            <span className="bg-primary-600 text-white px-2 py-1 rounded text-sm font-semibold flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              Vedette
            </span>
          )}
          {product?.trending && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
              🔥 Tendance
            </span>
          )}
        </div>

        {/* Boutons de navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md"
            title="Zoomer"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowLightbox(true)}
            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md"
            title="Voir en grand"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Indicateurs */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImage
                  ? "border-primary-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/products/pagnes/pagne_12.jpg";
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white p-2"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-full">
            <img
              src={images[currentImage]}
              alt={`${product?.name} - Grande image`}
              className="max-w-full max-h-full object-contain"
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImage ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Onglets de contenu
const ProductTabs = ({ product, reviews }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description", icon: Info },
    { id: "details", label: "Détails", icon: Package },
    { id: "reviews", label: `Avis (${reviews.length})`, icon: Star },
    { id: "shipping", label: "Livraison", icon: Truck },
  ];

  return (
    <div className="mt-12">
      {/* Navigation des onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="mt-6">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              {product?.longDescription || product?.description}
            </p>
            {product?.tags && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Mots-clés</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <dl className="space-y-4">
              {product?.brand && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Marque</dt>
                  <dd className="text-gray-900">{product.brand}</dd>
                </div>
              )}
              {product?.material && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Matière</dt>
                  <dd className="text-gray-900">{product.material}</dd>
                </div>
              )}
              {product?.origin && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Origine</dt>
                  <dd className="text-gray-900">{product.origin}</dd>
                </div>
              )}
              {product?.dimensions && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Dimensions
                  </dt>
                  <dd className="text-gray-900">{product.dimensions}</dd>
                </div>
              )}
            </dl>
            <dl className="space-y-4">
              {product?.weight && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Poids</dt>
                  <dd className="text-gray-900">{product.weight}</dd>
                </div>
              )}
              {product?.care && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Entretien
                  </dt>
                  <dd className="text-gray-900">{product.care}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Catégorie</dt>
                <dd className="text-gray-900 capitalize">
                  {product?.category}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Référence</dt>
                <dd className="text-gray-900">{product?.id}</dd>
              </div>
            </dl>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Résumé des avis */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Avis clients</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product?.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">
                    {product?.rating}
                  </span>
                  <span className="text-gray-500">({reviews.length} avis)</span>
                </div>
              </div>

              {/* Distribution des notes */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const percentage =
                    reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{star}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Liste des avis */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{review.avatar}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.user}</span>
                          {review.verified && (
                            <span className="inline-flex items-center text-green-600 text-xs">
                              <Check className="w-3 h-3 mr-1" />
                              Achat vérifié
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                          {review.size && <span>• Taille: {review.size}</span>}
                          {review.color && (
                            <span>• Couleur: {review.color}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2">{review.title}</h4>
                  <p className="text-gray-700 mb-3">{review.comment}</p>

                  <div className="flex items-center justify-between text-sm">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Utile ({review.helpful})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <MessageCircle className="w-4 h-4" />
                      <span>Répondre</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton voir plus d'avis */}
            <div className="text-center">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Voir tous les avis
              </button>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Truck className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Livraison gratuite</h3>
                <p className="text-sm text-gray-600">Dès 50€ d'achat</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Paiement sécurisé</h3>
                <p className="text-sm text-gray-600">SSL 256-bit</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Retours gratuits</h3>
                <p className="text-sm text-gray-600">
                  30 jours pour changer d'avis
                </p>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3>Informations de livraison</h3>
              <ul>
                <li>
                  <strong>France métropolitaine :</strong> 3-5 jours ouvrés
                  (gratuit dès 50€)
                </li>
                <li>
                  <strong>Europe :</strong> 5-7 jours ouvrés
                </li>
                <li>
                  <strong>International :</strong> 7-14 jours ouvrés
                </li>
              </ul>

              <h3>Politique de retour</h3>
              <p>
                Vous disposez de 30 jours après réception pour retourner vos
                articles. Les produits doivent être dans leur état d'origine
                avec les étiquettes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant principal ProductDetail
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Charger le produit
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);

        // Charger les produits recommandés (même catégorie)
        const recommended = PRODUCTS.filter(
          (p) =>
            p.category === foundProduct.category && p.id !== foundProduct.id
        ).slice(0, 4);
        setRecommendedProducts(recommended);
      } else {
        setError("Produit non trouvé");
      }
    } catch (err) {
      console.error("Erreur lors du chargement du produit:", err);
      setError("Erreur lors du chargement du produit");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Produit non trouvé
          </h1>
          <p className="text-gray-600 mb-6">
            Le produit que vous cherchez n'existe plus ou a été déplacé.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Retourner à la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">
              Accueil
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary-600">
              Boutique
            </Link>
            <span>/</span>
            <Link
              to={`/shop?category=${product.category}`}
              className="hover:text-primary-600 capitalize"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Informations du produit */}
          <div>
            <ProductInfo
              product={product}
              onAddToCart={(result) => {
                console.log("Produit ajouté au panier:", result);
              }}
              onToggleFavorite={(productId) => {
                console.log("Toggle favorite:", productId);
              }}
              className="sticky top-8"
            />
          </div>
        </div>

        {/* Onglets de contenu */}
        <ProductTabs product={product} reviews={mockReviews} />

        {/* Produits recommandés */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Produits similaires
              </h2>
              <Link
                to={`/shop?category=${product.category}`}
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Voir tout
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((recommendedProduct) => (
                <div
                  key={recommendedProduct.id}
                  onClick={() => navigate(`/product/${recommendedProduct.id}`)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={
                        recommendedProduct.images?.[0] ||
                        "/images/products/pagnes/pagne_12.jpg"
                      }
                      alt={recommendedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.src = "/images/products/pagnes/pagne_12.jpg";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {recommendedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize mb-2">
                      {recommendedProduct.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-600">
                        {formatPrice(recommendedProduct.price)}
                      </span>
                      {recommendedProduct.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            {recommendedProduct.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
