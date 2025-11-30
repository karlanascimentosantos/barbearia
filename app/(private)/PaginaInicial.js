import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import ListaHorarios from "../components/ListaHorarios";
import CalendarSemanal from "../components/CalendarSemanal";

export default function PaginaInicial() {
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());

  return (
    <View style={styles.container}>

      
      <View style={styles.header}>
        <Text style={styles.titulo}>Agendamentos do dia</Text>
        <Image 
          source={require("../../assets/man.png")}
          style={styles.image}
        />
      </View>

     
      <View style={styles.cardCalendario}>
        <CalendarSemanal
          diaSelecionado={diaSelecionado}
          onDiaPress={(d) => setDiaSelecionado(d)}
        />
      </View>

     
      <View style={styles.listaWrapper}>
        <ListaHorarios data={diaSelecionado} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  titulo: {
    fontSize: 26,
    color: "#f2d46b",
    fontFamily: "serif",
  },
  image: {
    width: 45,
    height: 45,
  },

  cardCalendario: {
    backgroundColor: "#ddd",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 35,
    marginBottom: 25,
  },

 
  listaWrapper: {
    marginTop: 10,
  },
});
