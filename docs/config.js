const SITE_CONFIG = {
  // Identité du site
  title: "DocProject",
  subtitle: "FrameLab Web Documentation",
  tagline: "Tout ce qu'il faut savoir sur le projet de l'application web FrameLab.",
  logo_text: "◼︎",

  // Liens header
  github_url:  "https://github.com/matmathmat/framelab-front",
  website_url: "https://framelab.mathmonportfolio.be/",
  
  // Sections
  sections: [
    {
      id:          "projet",
      title:       "Le Projet",
      icon:        "cube",
      description: "Présentation du projet FrameLab, de son fonctionnement, de son architecture et de ses différents composants.",
      file:        "/docs/projet/index.md"
    },
    {
      id:          "installation",
      title:       "Installation",
      icon:        "bolt",
      description: "Instructions détaillées pour déployer le Backend et le Frontend en local ou en production.",
      file:        "/docs/installation/index.md"
    },
    {
      id:          "api",
      title:       "Documentation API",
      icon:        "code",
      description: "Documentation complète des endpoints, des requêtes, des réponses et du système d'authentification.",
      file:        "/docs/api/index.md"
    },
    {
      id:          "guide",
      title:       "Guide d'utilisation",
      icon:        "book",
      description: "Manuels complets pour les utilisateurs standards et les administrateurs de la plateforme.",
      file:        "/docs/guide/index.md"
    }
  ]
};