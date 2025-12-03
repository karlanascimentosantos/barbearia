
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!nome || !email || !password) {
      Alert.alert("Campos Obrigatórios", "Preencha nome, email e senha");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://r4sb8ngs-3000.brs.devtunnels.ms/api/autenticacao/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, senha: password }),
        }
      );

      const data = await response.json().catch(() => ({}));

      setLoading(false);

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => router.push('/login') },
        ]);
      } else {
        Alert.alert('Erro', data.error || 'Erro ao cadastrar cliente');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro de conexão', error.message);
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => router.push("/login")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#FFD34E" />
      </TouchableOpacity>

      <Image
        source={require('../../assets/logo3.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#cfc7c7ff"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#cfc7c7ff"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#cfc7c7ff"
          secureTextEntry={!mostrarSenha}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { paddingRight: 45 }]}
        />

        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setMostrarSenha(!mostrarSenha)}
        >
          <Ionicons
            name={mostrarSenha ? "eye-off" : "eye"}
            size={24}
            color="#cfc7c7ff"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.6 }]} 
        onPress={handleSignup} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 25,
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 25,
  },

  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    color: COLORS.yellow,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "times new roman",
  },

  input: {
    width: "100%",
    backgroundColor: COLORS.inputBg,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 18,
    fontFamily: "serif",
  },

  inputContainer: {
    width: "100%",
    position: "relative",
  },

  eyeButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },

  button: {
    backgroundColor: COLORS.yellow,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "serif",
  },
});
