import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import ListaAgendamentos from "../components/ListaAgendamentos";
import CalendarMensal from "../components/CalendarMensal";

export default function Agenda() {
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!diaSelecionado) return;
    fetchAgendamentos(diaSelecionado);
  }, [diaSelecionado]);

  const formatarDataAPI = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const fetchAgendamentos = async (dataObj) => {
    try {
      const dataFormatada = formatarDataAPI(dataObj);
      const res = await fetch(
        `https://r4sb8ngs-3000.brs.devtunnels.ms/api/agendamento?admin=true&data=${dataFormatada}`
      );
      const json = await res.json();
      setAgendamentos(json);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoading(false)
    }
  };

  const renderItem = ({ item }) => {
    const hora = new Date(item.datahora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

      if (loading) {
      return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
       </View>
      );
          }

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.nomeServico}>
            {item.consumidor} - {item.servico}
          </Text>

          <View style={styles.horarioStatus}>
            <Text style={styles.hora}>{hora}h</Text>
          </View>
        </View>
      </View>
    );
  };

  

  return (
    <View style={styles.container}>

      

      <View style={styles.cardCalendario}>
        <CalendarMensal
          diaSelecionado={diaSelecionado}
          onDiaPress={(d) => setDiaSelecionado(d)}
        />
      </View>

      {agendamentos.length === 0 ? (
        <Text style={styles.vazio}>
          Sem agendamentos neste dia
        </Text>
      ) : (
        <ListaAgendamentos data={agendamentos} renderItem={renderItem} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  

  cardCalendario: {
    backgroundColor: "#cfc6c6ff",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 35,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    marginTop: 30,
  },
  
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nomeServico: {
    color: "#d6c5c5ff",
    fontSize: 18,
    fontFamily: "serif",
  },

  horarioStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  hora: { color: "#d6c5c5ff", fontSize: 16, fontFamily: "serif" },

  vazio: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginTop: 30,
    fontFamily: "serif",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});