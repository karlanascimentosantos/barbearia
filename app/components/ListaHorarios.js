
import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

export default function ListaHorarios({ data }) {
  const [agendamentos, setAgendamentos] = useState([]);

  const formatarDataAPI = (d) => {
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const fetchAgendamentos = async () => {
    try {
      const dataFormatada = formatarDataAPI(data);

      const res = await fetch(
        `https://r4sb8ngs-3000.brs.devtunnels.ms/api/agendamento?admin=true&data=${dataFormatada}`
      );

      const json = await res.json();

    
      setAgendamentos(Array.isArray(json) ? json : []);
    } catch (e) {
      console.log("Erro ao buscar esta merdaaaaaaaaaa", e);
      setAgendamentos([]); 
    }
  };

  useEffect(() => {
    if (data) fetchAgendamentos();
  }, [data]);

  const renderItem = ({ item }) => {
    const hora = new Date(item.datahora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View style={styles.card}>
        <Text style={styles.texto}>{item.consumidor} - {item.servico} {hora}h </Text> 
      </View>
    );
  };

  return (
    <>
      {agendamentos.length === 0 ? (
        <Text style={styles.vazio}>Nenhum horário para este dia.</Text>
      ) : (
        <FlatList
         data={agendamentos}
         renderItem={renderItem}
         keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        />

      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
  texto: { color: "#fff", fontSize: 16 },
  vazio: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
});
