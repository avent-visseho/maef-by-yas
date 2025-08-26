/**
 * main.jsx - Point d'entrée de l'application Maef By Yas
 * 
 * Ce fichier initialise l'application React et monte le composant App
 * dans le DOM. Il importe également les styles globaux.
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@styles/globals.css'

// Configuration React 18 avec le mode strict pour le développement
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)