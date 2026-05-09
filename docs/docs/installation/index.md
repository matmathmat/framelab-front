# Installation

Suivez ces étapes pour installer le projet sur votre machine locale pour le développement.

---

## Développement

### Prérequis

Avant de commencer, les outils suivants doivent être installés :

* [Node.js](https://nodejs.org?utm_source=chatgpt.com)
* npm (installé automatiquement avec Node.js)
* Git

Vérification des versions :

```bash
node -v
npm -v
git --version
```

---

## Installation du backend

### Clonage du dépôt

```bash
git clone https://github.com/matmathmat/framelab-back.git
```

```bash
cd framelab-back
```

---

### Configuration du fichier `.env`

Copier le fichier `.env.example` puis le renommer en `.env`.

Contenu du fichier :

```env
SECRET_KEY=MySecretKey
USER_ACCOUNT_MAIL=user@mail.com
USER_ACCOUNT_PASS=userPassword
ADMIN_ACCOUNT_MAIL=admin@mail.com
ADMIN_ACCOUNT_PASS=adminPassword
FRONTEND_URL=http://localhost:5174
PORT=3000
```

#### Explication des variables

| Variable             | Description                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `SECRET_KEY`         | Clé utilisée pour la génération des tokens JWT et la sécurité générale (bcrypt, signatures) |
| `USER_ACCOUNT_MAIL`  | Compte utilisateur de base créé automatiquement                                             |
| `USER_ACCOUNT_PASS`  | Mot de passe du compte utilisateur de base                                                  |
| `ADMIN_ACCOUNT_MAIL` | Compte administrateur créé automatiquement                                                  |
| `ADMIN_ACCOUNT_PASS` | Mot de passe du compte administrateur                                                       |
| `FRONTEND_URL`       | URL autorisée pour communiquer avec l’API backend                                           |
| `PORT`               | Port d’exécution du backend                                                                 |

---

### Installation des dépendances

```bash
npm install
```

---

### Lancement du backend (développement)

```bash
npm run dev
```

Backend accessible sur :

```
http://localhost:3000
```

---

## Installation du frontend

### Clonage du dépôt

```bash
git clone https://github.com/matmathmat/framelab-front.git
```

```bash
cd framelab-front
```

---

### Configuration du fichier `.env`

```env
PRIVATE_BACKEND_URL=http://localhost:3000
PORT=5174
ALLOWED_HOSTS=http://localhost:5174
```

#### Explication des variables

| Variable              | Description                                                                      |
| --------------------- | -------------------------------------------------------------------------------- |
| `PRIVATE_BACKEND_URL` | URL du backend utilisée par le frontend                                          |
| `PORT`                | Port du serveur frontend                                                         |
| `ALLOWED_HOSTS`       | Domaine autorisé (utilisé en production pour éviter les requêtes non autorisées) |

---

### Installation des dépendances

```bash
npm install
```

---

### Lancement du frontend

```bash
npm run dev
```

Frontend accessible sur :

```
http://localhost:5174
```

---

## Mise en production

La mise en production repose sur :

* Nginx
* PM2
* Node.js
* Certbot (SSL)

---

### Installation de Nginx

```bash
sudo apt update
sudo apt install nginx
```

Vérifier que Nginx tourne :

```bash
sudo systemctl status nginx
```

---

### Installation de PM2

```bash
npm install -g pm2
```

---

### Lancement du backend avec PM2

Dans le dossier `framelab-back` :

```bash
npm install
npm run start
```

Enregistrer le processus dans PM2 :

```bash
pm2 start npm --name framelab-back -- run start
pm2 save
pm2 startup
```

---

### Lancement du frontend avec PM2

Dans le dossier `framelab-front` :

```bash
npm install
npm run build
npm run preview
```

Enregistrer le processus dans PM2 :

```bash
pm2 start npm --name framelab-front -- run preview
pm2 save
```

---

### Configuration Nginx

Deux approches sont possibles selon votre infrastructure :

* **Un seul host** — frontend et backend partagent le même nom de domaine
* **Deux hosts séparés** — frontend et backend ont chacun leur propre domaine

---

### Option A — Un seul host (frontend + backend sur le même domaine)

Dans cette configuration, tout passe par un seul domaine (ex: `monapp.com`).
Nginx redirige tout le trafic vers le frontend SvelteKit.

#### Comment le frontend communique avec le backend ?

Le frontend SvelteKit utilise un **hook serveur** : une fonction exécutée côté serveur avant chaque requête entrante.

Dans ce projet, le hook intercepte automatiquement toutes les requêtes dont le chemin commence par `/api` et les redirige en interne vers le backend Express qui tourne sur `http://localhost:3000`.

Nginx n'a donc pas connaissance du backend, et il n'y a **pas besoin de `location /api`** dans la configuration : c'est SvelteKit qui joue le rôle de proxy entre le visiteur et l'API.

```
Visiteur → Nginx (:80/:443) → Frontend SvelteKit (:5174)
                                       │
                            /api/* → Backend Express (:3000)
```

#### Créer le fichier de configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/framelab
```

```nginx
server {
    server_name monapp.com;

    large_client_header_buffers 4 16k;
    client_header_buffer_size 4k;

    location / {
        proxy_pass http://localhost:5174;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/html;
        allow all;
    }
}
```

#### Activer la configuration

```bash
sudo ln -s /etc/nginx/sites-available/framelab /etc/nginx/sites-enabled/
```

Vérifier la syntaxe :

```bash
sudo nginx -t
```

Appliquer :

```bash
sudo systemctl reload nginx
```

Vérifier que le site répond :

```bash
curl -I http://monapp.com
```

---

### Option B — Deux hosts séparés (frontend et backend sur des domaines distincts)

Dans cette configuration, chaque service a son propre domaine.

```
front.monapp.com → Frontend SvelteKit (:5174)
api.monapp.com   → Backend Express (:3000)
```

> Le hook SvelteKit **n'est pas utilisé** dans ce cas. Le frontend appelle directement `api.monapp.com` pour communiquer avec le backend.
> Pensez à mettre à jour la variable `PRIVATE_BACKEND_URL` dans le `.env` du frontend en conséquence.

La procédure ci-dessous explique comment configurer Nginx pour le **backend**.
Il faut ensuite **répéter exactement la même procédure** pour le frontend, en remplaçant le `server_name` par le domaine du frontend et le `proxy_pass` par `http://localhost:5174`.

#### Créer le fichier de configuration Nginx pour le backend

```bash
sudo nano /etc/nginx/sites-available/framelab-back
```

```nginx
server {
    server_name api.monapp.com;

    large_client_header_buffers 4 16k;
    client_header_buffer_size 4k;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/html;
        allow all;
    }
}
```

#### Activer la configuration

```bash
sudo ln -s /etc/nginx/sites-available/framelab-back /etc/nginx/sites-enabled/
```

Vérifier la syntaxe :

```bash
sudo nginx -t
```

Appliquer :

```bash
sudo systemctl reload nginx
```

Vérifier que l'API répond :

```bash
curl -I http://api.monapp.com
```

> Pour le frontend, recréez un fichier `/etc/nginx/sites-available/framelab-front` avec `server_name front.monapp.com` et `proxy_pass http://localhost:5174`, puis répétez les mêmes étapes.

---

## Installation SSL avec Certbot

### Installation

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### Génération du certificat

Remplacer `[YourHostName]` par votre nom de domaine (ou vos deux domaines si option B) :

```bash
sudo certbot --nginx -d [YourHostName]
```

Certbot va automatiquement :

* générer un certificat SSL
* configurer HTTPS dans Nginx
* activer la redirection HTTP → HTTPS

Si vous avez choisi l'option B, lancez la commande pour chaque domaine :

```bash
sudo certbot --nginx -d api.monapp.com
sudo certbot --nginx -d front.monapp.com
```

---

## Vérification finale

### Développement

| Service  | URL                    |
| -------- | ---------------------- |
| Frontend | http://localhost:5174  |
| Backend  | http://localhost:3000  |

### Production — Option A (même host)

| Service         | URL                      |
| --------------- | ------------------------ |
| Application web | https://monapp.com       |
| API             | https://monapp.com/api   |

### Production — Option B (deux hosts)

| Service         | URL                          |
| --------------- | ---------------------------- |
| Frontend        | https://front.monapp.com     |
| Backend         | https://api.monapp.com       |

---