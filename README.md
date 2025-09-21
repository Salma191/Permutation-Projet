# Permutation-Projet: Teacher Transfer Application

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-16+-green?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/React%20Native-0.70.8-blue?logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-47.0.14-lightgrey?logo=expo" alt="Expo" />
</p>


This project automates and simplifies the teacher transfer process between schools by providing an intuitive mobile application connected to a centralized backend API.  It is designed primarily for teachers who want to request or manage transfers, helping them easily find matching opportunities with other teachers.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Configuration](#api-configuration)
- [Technologies Used](#technologies-used)
- [Demo Video](#demo-video)
- [Contributing](#contributing)
- [Roadmap](#roadmap)


## Features

* **User Authentication & Account Creation:** Teachers can register and create accounts by entering details such as grade, institution, specialty, current city, and desired city.  
* **Profile Management:** Teachers can edit and update their personal information at any time.  
* **Transfer Search:** Teachers can search for and match with other teachers who have opposite transfer preferences (current city ↔ desired city).  
* **Advanced Statistics:** Provides insights such as the top 15 specialties, grades, and most desired cities.  


## Requirements

* **Node.js:** Version 16 or higher.
* **npm or yarn:**  A package manager for Node.js.
* **Expo CLI:**  Install globally using `npm install -g expo-cli`.
* **Backend API:** A configured backend API is required.  The API URL can be modified within `src/services/api.js`.


## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Salma191/permutation-professeurs.git
   cd permutation-professeurs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npx expo start
   ```

4. **Scan the QR Code:** Scan the QR code displayed in your terminal with the Expo Go mobile app.


## Usage

Refer to the in-app instructions for detailed usage.  The application provides intuitive navigation and clear guidance for both teachers and administrators.

## API Configuration

The backend API URL is configured in `src/services/api.js`.  Update this file with the correct URL for your deployed API.  Ensure your API is properly configured and accessible before running the application.

## Technologies Used  

### Frontend (mobile)  
- **React Native 0.70.8** – Cross-platform mobile development  
- **Expo 47.0.14** – Build and development  
- **React Navigation** – Navigation between screens (stack, tabs)  
- **Axios** – Backend API consumption  
- **React Native Paper** – UI components (Material design)
- **React Native Chart Kit / SVG / Pie** – Charts and statistics  
- **React Native Animatable** – Animations  


## Demo Video



https://github.com/user-attachments/assets/7342ff25-a148-4a5d-b193-60afccd4dfe3



## Contributing

Contributions are welcome! Please open an issue or submit a pull request.  Ensure your code adheres to the project's coding style and includes comprehensive tests.

## Roadmap

* **Phase 1 (Complete):**  Develop core features: authentication, profile management, basic transfer search.
* **Phase 2:** Implement advanced statistics export (PDF/Excel).
* **Phase 3:** Integrate real-time notifications for new transfer matches.
* **Phase 4:** Multi-language support (French/Arabic).
