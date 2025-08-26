/**
 * Hero.jsx - Composant hero de la page d'accueil Maef By Yas
 *
 * Ce composant gère :
 * - Section hero avec arrière-plan dynamique
 * - Carrousel d'images/contenu
 * - Texte de présentation et call-to-action
 * - Animations d'entrée
 * - Version responsive
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  Play,
  ArrowRight,
} from "lucide-react";
import { optimizeImageUrl } from "@utils/helpers";

/**
 * Configuration du hero par défaut
 */
const DEFAULT_HERO_CONFIG = {
  slides: [
    {
      id: "slide-1",
      title: "Collection Pagnes Authentiques",
      subtitle: "Découvrez la richesse de l'artisanat africain",
      description:
        "Des pagnes wax et kente authentiques sélectionnés avec passion pour sublimer votre style unique.",
      image: "/images/hero/hero-1.jpg",
      ctaText: "Découvrir",
      ctaLink: "/shop?category=pagnes",
      theme: "light",
    },
    {
      id: "slide-2",
      title: "Bijoux Artisanaux Uniques",
      subtitle: "L'excellence de l'artisanat fait main",
      description:
        "Chaque bijou raconte une histoire et porte l'héritage des traditions séculaires africaines.",
      image: "/images/hero/hero-2.jpg",
      ctaText: "Explorer",
      ctaLink: "/shop?category=bijoux",
      theme: "dark",
    },
    {
      id: "slide-3",
      title: "Maroquinerie de Qualité",
      subtitle: "Savoir-faire et élégance réunis",
      description:
        "Des sacs et accessoires en cuir véritable, conçus par des artisans passionnés.",
      image: "/images/hero/hero-3.jpg",
      ctaText: "Voir plus",
      ctaLink: "/shop?category=sacs",
      theme: "light",
    },
  ],
  autoPlay: true,
  autoPlayInterval: 6000,
  showIndicators: true,
  showNavigation: true,
};

/**
 * Composant Hero principal
 */
