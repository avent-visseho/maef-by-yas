/**
 * Header.jsx - Composant d'en-tête principal de Maef By Yas
 *
 * Ce composant gère la navigation principale, le panier, la recherche,
 * l'authentification et tous les éléments de l'en-tête responsive.
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@hooks/useCart";
import { useAuth } from "@context/AuthContext";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  Heart,
  Phone,
  Mail,
} from "lucide-react";
import { NAVIGATION_CONFIG, APP_CONFIG } from "@utils/constants";
import { debounce } from "@utils/helpers";

/**
 * Composant Header principal
 */
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, toggleCart, isOpen: isCartOpen } = useCart();
  const { user, isAuthenticated } = useAuth();

  // États locaux
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Références
  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  /**
   * Gestionnaire du scroll pour l'effet de transparence
   */
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Fermer les menus lors du changement de route
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  /**
   * Gestionnaire pour fermer les menus en cliquant à l'extérieur
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Focus automatique sur le champ de recherche
   */
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  /**
   * Gestionnaire de la recherche
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  /**
   * Basculer le menu mobile
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Basculer la recherche mobile
   */
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  /**
   * Basculer le menu utilisateur
   */
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  /**
   * Vérifier si un lien est actif
   */
  const isActiveLink = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  /**
   * Classes CSS dynamiques pour l'en-tête
   */
  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-soft" : "bg-transparent"
    }
  `.trim();

  return (
    <>
      {/* Barre d'informations top (optionnelle) */}
      <div className="bg-primary-600 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {APP_CONFIG.PHONE}
            </span>
            <span className="hidden md:flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {APP_CONFIG.EMAIL}
            </span>
          </div>
          <div className="text-center">
            <span>Livraison gratuite à partir de 100FCFA !</span>
          </div>
          <div className="hidden md:block">
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </div>

      {/* En-tête principal */}
      <header className={headerClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 transition-transform hover:scale-105"
              aria-label="Retour à l'accueil"
            >
              <img
                src="/logos/maef-by-yas-logo.png"
                alt={APP_CONFIG.NAME}
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.src = "/logos/maef-by-yas-logo.png";
                }}
              />
            </Link>

            {/* Navigation principale - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAVIGATION_CONFIG.MAIN_MENU.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    font-medium transition-colors duration-200 relative
                    ${
                      isActiveLink(item.path, item.exact)
                        ? "text-primary-600"
                        : isScrolled
                        ? "text-secondary-700 hover:text-primary-600"
                        : "text-white hover:text-primary-200"
                    }
                  `}
                >
                  {item.name}
                  {isActiveLink(item.path, item.exact) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions de droite */}
            <div className="flex items-center space-x-4">
              {/* Recherche - Desktop */}
              <div className="hidden md:block relative">
                {!isSearchOpen ? (
                  <button
                    onClick={toggleSearch}
                    className={`
                      p-2 rounded-full transition-colors
                      ${
                        isScrolled
                          ? "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                          : "text-white hover:text-primary-200 hover:bg-white/10"
                      }
                    `}
                    aria-label="Ouvrir la recherche"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                ) : (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher..."
                      className="w-64 px-4 py-2 border border-secondary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={toggleSearch}
                      className="ml-2 p-2 text-secondary-500 hover:text-secondary-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Favoris (pour usage futur) */}
              <button
                className={`
                  hidden md:block p-2 rounded-full transition-colors relative
                  ${
                    isScrolled
                      ? "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                      : "text-white hover:text-primary-200 hover:bg-white/10"
                  }
                `}
                aria-label="Mes favoris"
              >
                <Heart className="w-5 h-5" />
                {/* Badge pour le nombre de favoris */}
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Menu utilisateur */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className={`
                    p-2 rounded-full transition-colors
                    ${
                      isScrolled
                        ? "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                        : "text-white hover:text-primary-200 hover:bg-white/10"
                    }
                  `}
                  aria-label={
                    isAuthenticated ? "Menu utilisateur" : "Se connecter"
                  }
                >
                  <User className="w-5 h-5" />
                </button>

                {/* Dropdown menu utilisateur */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-medium py-2 z-50">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-secondary-200">
                          <p className="font-medium text-secondary-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-sm text-secondary-500">
                            {user?.email}
                          </p>
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
                        >
                          Mon profil
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
                        >
                          Mes commandes
                        </Link>
                        <button
                          onClick={() => {
                            // logout() sera implémenté plus tard
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
                        >
                          Se déconnecter
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
                        >
                          Se connecter
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
                        >
                          Créer un compte
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Panier */}
              <button
                onClick={toggleCart}
                className={`
                  p-2 rounded-full transition-colors relative
                  ${
                    isScrolled
                      ? "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                      : "text-white hover:text-primary-200 hover:bg-white/10"
                  }
                `}
                aria-label={`Panier (${totalItems} articles)`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              {/* Menu hamburger - Mobile */}
              <button
                onClick={toggleMobileMenu}
                className={`
                  lg:hidden p-2 rounded-full transition-colors
                  ${
                    isScrolled
                      ? "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                      : "text-white hover:text-primary-200 hover:bg-white/10"
                  }
                `}
                aria-label="Menu principal"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden bg-white border-t border-secondary-200 shadow-soft"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Recherche mobile */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher des produits..."
                    className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-secondary-400" />
                </div>
              </form>

              {/* Navigation mobile */}
              <nav className="space-y-2">
                {NAVIGATION_CONFIG.MAIN_MENU.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      block py-3 px-4 rounded-lg font-medium transition-colors
                      ${
                        isActiveLink(item.path, item.exact)
                          ? "text-primary-600 bg-primary-50"
                          : "text-secondary-700 hover:text-primary-600 hover:bg-secondary-50"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Actions utilisateur mobile */}
              <div className="mt-6 pt-6 border-t border-secondary-200 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2">
                      <p className="font-medium text-secondary-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-secondary-500">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="block py-3 px-4 text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 rounded-lg transition-colors"
                    >
                      Mon profil
                    </Link>
                    <Link
                      to="/orders"
                      className="block py-3 px-4 text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 rounded-lg transition-colors"
                    >
                      Mes commandes
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block py-3 px-4 text-center bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/register"
                      className="block py-3 px-4 text-center border border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                    >
                      Créer un compte
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer pour éviter que le contenu soit caché sous l'header fixe */}
      <div className="h-20" style={{ marginTop: "40px" }}></div>
    </>
  );
};

export default Header;
