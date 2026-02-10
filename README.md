# Plateforme de présélection — Quiz Islamique 2026

Application web professionnelle pour l'Association des Serviteurs d'Allah Azawajal.

## Fonctionnalités

- Inscription publique des candidats (WhatsApp obligatoire).
- Enregistrement en base SQLite.
- Redirection automatique vers le WhatsApp admin après inscription.
- Espace admin protégé.
- Vue admin des candidatures.
- Vote public pour les candidats.
- Notation admin après chaque passage et classement automatique.
- Paramétrage complet du format de compétition (64 candidats max, barrages, groupes, finale) avec modification manuelle.

## Lancer en local

```bash
python3 app.py
```

Puis ouvrir : http://localhost:3000

## Variables d'environnement (recommandé)

Vous pouvez personnaliser les identifiants et paramètres sans toucher le code :

- `ADMIN_USERNAME` (défaut: `ASAAQI`)
- `ADMIN_PASSWORD` (défaut: `2026ASAA`)
- `ADMIN_WHATSAPP` (défaut: `2250150070083`)
- `DB_PATH` (défaut: `./data.sqlite`)
- `PORT` (défaut: `3000`)

Exemple:

```bash
ADMIN_USERNAME=ASAAQI ADMIN_PASSWORD=2026ASAA ADMIN_WHATSAPP=2250150070083 PORT=3000 python3 app.py
```

---

## Hébergement gratuit (Render) + nom de domaine gratuit

### 1) Déploiement gratuit sur Render

Le projet contient déjà les fichiers de déploiement :

- `render.yaml`
- `Procfile`

Étapes:

1. Créer un compte sur https://render.com
2. Pousser ce repo sur GitHub.
3. Sur Render, cliquer **New +** → **Blueprint** (utilise `render.yaml`) ou **Web Service**.
4. Vérifier le démarrage : `python3 app.py`.
5. Ajouter les variables secrètes dans Render:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ADMIN_WHATSAPP`

Render fournit un sous-domaine gratuit du type:

- `https://votre-app.onrender.com`

### 2) Ajouter un nom de domaine gratuit

#### Option A (la plus simple)

Garder `onrender.com` (gratuit, rapide et stable).

#### Option B (vrai domaine gratuit)

1. Réserver un domaine gratuit (exemple: `eu.org`, selon disponibilité).
2. Dans Render, ouvrir **Settings → Custom Domains** et ajouter votre domaine.
3. Chez votre registraire, créer les enregistrements DNS demandés par Render (CNAME/A).
4. Attendre la propagation DNS (quelques minutes à 24h).

---

## Important pour un usage professionnel

Ce projet utilise SQLite. Sur des offres gratuites, le stockage local peut être effacé lors des redéploiements/sleep.

Pour une production plus robuste :

- migrer vers une base Postgres gratuite (Supabase/Neon),
- sauvegarder régulièrement les inscriptions,
- changer les identifiants admin par défaut via variables d'environnement.
