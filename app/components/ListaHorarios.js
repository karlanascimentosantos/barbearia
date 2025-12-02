import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

export default function ListaHorarios({ data }) {

  const renderItem = ({ item }) => {
    const hora = new Date(item.datahora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View style={styles.card}>
        <Text style={styles.texto}>
          {item.consumidor} - {item.servico} 
        </Text>

        <Text style={styles.hora}>
          {hora}h
        </Text> 
        
              
      </View>
    );
  };

  return (
    <>
      {(!data || data.length === 0) ? (
        <Text style={styles.vazio}>Nenhum horário para este dia.</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    marginBottom: 17,
    borderRadius: 10,
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
  },
  texto: { 
    color: "#d6c5c5ff",
    fontSize: 18,
    fontFamily: "serif",
  },

  hora: { 
    color: "#d6c5c5ff",
    fontSize: 18,
    fontFamily: "serif",
  },

  vazio: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },

 
});

