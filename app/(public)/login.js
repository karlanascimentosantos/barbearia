import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons"; 

export default function Login({}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos Obrigatórios", "Preencha email e senha");
      return;
    }

    try {
      const response = await fetch('https://r4sb8ngs-3000.brs.devtunnels.ms/api/autenticacao/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password })
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token || '');
        await AsyncStorage.setItem('user', JSON.stringify(data.user || {})); 
router.push('/(private)/PaginaInicial');
      } else {
        Alert.alert("Erro", data.error || "Credenciais inválidas");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor");
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => router.push("/")}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image source={require('../../assets/logo3.png')}
                   style={styles.image}/>


      <Text style={styles.title}>Login</Text>


      <Text style={styles.label}>Email:</Text>      
       <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    paddingHorizontal: 40,
    paddingTop: 80,
  },

  backButton: {
    position: "absolute",
    top: 50,
    zIndex: 2,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: "InknutAntiqua_400Regular",
    color: 'white',
    fontFamily: 'times',
    top: 50,
  },

  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    padding: 10,
    color: "#fff",
    top: 80,
  },
  button: {
    backgroundColor: "#E9CA4F",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 180,
    width: "60%", // 🔸 Diminui a largura do botão,
    alignSelf: "center", // centraliza horizontalmente
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: 'times',
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: 'times',
    top: 80,
    marginTop: 30,
  },

  image: {
    width: 140,
    height: 135,
    alignSelf: "center",
    marginBottom: 50,
  }
 
});