const Hero = ({
  config = DEFAULT_HERO_CONFIG,
  className = "",
  onSlideChange,
  onCtaClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const slides = config.slides || DEFAULT_HERO_CONFIG.slides;

  // Auto-play
  useEffect(() => {
    if (!config.autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      goToNextSlide();
    }, config.autoPlayInterval || 6000);

    return () => clearInterval(interval);
  }, [currentSlide, config.autoPlay, config.autoPlayInterval, slides.length]);

  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Navigation vers la slide suivante
   */
  const goToNextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const nextSlide = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextSlide);

    onSlideChange?.(nextSlide, slides[nextSlide]);

    setTimeout(() => setIsAnimating(false), 500);
  };

  /**
   * Navigation vers la slide précédente
   */
  const goToPreviousSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const prevSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(prevSlide);

    onSlideChange?.(prevSlide, slides[prevSlide]);

    setTimeout(() => setIsAnimating(false), 500);
  };

  /**
   * Navigation directe vers une slide
   */
  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    onSlideChange?.(index, slides[index]);

    setTimeout(() => setIsAnimating(false), 500);
  };

  /**
   * Gestionnaire de clic sur CTA
   */
  const handleCtaClick = (slide, event) => {
    event.preventDefault();

    if (onCtaClick) {
      onCtaClick(slide, event);
    } else if (slide.ctaLink) {
      window.location.href = slide.ctaLink;
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden ${className}`}
    >
      {/* Images de fond */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={optimizeImageUrl(slide.image, { width: 1920, height: 1080 })}
              alt={slide.title}
              className="w-full h-full object-cover"
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

      {/* Contenu principal */}
      <div className="relative z-20 container-custom">
        <div className="max-w-2xl">
          {/* Animation d'entrée du contenu */}
          <div
            className={`transition-all duration-1000 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Subtitle avec icône */}
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-400" />
              <span
                className={`text-sm font-medium tracking-wider uppercase ${
                  currentSlideData.theme === "dark"
                    ? "text-accent-300"
                    : "text-accent-400"
                }`}
              >
                {currentSlideData.subtitle}
              </span>
            </div>

            {/* Titre principal */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight ${
                currentSlideData.theme === "dark" ? "text-white" : "text-white"
              }`}
            >
              {currentSlideData.title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isLoaded
                      ? "fadeInUp 0.6s ease-out forwards"
                      : "none",
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h1>

            {/* Description */}
            <p
              className={`text-lg sm:text-xl mb-8 leading-relaxed ${
                currentSlideData.theme === "dark"
                  ? "text-gray-200"
                  : "text-gray-100"
              }`}
            >
              {currentSlideData.description}
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={(e) => handleCtaClick(currentSlideData, e)}
                className="group relative px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>{currentSlideData.ctaText}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="group px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-secondary-900 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-3">
                <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Voir la vidéo</span>
              </button>
            </div>

            {/* Statistiques rapides */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className={`text-2xl font-bold mb-1 ${
                    currentSlideData.theme === "dark"
                      ? "text-white"
                      : "text-white"
                  }`}
                >
                  500+
                </div>
                <div
                  className={`text-sm ${
                    currentSlideData.theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-200"
                  }`}
                >
                  Produits uniques
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-2xl font-bold mb-1 ${
                    currentSlideData.theme === "dark"
                      ? "text-white"
                      : "text-white"
                  }`}
                >
                  2000+
                </div>
                <div
                  className={`text-sm ${
                    currentSlideData.theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-200"
                  }`}
                >
                  Clients satisfaits
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-2xl font-bold mb-1 ${
                    currentSlideData.theme === "dark"
                      ? "text-white"
                      : "text-white"
                  }`}
                >
                  100%
                </div>
                <div
                  className={`text-sm ${
                    currentSlideData.theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-200"
                  }`}
                >
                  Authentique
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {config.showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={goToPreviousSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 disabled:opacity-50 group"
            aria-label="Slide précédente"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </button>

          <button
            onClick={goToNextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 disabled:opacity-50 group"
            aria-label="Slide suivante"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>
        </>
      )}

      {/* Indicateurs */}
      {config.showIndicators && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-30 text-white/70">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm">Découvrir</span>
          <div className="w-0.5 h-8 bg-white/50"></div>
        </div>
      </div>

      {/* CSS pour les animations personnalisées */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

Hero.propTypes = {
  config: PropTypes.shape({
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string.isRequired,
        ctaText: PropTypes.string,
        ctaLink: PropTypes.string,
        theme: PropTypes.oneOf(["light", "dark"]),
      })
    ),
    autoPlay: PropTypes.bool,
    autoPlayInterval: PropTypes.number,
    showIndicators: PropTypes.bool,
    showNavigation: PropTypes.bool,
  }),
  className: PropTypes.string,
  onSlideChange: PropTypes.func,
  onCtaClick: PropTypes.func,
};

/**
 * Composant HeroSimple - Version simplifiée sans carrousel
 */
export const HeroSimple = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText = "Découvrir",
  ctaLink,
  onCtaClick,
  theme = "dark",
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden ${className}`}
    >
      {/* Image de fond */}
      <div className="absolute inset-0">
        <img
          src={optimizeImageUrl(backgroundImage, { width: 1920, height: 1080 })}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-r from-black/70 via-black/50 to-black/30"
              : "bg-gradient-to-r from-black/50 via-black/30 to-black/10"
          }`}
        />
      </div>

      {/* Contenu */}
      <div className="relative z-20 container-custom">
        <div className="max-w-2xl">
          <div
            className={`transition-all duration-1000 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {subtitle && (
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-accent-400" />
                <span className="text-sm font-medium tracking-wider uppercase text-accent-300">
                  {subtitle}
                </span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-white">
              {title}
            </h1>

            {description && (
              <p className="text-lg sm:text-xl mb-8 leading-relaxed text-gray-200">
                {description}
              </p>
            )}

            <button
              onClick={onCtaClick || (() => (window.location.href = ctaLink))}
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center space-x-3"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>{ctaText}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSimple.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  backgroundImage: PropTypes.string.isRequired,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  onCtaClick: PropTypes.func,
  theme: PropTypes.oneOf(["light", "dark"]),
  className: PropTypes.string,
};

export default Hero;
