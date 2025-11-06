import { View, Text, StyleSheet, Image } from "react-native";

export default function PaginaInicial() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Agendamentos do dia</Text>
      <Image source={require('../../assets/man.png')}
             style={styles.image}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000ff", 
    flexDirection: "row", // coloca lado a lado
  },
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
    marginRight: 10,
  }
});
