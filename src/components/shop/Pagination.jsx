/**
 * Pagination.jsx - Composant de pagination pour Maef By Yas
 *
 * Ce composant gère :
 * - Navigation entre les pages
 * - Affichage des numéros de page
 * - Boutons précédent/suivant
 * - Informations de pagination
 * - Support responsive
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

/**
 * Composant Pagination principal
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  maxVisiblePages = 5,
  showInfo = true,
  showFirstLast = true,
  className = "",
  size = "md",
}) => {
  /**
   * Génère la liste des pages à afficher
   */
  const generatePageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    // Ajuster si on est près de la fin
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];

    // Première page
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("ellipsis-start");
      }
    }

    // Pages du milieu
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Dernière page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  /**
   * Calcule les informations d'affichage
   */
  const getDisplayInfo = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return { start, end };
  };

  /**
   * Classes CSS selon la taille
   */
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          button: "px-2 py-1 text-sm",
          nav: "space-x-1",
        };
      case "lg":
        return {
          button: "px-4 py-3 text-lg",
          nav: "space-x-2",
        };
      default:
        return {
          button: "px-3 py-2",
          nav: "space-x-2",
        };
    }
  };

  /**
   * Gestionnaires d'événements
   */
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const goToPrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const goToNext = () => {
    handlePageChange(currentPage + 1);
  };

  const goToFirst = () => {
    handlePageChange(1);
  };

  const goToLast = () => {
    handlePageChange(totalPages);
  };

  // Ne rien afficher s'il n'y a qu'une page ou aucune page
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers();
  const { start, end } = getDisplayInfo();
  const sizeClasses = getSizeClasses();

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${className}`}
    >
      {/* Informations de pagination */}
      {showInfo && (
        <div className="text-sm text-secondary-600 order-2 sm:order-1">
          Affichage de {start} à {end} sur {totalItems} résultats
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`flex items-center ${sizeClasses.nav} order-1 sm:order-2`}
        aria-label="Navigation de pagination"
      >
        {/* Première page */}
        {showFirstLast && currentPage > 2 && (
          <button
            onClick={goToFirst}
            className={`${sizeClasses.button} border border-secondary-300 text-secondary-700 bg-white hover:bg-secondary-50 rounded-lg transition-colors`}
            aria-label="Première page"
          >
            ««
          </button>
        )}

        {/* Page précédente */}
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className={`${sizeClasses.button} border border-secondary-300 text-secondary-700 bg-white hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center`}
          aria-label="Page précédente"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Précédent</span>
        </button>

        {/* Numéros de pages */}
        {pageNumbers.map((page, index) => {
          if (typeof page === "string") {
            return (
              <div
                key={page}
                className={`${sizeClasses.button} text-secondary-500 flex items-center`}
                aria-hidden="true"
              >
                <MoreHorizontal className="w-4 h-4" />
              </div>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${
                sizeClasses.button
              } border rounded-lg transition-colors font-medium ${
                isActive
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-secondary-300 text-secondary-700 bg-white hover:bg-secondary-50"
              }`}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}

        {/* Page suivante */}
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={`${sizeClasses.button} border border-secondary-300 text-secondary-700 bg-white hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center`}
          aria-label="Page suivante"
        >
          <span className="hidden sm:inline mr-1">Suivant</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dernière page */}
        {showFirstLast && currentPage < totalPages - 1 && (
          <button
            onClick={goToLast}
            className={`${sizeClasses.button} border border-secondary-300 text-secondary-700 bg-white hover:bg-secondary-50 rounded-lg transition-colors`}
            aria-label="Dernière page"
          >
            »»
          </button>
        )}
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  maxVisiblePages: PropTypes.number,
  showInfo: PropTypes.bool,
  showFirstLast: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

/**
 * Hook personnalisé pour gérer la pagination
 */
export const usePagination = (
  totalItems,
  itemsPerPage = 10,
  initialPage = 1
) => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPageItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const reset = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    goToPage,
    goToNext,
    goToPrevious,
    getPageItems,
    reset,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1,
  };
};

/**
 * Composant PaginationInfo - Affiche uniquement les informations
 */
export const PaginationInfo = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  className = "",
}) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`text-sm text-secondary-600 ${className}`}>
      Page {currentPage} sur {totalPages} • {start}-{end} sur {totalItems}{" "}
      résultats
    </div>
  );
};

PaginationInfo.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  className: PropTypes.string,
};

/**
 * Composant SimplePagination - Version simplifiée avec uniquement précédent/suivant
 */
export const SimplePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showLabels = true,
  className = "",
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 text-secondary-700 border border-secondary-300 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {showLabels && <span className="ml-2">Précédent</span>}
      </button>

      <span className="text-sm text-secondary-600">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 text-secondary-700 border border-secondary-300 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {showLabels && <span className="mr-2">Suivant</span>}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

SimplePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showLabels: PropTypes.bool,
  className: PropTypes.string,
};

export default Pagination;
