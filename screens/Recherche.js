import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Button, Alert, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Card from './Card';
import Ionicons from "react-native-vector-icons/Ionicons";

const Rechercher = () => {
  const [specialties, setSpecialties] = useState([]);
  const [cities, setCities] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [desiredCity, setDesiredCity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [showAllProfessors, setShowAllProfessors] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [initialSpecialite, setInitialSpecialite] = useState(null);
  const [initialVilleActuelle, setInitialVilleActuelle] = useState(null);
  const [initialVilleDesiree, setInitialVilleDesiree] = useState(null);
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [selectedVilleActuelle, setSelectedVilleActuelle] = useState(null);
  const [selectedVilleDesiree, setSelectedVilleDesiree] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sleepy-jay-windbreaker.cyclic.app/professeurs');
        const data = await response.json();

        const specialtiesList = [...new Set(data.map(professor => professor.specialite))];
        setSpecialties(specialtiesList);

        const currentCities = [...new Set(data.map(professor => professor.villeFaculteActuelle))];
        const desiredCities = [...new Set(data.flatMap(professor => professor.villeDesiree.split(';')))];
        const uniqueCities = [...new Set([...currentCities, ...desiredCities])];
        setCities(uniqueCities);

        // Filter the initial list of professors based on the selected values
        filterProfessors(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération des données');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the professors whenever the dropdown values change
    filterProfessors(searchResults);
  }, [specialty, desiredCity, currentCity]);

  const filterProfessors = (professors) => {
    if (showAllProfessors) {
      setSearchResults(professors);
      setShowAllProfessors(false);
      return;
    }
    const filteredProfessors = professors.filter((professor) => {
      if (specialty && professor.specialite !== specialty) {
        return false;
      }
      if (desiredCity && !professor.villeDesiree.includes(desiredCity)) {
        return false;
      }
      if (currentCity && professor.villeFaculteActuelle !== currentCity) {
        return false;
      }
      return true;
    });
    setSearchResults(filteredProfessors);
  };

  useEffect(() => {
    setShowAllProfessors(false);
    filterProfessors(searchResults);
  }, [specialty, desiredCity, currentCity]);
  
  const handleSpecialiteChange = (item) => {
    setSelectedSpecialite(item._id);
  };

  const handleVilleActuelleChange = (item) => {
    setSelectedVilleActuelle(item._id);
  };

  const handleVilleDesireeChange = (item) => {
    setSelectedVilleDesiree(item._id);
  };

  const handleReset = () => {
    setSpecialty(initialSpecialite);
    setCurrentCity(initialVilleActuelle);
    setDesiredCity(initialVilleDesiree);
    setShowAllProfessors(true);
  };
  
  


  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
        <Text>Specialty</Text>
        <Picker
          style={styles.picker}
          selectedValue={specialty}
          onValueChange={(itemValue) => setSpecialty(itemValue)}
        >
          <Picker.Item label="Select a speciality" value="" />
          {specialties.map((specialty) => (
            <Picker.Item key={specialty} label={specialty} value={specialty} />
          ))}
        </Picker>
        <Text>Current city</Text>
        <Picker
          style={styles.picker}
          selectedValue={currentCity}
          onValueChange={(itemValue) => setCurrentCity(itemValue)}
        >
          <Picker.Item label="Select current city" value="" />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
        <Text>Desired City</Text>
        <Picker
          style={styles.picker}
          selectedValue={desiredCity}
          onValueChange={(itemValue) => setDesiredCity(itemValue)}
        >
          <Picker.Item label="Select desired city" value="" />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Ionicons
              name="reload"
              style={styles.icon}
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>Réinitialiser</Text>
          </TouchableOpacity>
        </Card>
        <Card>
        <Text style={styles.resultTitle}>Search results :</Text>

        {searchResults.map((result) => (
  <View key={result._id}>
<Text style={styles.professeurInfo}>
  • {result.nom} {result.prenom} ({result.email} | {result.tel} | {result.grade})
</Text>
<Text style={styles.professeurInfo}>Spécialité : {result.specialite}</Text>
<Text style={styles.professeurInfo}>
  Faculté actuelle : {result.faculteActuelle} ({result.villeFaculteActuelle})
</Text>
<Text style={styles.professeurInfo}>Ville désirée : {result.villeDesiree}</Text>

    </View>
))}
</Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    width: 150,
    height: 40,
    backgroundColor: "#0C134F",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    width: 300,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lineSymbol: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  professeurInfo: {
    fontSize: 16,
  },
});

export default Rechercher;