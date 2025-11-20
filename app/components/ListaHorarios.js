import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function Historico() {
  const [agendamentos, setAgendamentos] = useState([]);

  const fetchHoje = async () => {
    try {
      const response = await fetch(
       "https://console.neon.tech/app/projects/winter-hat-88451502/api/agendamento?admin=true",
  {
        method: "GET",
      credentials: "omit",
 }
);
      const data = await response.json();
      setAgendamentos(data);
      
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    }
  };

  useEffect(() => {
    fetchHoje();
  }, []);

  function formatarHora(dataISO) {
    const d = new Date(dataISO);
    return d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.cliente}</Text>
      <Text style={styles.servico}>Serviço: {item.servico}</Text>
      <Text style={styles.data}>Horário: {formatarHora(item.datahora)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.agendamentoid.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum agendamento para hoje.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  nome: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  servico: {
    color: "#ccc",
    marginTop: 4,
  },
  data: {
    color: "#aaa",
    marginTop: 4,
  },
  vazio: {
    color: "#777",
    textAlign: "center",
    marginTop: 40,
  },
});
