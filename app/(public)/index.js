import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Image source={require('../../assets/logo2.png')}
                   style={styles.image}/>

      <Text style={styles.title}>Bem-vindo!</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#E9CA4F" }]}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "rgba(255, 255, 255, 1)" }]}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <View style={styles.circle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9CA4F",

  },
  title: {
    zIndex:1,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    fontFamily: "times",
    color: 'white',
    marginTop: 220,

  },
  button: {
    zIndex: 1,
    width: 200,
    paddingVertical: 12,
    borderRadius: 50,
    marginBottom: 18,
    marginTop: 30,
  },
  buttonText: {
    color: "#000000ff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "times"

  },
  circle: {
    width: 600,
    height: 600,
    backgroundColor: "black",
    borderRadius: 300,
    display: 'flex',
    zIndex: 0,
    position: 'absolute',
    marginLeft: 10,
    marginTop: 450,

  },

  image: {
    justifyContent: "center",
    alignItems: "center",
  }
});
