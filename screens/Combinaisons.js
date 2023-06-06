import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Card from './Card';

export default function CombinaisonScreen() {
  const [professeurs, setProfesseurs] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [permutations, setPermutations] = useState([]);

  const fetchProfesseurs = () => {
    fetch('https://sleepy-jay-windbreaker.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => setProfesseurs(data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchProfesseurs();
  }, []);

  const specialites = useMemo(() => {
    const uniqueSpecialites = [...new Set(professeurs.map(professeur => professeur.specialite))];

    return uniqueSpecialites.map((specialite, index) => ({
      _id: index + 1,
      name: specialite
    }));
  }, [professeurs]);

  const generatePermutations = () => {
    const filteredProfesseurs = professeurs.filter(professeur =>
      professeur.specialite === selectedSpecialite &&
      professeur.villeFaculteActuelle &&
      professeur.villeDesiree.split(";") &&
      professeur.villesDesiree.length > 0
    );
    console.log('Filtered Professeurs:', filteredProfesseurs);
  
    const newPermutations = [];
    for (let i = 0; i < filteredProfesseurs.length; i++) {
      const professeur = filteredProfesseurs[i];
      for (let j = 0; j < professeur.villesDesirees.length; j++) {
        const permutation = {
          nom: professeur.nom,
          villeActuelle: professeur.villeFaculteActuelle,
          villeDesiree: professeur.villesDesirees[j]
        };
        newPermutations.push(permutation);
      }
    }
  
    setPermutations(newPermutations);
  };
  

  useEffect(() => {
    if (selectedSpecialite) {
      generatePermutations();
    }
  }, [selectedSpecialite]);

  const renderItem = (item) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <Card>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.shadow}
          data={specialites}
          search
          searchPlaceholder="Search"
          labelField="name"
          valueField="_id"
          label="Dropdown"
          placeholder="Toutes les spécialités"
          value={selectedSpecialite}
          onChange={(item) => setSelectedSpecialite(item._id)}
          renderLeftIcon={() => (
            <Image style={styles.icon} />
          )}
          renderItem={(item) => renderItem(item)}
          textError="Error"
        />
      </Card>

      <Card>
        {permutations.map((permutation, index) => (
          <View key={index}>
            <Text>Nom: {permutation.nom}</Text>
            <Text>Ville actuelle: {permutation.villeActuelle}</Text>
            <Text>Ville désirée: {permutation.villeDesiree}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
  },
  dropdown: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderRadius: 20,
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 5,
    padding: 5,
  },
 shadow: {
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 3,
}

});
