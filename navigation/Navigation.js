import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from '../screens/Accueil';
import Rechercher from '../screens/Recherche';
import Combinaison from '../screens/Combinaisons';
import Contact from '../screens/About';
import Profil from '../screens/Profil';
import Login from '../screens/Login';

//Screen names
const home = "Statistiques";
const profile = "Profile";
const rechercher = "Search";
const combinaison = "Combinaisons";
const contact = "A propos";
const logout = "Logout";

const Tab = createBottomTabNavigator();

const Navigation = ({ user }) => {

  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = 'home';
          } else if (rn === profile) {
            iconName = 'person';
          } else if (rn === rechercher) {
            iconName = 'search';
          } else if (rn === combinaison) {
            iconName = 'git-compare';
          } else if (rn === contact) {
            iconName = 'mail';
          } else if (rn === logout) {
            iconName = 'log-out';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={32} color="#0C134F" />;
        },
      })}
    >
      <Tab.Screen name={home} component={Accueil} />
      <Tab.Screen name={profile}>{() => <Profil user={user} />}</Tab.Screen>
      <Tab.Screen name={rechercher} component={Rechercher} />
      <Tab.Screen name={combinaison} component={Combinaison} />
      <Tab.Screen name={contact} component={Contact} />
      <Tab.Screen
        name="Logout"
        component={Login}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.replace("Login");
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

