# Documentation API

Bienvenue dans le manuel d'utilisation complet de l'API.

---

## Accéder à la documentation

La documentation interactive de l'API est disponible à l'adresse [suivante](/api).

---

## Lire la documentation

Les endpoints sont regroupés par **tag** (authentication, challenges, participations, etc.).

Cliquer sur un tag pour afficher les endpoints associés, puis sur un endpoint pour voir :

* la méthode HTTP (`GET`, `POST`, `PUT`, `DELETE`)
* l'URL complète
* les paramètres attendus (query, body, headers)
* les réponses possibles avec leur code HTTP et leur structure

---

## Tester un endpoint

Chaque endpoint dispose d'un bouton **Try it out** qui permet d'envoyer une requête réelle directement depuis la documentation.

1. Cliquer sur **Try it out**
2. Remplir les paramètres demandés
3. Cliquer sur **Execute**
4. La réponse du serveur s'affiche en dessous (code HTTP, body, headers)

> Pour les endpoints protégés, vous devez d'abord vous authentifier. Voir la section [Authentification](#authentification).

---

## Authentification

Certains endpoints nécessitent un token JWT valide.

### Obtenir un token

Utiliser l'endpoint `POST /api/auth/login` avec vos identifiants :

```json
{
  "email": "user@mail.com",
  "password": "userPassword"
}
```

La réponse contient un `token` à utiliser dans les requêtes suivantes.

### Utiliser le token

Dans la documentation interactive, cliquer sur le bouton **Authorize** (en haut à droite), puis saisir :

```
Bearer <votre_token>
```

Toutes les requêtes suivantes incluront automatiquement ce token dans le header `Authorization`.

---