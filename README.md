# 📚 Application mobile de permutation des professeurs  

Cette application mobile, développée avec **React Native** et **Expo**, permet aux professeurs de gérer et d’automatiser le processus de permutation entre établissements scolaires. Elle repose sur une **API backend** qui centralise les données et la logique métier.  


## 🚀 Fonctionnalités principales  

- 🔐 **Authentification et création de compte** avec les informations :  
  - Grade  
  - Établissement  
  - Spécialité  
  - Ville actuelle  
  - Ville désirée  

- 👤 **Gestion du profil** : modification et mise à jour des informations.  

- 🔎 **Recherche de permutation** : trouver les professeurs ayant l’inverse entre ville actuelle et ville désirée.  

- 📊 **Statistiques avancées** :  
  - Nombre de professeurs par **spécialité** (Top 15).  
  - Nombre de professeurs par **grade** (Top 15).  
  - Les **villes les plus désirées** (Top 15).


## 🛠️ Technologies utilisées  

### Frontend (mobile)  
- **React Native 0.70.8** – Développement mobile cross-platform  
- **Expo 47.0.14** – Build et développement  
- **React Navigation** – Navigation entre écrans (stack, tabs)  
- **Axios** – Consommation de l’API backend  
- **React Native Paper** – UI components (design Material)  
- **React Native Chart Kit / SVG / Pie** – Graphiques et statistiques  
- **React Native Animatable** – Animations  



## ⚙️ Installation et exécution  

1. **Cloner le projet**  
   ```bash
   git clone https://github.com/Salma191/permutation-professeurs.git
   cd permutation-professeurs
   
2. **Installer les dépendances**  
   ```bash
   npm install

3. **Configurer l’API backend**  
- Modifier l’URL de l’API dans src/services/api.js (exemple : http://localhost:3000/api)


4. **Lancer l’application**  
   ```bash
   npx expo start

5. **Tester sur mobile via Expo Go**  


## 🎥 Démo vidéo

https://github.com/user-attachments/assets/21d5b583-4436-4026-8292-88fbba9c5e58

