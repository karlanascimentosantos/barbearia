import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function ListaAgendamentos({ data, renderItem }) {
  
  const renderPadrao = ({ item }) => {
    const hora = new Date(item.datahora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const status = item.concluido ? "Concluído" : "Pendente";
    const statusColor = item.concluido ? "#4CAF50" : "#FFA500";

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.nomeServico}>{item.consumidor} - {item.servico}</Text>
          <Text style={styles.hora}>{hora}h</Text>
        </View>
        <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={Array.isArray(data) ? data : []}
      keyExtractor={(item, index) =>
        item.agendamentoid ? item.agendamentoid.toString() : index.toString()
      }
      renderItem={renderItem || renderPadrao}
      ListEmptyComponent={
        <Text style={styles.vazio}>Sem agendamentos neste dia.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nomeServico: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  hora: { color: "#aaa", fontSize: 16 },
  status: { marginTop: 4, fontSize: 14, fontWeight: "bold" },
  vazio: { color: "#777", textAlign: "center", marginTop: 40 }
});
