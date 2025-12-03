import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
    
      <Image 
        source={require("../assets/Group 1.png")} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.appName}>Barbearia do Deda</Text>

     
      <ActivityIndicator size="large" color="#000000ff" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9CA4F", 
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000ff",
    marginBottom: 30,
    fontFamily: "serif"
  },
  loader: {
    marginTop: 20,
  },
});
