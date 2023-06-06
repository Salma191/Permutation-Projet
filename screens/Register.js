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
  import AntDesign from "@expo/vector-icons/AntDesign";
  import { Dropdown } from "react-native-element-dropdown";
  import axios from "axios";
  
  export default function Register({ navigation }) {
    const [getFirstName, setFirstName] = useState("");
    const [getLastName, setLastName] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getEtablissement, setEtablissement] = useState("");
    const [getTelephone, setTelephone] = useState("");
    const [getGrade, setGrade] = useState("");
    const [getSpecialite, setSpecialite] = useState("");
    const [getVillesDesirees, setVillesDesirees] = useState([]);
    const [getVilleActuelle, setVilleActuelle] = useState("");
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
        .get("https://sleepy-jay-windbreaker.cyclic.app/professeurs/")
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
      if (getEmail === "") {
        setEmailError("*This is Required");
      }
      if (getPassword === "") {
        setPasswordError("*This is Required");
      }
      if (getGrade === "") {
        setGradeError("*This is Required");
      }
  
      if (
        getEmail !== "" &&
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
      axios
        .post("https://sleepy-jay-windbreaker.cyclic.app/professeurs", {
          nom: getLastName,
          prenom: getFirstName,
          tel: getTelephone,
          email: getEmail,
          grade: getGrade,
          specialite: getSpecialite,
          faculteActuelle: getEtablissement,
          villeFaculteActuelle: getVilleActuelle,
          villeDesiree: getVillesDesirees.join(";"),
          password: getPassword,
        })
        .then((response) => {
          console.log(response);
          setLoading(false);
          // setEmail("");
          // setPassword("");
          // navigation.replace("Home");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          setThrowError("Sorry! Registering not successful");
          // setPassword("");
        });
    };
    return (
      <View style={{ backgroundColor: "white" }}>
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

            {/* Last Name */}
            <CustomBox
              placeholder={"Entrer votre nom"}
              boxColor={"0C134F"}
              focusColor={"#3962FF"}
              boxStyle={{ borderRadius: 20, borderWidth: 2 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Nom",
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
              placeholder={"Entrer votre prénom"}
              boxColor={"#0C134F"}
              focusColor={"#3962FF"}
              boxStyle={{ borderRadius: 20, borderWidth: 2 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Prénom",
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
              placeholder={"Entrer votre numéro de téléphone"}
              boxColor={"0C134F"}
              focusColor={"#3962FF"}
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
              placeholder={"Entrer votre adresse email"}
              boxColor={"0C134F"}
              focusColor={"#3962FF"}
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
              values={getEmail}
              onChangeText={(value) => {
                setEmail(value);
                setError(false);
                setEmailError("");
              }}
            />

            {/* Password */}
            <CustomBox
              placeholder={"Entrer votre mot de passe"}
              boxColor={"0C134F"}
              focusColor={"#3962FF"}
              boxStyle={{ borderRadius: 20, borderWidth: 2 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
                overflow: "hidden",
              }}
              labelConfig={{
                text: "Mot de passe",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              toggle={true}
              requiredConfig={{
                text: <Text>{passwordError}</Text>,
                style: {
                  marginBottom: 10,
                },
              }}
              values={getPassword}
              onChangeText={(value) => {
                setPassword(value);
                setError(false);
                setPasswordError("");
              }}
            />
  
            {/* {grade} */}
            <View>
                <Text style={styles.text}>Grade</Text>
            </View>
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
              placeholder="Choississez votre Grade"
              searchPlaceholder="Search..."
              value={getGrade}
              onChange={(item) => {
                setGrade(item.value);
              }}
            />

             {/* Etablissement */}
             <CustomBox
              placeholder={"Etablissement"}
              boxColor={"#0C134F"}
              focusColor={"#3962FF"}
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
            <View>
                <Text style={styles.text}>Spécialité</Text>
            </View>
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
              placeholder="Choisissez une spécialité"
              searchPlaceholder="Search..."
              value={getSpecialite}
              onChange={(item) => {
                setSpecialite(item.value);
              }}
            />

            {/* {ville actuelle} */}
            <View>
                <Text style={styles.text}>Ville Actuelle</Text>
            </View>
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
              placeholder="Choisissez une ville"
              searchPlaceholder="Search..."
              value={getVilleActuelle}
              onChange={(item) => {
                setVilleActuelle(item.value);
              }}
            //   renderLeftIcon={() => (
            //     <AntDesign
            //       style={styles.icon}
            //       color="black"
            //       name="Safety"
            //       size={20}
            //     />
            //   )}
            />
  
            {/* {Ville Desirees} */}
            <View>
                <Text style={styles.text}>Villes Désirées</Text>
            </View>
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
              placeholder="Choisissez les villes désirées"
              searchPlaceholder="Search..."
              value={getVillesDesirees}
              onChange={(items) => {
                setVillesDesirees(items);
              }}
            //   renderLeftIcon={() => (
            //     <AntDesign
            //       style={styles.icon}
            //       color="black"
            //       name="Safety"
            //       size={20}
            //     />
            //   )}
              selectedStyle={styles.selectedStyle}
            />
  
            {/* Login Button */}
            <TouchableOpacity
              style={styles.registerbtn}
              onPress={registerFunction}
            >
              <Text style={styles.registerBtnText}>Inscription</Text>
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
    container: { 
        padding: 16 
    },
    dropdown: {
      height: 50,
      backgroundColor: "transparent",
      borderBottomColor: "0C134F",
      borderBottomWidth: 2,
      width: 300,
      marginBottom: 35,
      backgroundColor: 'white',
    borderBottomColor: '0C134F',
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 2,
    },
    placeholderStyle: {
      fontSize: 16,
      color: "#30302e",
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
    container: {
      marginTop: 30,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  
    errorCard: {
      width: 300,
      height: 50,
      backgroundColor: "#de3138",
      justifyContent: "center",
      paddingLeft: 15,
      borderRadius: 10,
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
    registerbtn: {
      marginTop: 10,
      backgroundColor: "#0C134F",
      width: 250,
      height: 50,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 50,
      flexDirection: "row",
    },
    registerBtnText: {
      color: "white",
      fontSize: 22,
    },
    text:{
            color: "#0e0e21",
            fontWeight: "bold",
            marginLeft: -145,
            
    }
  });
  