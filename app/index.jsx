import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import Pente from "../assets/images/pente.png";
import Tesoura from "../assets/images/tesoura.png";
import Estrela from "../assets/images/estrela.png";



export default function App() {
  const router = useRouter();

  return (
    <View style={styles.fundo}>
      <View style={styles.circle}/>
      <View style={styles.logoContainer}>
      <Image source={ Pente } style={styles.fotoPente}/>
      <Image source={Tesoura} style={styles.fotoTesoura}/>
      <Image source={Estrela} style={styles.fotoEstrela}/>
      <Image source={Estrela} style={styles.fotoEstrela2}/>
      <Image source={Estrela} style={styles.fotoEstrela3}/>
      <Image source={Estrela} style={styles.fotoEstrela4}/>
      <Image source={Estrela} style={styles.fotoEstrela5}/>
      </View>



      <Text style={styles.txt}> Bem - Vindo </Text>
    <TouchableOpacity 
     style={styles.button1} 
     onPress={() => router.push("/logins/clienteLogin")}
>
    <Text style={styles.buttonText}>ENTRAR</Text>  
   </TouchableOpacity>

   <TouchableOpacity 
   style={styles.button2}  
   onPress={() => router.push("/logins/Cadastro")} >
    <Text style={styles.buttonText2}>CADASTRE-SE</Text>
   </TouchableOpacity>

   


</View>
  );
}
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#000000ff",
    alignItems: "center",
    fontFamily: "OvoRegular"
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
  height: 70,
  marginHorizontal: -40,
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
  left: 195,
  top: -30,
},
fotoEstrela2: {
  width: 15,
  height: 15,
  position: "absolute",
  left: 220,
  top: -20,
},
fotoEstrela3: {
  width: 15,
  height: 15,
  position: "absolute",
  left: 240,
  top: -10,
},
fotoEstrela4: {
  width: 15,
  height: 15,
  position: "absolute",
  left: 175,
  top: -20,
},
fotoEstrela5: {
  width: 15,
  height: 15,
  position: "absolute",
  left: 155,
  top: -10,
},

  
  circle: {
  width: width * 1.4,
  height: width * 1.4,
  borderRadius: (width * 1.4) / 2,
  backgroundColor: "#000",
  position: "absolute",
  bottom: -height * 0.08,
  left: -width * 0.2,
},

  button1: {
    width: "50%",
    alignSelf: "center",
    marginTop: height * 0.10,
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#e9ca4f",
    paddingVertical: 10,

  },
  buttonText:{
    color: "#000000ff",
    textAlign: "center",
    fontFamily: "OvoRegular",
    fontSize: width * 0.045,
  },
  fundo:{
    flex: 1,
    backgroundColor: "#e9ca4f",
  },
  txt: {
    fontSize: width * 0.08,
    fontFamily: "OvoRegular",
    color: "white",
    textAlign: "center",
    marginTop: height * 0.40,
  },
  button2: {
    width: "50%",
    alignSelf: "center",
    marginTop: height * 0.02,
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
   

  },
  buttonText2: {
    color: "black",
    textAlign: "center",
    fontFamily: "OvoRegular",
    fontSize: width * 0.045,
  }


})
