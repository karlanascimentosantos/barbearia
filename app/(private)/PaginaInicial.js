import { View, Text, StyleSheet, Image } from "react-native";
import Calendar from '../components/Calendar'
import ListaHorarios from  '../components/ListaHorarios'

export default function PaginaInicial() {
  return (
    <View style={styles.container}>

  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={styles.texto}>Agendamentos do dia</Text>
    <Image source={require('../../assets/man.png')} style={styles.image} />
  </View>

  <Calendar mostrarSemana/>
  <ListaHorarios/>

</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000ff", 
    flexDirection: "column"  },

  texto: {
    fontSize: 20,
    color: "#ffffffff",
    fontFamily: "InknutAntiqua_400Regular",
    marginTop: 20,
    marginLeft: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 40,
  }
});
