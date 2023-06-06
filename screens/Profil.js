import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomBox from "react-native-customized-box";
import { MultiSelect } from "react-native-element-dropdown";
import Card from './Card';
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

export default function Profil({ navigation, user }) {
  const [getFirstName, setFirstName] = useState(user.prenom);
  const [getLastName, setLastName] = useState(user.nom);
  const [getEmailId, setEmailId] = useState(user.email);
  const [getPassword, setPassword] = useState("");
  const [getEtablissement, setEtablissement] = useState(user.faculteActuelle);
  const [getTelephone, setTelephone] = useState(user.tel);
  const [getGrade, setGrade] = useState(user.grade);
  const [getSpecialite, setSpecialite] = useState(user.specialite);
  const [getVillesDesirees, setVillesDesirees] = useState(
    user.villeDesiree.split(";")
  );
  const [getVilleActuelle, setVilleActuelle] = useState(
    user.villeFaculteActuelle
  );
  const [villesData, setVillesData] = useState([]);
  const [specialitesData, setSpecialitesData] = useState([]);
  const [gradesData, setGradesData] = useState([]);

  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [EtablissementError, setEtablissementError] = useState("");
  const [TelephoneError, setTelephoneError] = useState("");

  useEffect(() => {
    axios
      .get("https://sleepy-jay-windbreaker.cyclic.app/professeurs")
      .then((response) => {
        villes = Array.from(
          new Set(response.data.map((prof) => prof.villeFaculteActuelle))
        ).map((ville) => {
          return { label: ville, value: ville };
        });
        setVillesData(villes);

        const specialites = Array.from(
          new Set(response.data.map((prof) => prof.specialite))
        ).map((specialite) => {
          return { label: specialite, value: specialite };
        });
        setSpecialitesData(specialites);

        const grades = Array.from(
          new Set(response.data.map((prof) => prof.grade))
        ).map((grade) => {
          return { label: grade, value: grade };
        });
        setGradesData(grades);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const registerFunction = () => {
    setLoading(true);
    if (getFirstName === "") {
      setFirstError("*This is Required");
    }
    if (getLastName === "") {
      setLastError("*This is Required");
    }
    if (getEmailId === "") {
      setEmailError("*This is Required");
    }
    if (getPassword === "") {
      setPasswordError("*This is Required");
    }
    if (getGrade === "") {
      setGradeError("*This is Required");
    }

    if (
      getEmailId !== "" &&
      getFirstName !== "" &&
      getLastName !== "" &&
      getPassword !== "" &&
      getPassword.length >= 6 &&
      getGrade !== ""
    ) {
      succesfullyCreateAccount();
    } else {
      setError(true);
      setLoading(false);
      setThrowError("Please fill the Form carefully");
    }
  };

  const succesfullyCreateAccount = () => {
    setLoading(true);
  };
  return (
    <View >
      <StatusBar barStyle="light-content" />
      <ScrollView style={{ paddingTop: 20 }}>
        <View style={styles.container}>
          {getError ? (
            <View style={styles.errorCard}>
              <TouchableOpacity
                style={styles.cross}
                onPress={() => {
                  setError(false);
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
              <Text style={styles.errorCardText}>{throwError}</Text>
            </View>
          ) : null}
          <Card>
          {/* Last Name */}
          <CustomBox
            placeholder={"Last Name"}
            boxColor={"0C134F"}
            boxStyle={{ borderRadius: 20, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
            }}
            labelConfig={{
              text: "Last Name",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{lastError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getLastName}
            onChangeText={(value) => {
              setLastName(value);
              setError(false);
              setLastError("");
            }}
          />

          {/* First Name */}
          <CustomBox
            placeholder={"First Name"}
            boxColor={"#0C134F"}
            boxStyle={{ borderRadius: 20, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
            }}
            labelConfig={{
              text: "First Name",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{firstError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getFirstName}
            onChangeText={(value) => {
              setFirstName(value);
              setError(false);
              setFirstError("");
            }}
          />

          {/* Telephone */}
          <CustomBox
            placeholder={"Téléphone"}
            boxColor={"0C134F"}
            boxStyle={{ borderRadius: 20, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
            }}
            labelConfig={{
              text: "Téléphone",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{TelephoneError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getTelephone}
            onChangeText={(value) => {
              setTelephone(value);
              setError(false);
              setTelephoneError("");
            }}
          />
          {/* Email Id */}
          <CustomBox
            placeholder={"Email"}
            boxColor={"0C134F"}
            type={"email"}
            boxStyle={{ borderRadius: 20, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
            }}
            labelConfig={{
              text: "Email",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{emailError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getEmailId}
            onChangeText={(value) => {
              setEmailId(value);
              setError(false);
              setEmailError("");
            }}
          />

          {/* {grade} */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={gradesData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Grade"
            searchPlaceholder="Search..."
            value={getGrade}
            onChange={(item) => {
              setGrade(item.value);
            }}
          />

          {/* Etablissement */}
          <CustomBox
            placeholder={"Etablissement"}
            boxColor={"0C134F"}
            boxStyle={{ borderRadius: 20, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
            }}
            labelConfig={{
              text: "Etablissement(FST,FS,EST,ENSA...)",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{EtablissementError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getEtablissement}
            onChangeText={(value) => {
              setEtablissement(value);
              setError(false);
              setEtablissementError("");
            }}
          />
          {/* {Spécialité} */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={specialitesData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Spécialité"
            searchPlaceholder="Search..."
            value={getSpecialite}
            onChange={(item) => {
              setSpecialite(item.value);
            }}
          />

          {/* {Ville Desirees} */}
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={villesData}
            labelField="label"
            valueField="value"
            placeholder="Ville Desirees"
            searchPlaceholder="Search..."
            value={getVillesDesirees}
            onChange={(items) => {
              setVillesDesirees(items);
            }}
            selectedStyle={styles.selectedStyle}
          />

          {/* {ville actuelle} */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={villesData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Ville actuelle"
            searchPlaceholder="Search..."
            value={getVilleActuelle}
            onChange={(item) => {
              setVilleActuelle(item.value);
            }}
          />
          </Card>
          {/* Modifier Button */}
          <TouchableOpacity
            style={styles.registerbtn}
            onPress={registerFunction}
          >
            <Text style={styles.registerBtnText}>Modifier</Text>
            {loading && loading ? (
              <ActivityIndicator style={styles.indicator} color={"white"} />
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "0C134F",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "0C134F",
    borderBottomWidth: 2,
    width: 300,
    marginBottom: 35,
    borderWidth: 2,
    borderRadius: 20
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
    marginTop: -16,
    marginBottom: 20
  },
  container: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  errorCard: {
    width: 300,
    height: 50,
    backgroundColor: "#de3138",
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 40,
  },
  errorCardText: {
    paddingLeft: 15,
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
  },
  cross: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    left: 250,
    position: "relative",
  },
  registerImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
  },
  registerbtn: {
    marginTop: 10,
    backgroundColor: "#0C134F",
    width: 200,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
    marginLeft: 40
    
  },
  registerBtnText: {
    color: "white",
    fontSize: 22,
  },
});