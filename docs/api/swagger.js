document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js";

  script.onload = () => {
    SwaggerUIBundle({
      url: 'api.yml',
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      layout: "BaseLayout",
      deepLinking: true,
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 1,
      docExpansion: "list",
      filter: true,
      syntaxHighlight: {
        theme: "monokai"
      }
    });
  };

  document.head.appendChild(script);
});