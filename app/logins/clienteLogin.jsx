import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Pente from "../../assets/images/penteAmarelo.png";
import Tesoura from "../../assets/images/tesouraAmarela.png";
import Estrela from "../../assets/images/estrelaAmarela.png";

export default function clienteLogin() {
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')

  const router = useRouter();
  const { setUsuarioLogado } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://r4sb8ngs-3000.brs.devtunnels.ms/api/autenticacao/login', 
        {method: "POST",
         headers: {
          "Content-Type":"application/json",
         },
         body: JSON.stringify({nome, senha}),
        });

      if (response.ok) {
        const data = await response.json();
        const id = data.id;

        setUsuarioLogado(data);
        router.push('/Perfil');
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", `Erro ao fazer login: ${errorData.error || "Senha ou usuário inválidos"}`);
      }
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      Alert.alert("Erro", "Erro de conexão com o servidor");

    }
  };

  

  
  return (
    
    <View style={styles.container}>
    
     <View style={styles.logoContainer}>
  <Image source={Pente} style={styles.fotoPente} />
  <Image source={Tesoura} style={styles.fotoTesoura} />
  <Image source={Estrela} style={styles.fotoEstrela} />
  <Image source={Estrela} style={styles.fotoEstrela2} />
  <Image source={Estrela} style={styles.fotoEstrela3} />
  <Image source={Estrela} style={styles.fotoEstrela4} />
  <Image source={Estrela} style={styles.fotoEstrela5} />
     </View>

      <Text style={styles.titulo}>Login</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        
      />

      <TouchableOpacity onPress={() => Alert.alert ("Recuperar senha")}> 
        <Text style={styles.forgot}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
   
  </View>
);
}
const { width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#000000ff",
    alignItems: "center",
    
  },

  logoContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 50, 
  position: "relative",
},

fotoPente: {
  width: 70,
  height:70,
  marginHorizontal: -40,
  marginVertical: 40
},

fotoTesoura: {
  width: 80,
  height: 80,
  marginHorizontal: -40,
},

fotoEstrela: {
  width: 20,
  height: 20,
  position: "absolute",
  left: -10,
  top: -30,
},
fotoEstrela2: {
  width: 15,
  height: 15,
  position: "absolute",
  left: 20,
  top: -20,
},
fotoEstrela3: {
  width: 15,
  height: 15,
  position: "absolute",
  left: 45,
  top: -10,
},
fotoEstrela4: {
  width: 15,
  height: 15,
  position: "absolute",
  left: -35,
  top: -20,
},
fotoEstrela5: {
  width: 15,
  height: 15,
  position: "absolute",
  left: -60,
  top: -10,
},


  titulo: {
    fontSize: width * 0.08,
    fontFamily: "OvoRegular",
    color: "white",
    marginBottom: height * 0.03,
  },
  label: {
    fontSize: width * 0.045,    
    fontFamily: "OvoRegular",
    color: "white",
    alignSelf: "flex-start",
    marginTop: height * 0.02,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 5,
    color: "#c77700ff",
    fontFamily: "OvoRegular",
    marginBottom: 15,
    backgroundColor: "transparent"
  },
  button: {
    width: "50%",
    marginTop: height * 0.08,
    backgroundColor: "#e9ca4f",
    paddingVertical: 10,
    borderRadius: 90,
    alignItems: "center"
  },

  buttonText: {
    color: "#000000ff",
    textAlign: "center",
    fontFamily: "OvoRegular",
    fontSize: width * 0.045,
  },
});
