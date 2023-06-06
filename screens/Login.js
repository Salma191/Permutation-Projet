import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomBox from "react-native-customized-box";
import axios from "axios";

export default function Login({ navigation, setUser }) {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [getDisabled, setDisabled] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  //
  const loginFunction = () => {
    setDisabled(true);
    setLoading(true);
    if (getEmail === "") {
      setEmailError("*This is Required");
    }
    if (getPassword === "") {
      setPasswordError("*This is Required");
    }
    if (getEmail !== "" && getPassword !== "") {
      axios
        .post("https://sleepy-jay-windbreaker.cyclic.app/login", {
          email: getEmail,
          password: getPassword,
        })
        .then((response) => {
          console.log(response);
          setUser(response.data.user);
          setEmail("");
          setPassword("");
          navigation.replace("App");
        })
        .catch((error) => {
          console.log(error);
          setDisabled(false);
          setLoading(false);
          setError(true);
          setThrowError("Sorry! User not found / Incoreect Password");
          setPassword("");
        });
    } else {
      setDisabled(false);
      setLoading(false);
      setError(true);
      setThrowError("Please Enter the Email and Password carefully");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
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
      <CustomBox
        placeholder={"Enter your email"}
        boxColor={"0C134F"}
        keyboardType="email-address"
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
        }}
        values={getEmail}
        onChangeText={(value) => {
          setEmail(value);
          setError(false);
          setEmailError("");
        }}
      />
      <CustomBox
        placeholder={"Enter your password"}
        toggle={true}
        boxColor={"0C134F"}
        boxStyle={{ borderRadius: 20, borderWidth: 2 }}
        inputStyle={{
          fontWeight: "bold",
          color: "#30302e",
          paddingLeft: 20,
          borderRadius: 40,
        }}
        labelConfig={{
          text: "Password",
          style: {
            color: "#0e0e21",
            fontWeight: "bold",
          },
        }}
        requiredConfig={{
          text: <Text>{passwordError}</Text>,
        }}
        values={getPassword}
        onChangeText={(value) => {
          setPassword(value);
          setError(false);
          setPasswordError("");
        }}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={loginFunction}
        disabled={getDisabled}
      >
        <Text style={styles.loginBtnText}>Log In</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <View style={styles.createAccount}>
        <Text style={styles.createAccountText}>
          {`              Don't have an Account? `}
        </Text>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loginImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 25,
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: "#0C134F",
    width: 200,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginBtnText: {
    color: "white",
    fontSize: 22,
  },
  forgotBtn: {
    marginTop: -20,
    width: 280,
    height: 20,
    justifyContent: "center",
  },
  forgotBtnText: {
    color: "dodgerblue",
    fontSize: 12,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
  createAccount: {
    marginTop: 10,
    width: 280,
    height: 20,
    flexDirection: "row",
  },
  createAccountText: {
    color: "grey",
  },
  registerBtnText: {
    color: "dodgerblue",
    textDecorationLine: "underline",
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    top: 10,
    marginBottom: 10,
  },
});
