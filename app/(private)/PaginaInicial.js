import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import ListaHorarios from "../components/ListaHorarios";

export default function PaginaInicial() {
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());
  const [faturamento, setFaturamento] = useState(0);
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  

  
  const formatarDataAPI = (d) => {
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

    
  const carregarFaturamento = async () => {
    try {
      const dataFormatada = formatarDataAPI(diaSelecionado);

      const res = await fetch(
        `https://r4sb8ngs-3000.brs.devtunnels.ms/api/faturamento?data=${dataFormatada}`
      );

      const json = await res.json();
      setFaturamento(Number(json?.faturamento || 0));

    } catch (err) {
      console.log("Erro ao buscar faturamento:", err);
      setFaturamento(0);
    }
  };


  const carregarAgendamentos = async () => {
    try {
      const dataFormatada = formatarDataAPI(diaSelecionado);

      const res = await fetch(
        `https://r4sb8ngs-3000.brs.devtunnels.ms/api/agendamento?admin=true&data=${dataFormatada}`
      );

      const json = await res.json();
      setAgendamentos(Array.isArray(json) ? json : []);

    } catch (err) {
      console.log("Erro ao buscar agendamentos:", err);
      setAgendamentos([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    carregarAgendamentos();
    carregarFaturamento();
  }, [diaSelecionado]);

  
  const mudarDia = (inc) => {
    const novoDia = new Date(diaSelecionado);
    novoDia.setDate(novoDia.getDate() + inc);
    setDiaSelecionado(novoDia);
  };

  const formatarDataExibicao = (d) =>
    d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        );
      }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda do Dia</Text>

      <View style={styles.cardFaturamento}>
        <Text style={styles.cardTitulo}>Faturamento</Text>
        <Text style={styles.cardValor}>
          R$ {faturamento.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <View style={styles.linhaDatas}>
        <TouchableOpacity style={styles.botao} onPress={() => mudarDia(-1)}>
          <Text style={styles.botaoTexto}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.dataTexto}>{formatarDataExibicao(diaSelecionado)}</Text>

        <TouchableOpacity style={styles.botao} onPress={() => mudarDia(1)}>
          <Text style={styles.botaoTexto}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <ListaHorarios  data={agendamentos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    color: "#E9CA4F",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    fontFamily: "times new roman",
  },
  cardFaturamento: {
  backgroundColor: "#1a1a1a",
  paddingVertical: 35,
  paddingHorizontal: 25,
  borderRadius: 20,
  marginTop: 40,
  marginBottom: 30,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#2a2a2a",
},

cardTitulo: {
  fontSize: 20,
  color: "#c8c39b",
  fontWeight: "600",
  marginBottom: 15,
  fontFamily: "times new roman",
},

  cardValor: {
  fontSize: 36,
  color: "#ffffff",
  fontWeight: "bold",
  fontFamily: "serif",
  },

  linhaDatas: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#222",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "serif",
  },
  dataTexto: {
    color: "#fff",
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});

