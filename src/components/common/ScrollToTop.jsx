/**
 * ScrollToTop.jsx - Composant pour remonter en haut de page lors des changements de route
 *
 * Ce composant gère automatiquement le scroll vers le haut quand l'utilisateur
 * navigue entre les pages, et inclut aussi un bouton flottant pour remonter manuellement.
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { smoothScrollTo, throttle } from "@utils/helpers";

/**
 * Composant principal ScrollToTop
 */
const ScrollToTop = () => {
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);

  // Scroll automatique vers le haut lors des changements de route
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Gestion de l'affichage du bouton selon la position de scroll
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrolled = window.pageYOffset;
      const shouldShow = scrolled > 300; // Afficher après 300px de scroll
      setShowButton(shouldShow);
    }, 100);

    window.addEventListener("scroll", handleScroll);

    // Vérifier la position initiale
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Gestionnaire du clic sur le bouton de retour en haut
   */
  const handleScrollToTop = () => {
    smoothScrollTo(document.body, {
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Bouton flottant de retour en haut */}
      <button
        onClick={handleScrollToTop}
        className={`
          fixed bottom-8 right-8 z-40 p-3 bg-primary-600 text-white rounded-full shadow-lg
          hover:bg-primary-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          transform transition-all duration-300 ease-in-out
          ${
            showButton
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-16 opacity-0 scale-75"
          }
        `}
        aria-label="Retour en haut de page"
        style={{
          visibility: showButton ? "visible" : "hidden",
          pointerEvents: showButton ? "auto" : "none",
        }}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default ScrollToTop;
