import { useState, useContext } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator 
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    const result = await signIn(email, senha);

    setLoading(false);

    if (result.ok) {
      router.push("/(private)/PaginaInicial");
    } else {
      setErro(result.message);
    }
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#FFD34E" />
      </TouchableOpacity>

      <Image
        source={require("../../assets/logo3.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#cfc7c7ff"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <View style={{ width: "100%", position: "relative" }}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#cfc7c7ff"
          secureTextEntry={!showSenha}
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setShowSenha(!showSenha)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showSenha ? "eye-off" : "eye"}
            size={22}
            color="#FFD34E"
          />
        </TouchableOpacity>
      </View>

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.button, loading && { opacity: 0.7 }]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

const COLORS = {
  background: "#000",
  yellow: "#F7C844",
  text: "#fff",
  inputBg: "#111",
  border: "#333",
  error: "#E44545",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 25,
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },

  title: {
    color: COLORS.yellow,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    fontFamily: "times new roman"
  },

  input: {
    width: "100%",
    backgroundColor: COLORS.inputBg,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    color: COLORS.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontFamily: "serif"
  },

  button: {
    width: "100%",
    backgroundColor: COLORS.yellow,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    fontFamily: "serif"
  },

  eyeButton: {
    position: "absolute",
    right: 12,
    top: 15,
  },

  error: {
    color: COLORS.error,
    marginBottom: 10,
    fontSize: 14,
  },
});
