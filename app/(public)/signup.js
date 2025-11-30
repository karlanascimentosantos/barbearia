
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";


export default function Signup() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if (!nome || !email || !password) {
      Alert.alert("Campos Obrigatórios", "Preencha nome, email e senha");
      return;
    }


    try {
      console.log("Tentando conectar...");


      const response = await fetch(
        'https://db-bayo0lcm1-karla-mikaellys-projects.vercel.app/api/autenticacao/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, senha: password }),
        }
      );


      const data = await response.json().catch(() => ({}));


      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => router.push('/login') },
        ]);
      } else {
        Alert.alert('Erro', data.error || 'Erro ao cadastrar cliente');
      }
    } catch (error) {
      Alert.alert('Erro de conexão', error.message);
  }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>


      <Image source={require('../../assets/logo3.png')} style={styles.image} />


      <Text style={styles.title}>Sign-up</Text>


      <Text style={styles.label}>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />


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
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'times',
    color: 'white',
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
    marginTop: 120,
    width: "60%",
    alignSelf: "center",
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
  },
});