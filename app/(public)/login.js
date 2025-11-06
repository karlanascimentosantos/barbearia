import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
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

      <Image source={require('../../assets/logo3.png')}
                   style={styles.image}/>


      <Text style={styles.title}>Login</Text>


      <Text style={styles.label}>Email:</Text>      
       <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        placeholder="Senha"
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
    padding: 40,
    backgroundColor: '#000000ff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "InknutAntiqua_400Regular",
    color: 'white',
    fontFamily: 'times'
    

  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 100,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#E9CA4F',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 100,
    marginTop: 10
  },
  buttonText: {
    color: '#000000ff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'times'
  },
  label: {
    color: 'white',
    fontFamily: 'times',
    fontWeight: 'bold',
    fontSize: 20,

  }
});
