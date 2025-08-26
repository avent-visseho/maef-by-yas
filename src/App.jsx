/**
 * App.jsx - Composant principal de l'application Maef By Yas
 * 
 * Ce composant configure le routage principal de l'application e-commerce
 * et fournit les contextes globaux pour la gestion du panier et de l'authentification.
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@context/CartContext';
import { AuthProvider } from '@context/AuthContext';

// Import des composants communs
import Header from '@components/common/Header';
import Footer from '@components/common/Footer';
import Loading from '@components/common/Loading';
import ScrollToTop from '@components/common/ScrollToTop';

// Import des pages (lazy loading pour optimiser les performances)
const Home = React.lazy(() => import('@pages/Home'));
const About = React.lazy(() => import('@pages/About'));
const Shop = React.lazy(() => import('@pages/Shop'));
const ProductDetail = React.lazy(() => import('@pages/ProductDetail'));
const Cart = React.lazy(() => import('@pages/Cart'));
const Contact = React.lazy(() => import('@pages/Contact'));
const Login = React.lazy(() => import('@pages/Login'));
const Register = React.lazy(() => import('@pages/Register'));

// Composant pour gérer les erreurs de chargement
const ErrorFallback = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-secondary-50">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-secondary-900 mb-4">
        Oops! Une erreur s'est produite
      </h2>
      <p className="text-secondary-700 mb-6">
        Nous nous excusons pour la gêne occasionnée.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="btn-primary"
      >
        Recharger la page
      </button>
    </div>
  </div>
);

// Composant de layout principal
const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

/**
 * Composant principal de l'application
 * 
 * Structure:
 * - Configuration du routeur
 * - Providers pour les contextes globaux (Panier, Auth)
 * - Composants de layout (Header, Footer)
 * - Routes principales avec lazy loading
 * - Gestion des erreurs et du loading
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="App">
            <Routes>
              {/* Route principale - Page d'accueil */}
              <Route 
                path="/" 
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Home />
                    </Suspense>
                  </Layout>
                } 
              />

              {/* Route à propos */}
              <Route 
                path="/about" 
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <About />
                    </Suspense>
                  </Layout>
                } 
              />

              {/* Route boutique */}
              <Route 
                path="/shop" 
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Shop />
                    </Suspense>
                  </Layout>
                } 
              />

              {/* Route détail produit avec paramètre dynamique */}
              <Route 
                path="/product/:id" 
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <ProductDetail />
                    </Suspense>
                  </Layout>
                } 
              />

              {/* Route panier */}
              <Route 
                path="/cart" 
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Cart />
                    </Suspense>
                  </Layout>
                } 
              />

              {/* Route contact */}
              <Route 
                path="/contact" 
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Contact />
                    </Suspense>
                  </Layout>
                } 
              />

              {/* Route connexion */}
              <Route 
                path="/login" 
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Login />
                    </Suspense>
                  </Layout>
                } 
              />

              {/* Route inscription */}
              <Route 
                path="/register" 
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Register />
                    </Suspense>
                  </Layout>
                } 
              />

              {/* Route 404 - Page non trouvée */}
              <Route 
                path="*" 
                element={
                  <Layout>
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                          Page non trouvée
                        </h2>
                        <p className="text-secondary-700 mb-8">
                          La page que vous recherchez n'existe pas.
                        </p>
                        <a href="/" className="btn-primary">
                          Retour à l'accueil
                        </a>
                      </div>
                    </div>
                  </Layout>
                } 
              />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;