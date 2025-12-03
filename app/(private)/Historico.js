import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";

export default function Historico() {
  const [meses, setMeses] = useState([]);
  const [total, setTotal] = useState(0);
  const [maisEscolhido, setMaisEscolhido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [faturamentoAnual, setFaturamentoAnual] = useState(0);
  const [avaliacaoGeral, setAvaliacaoGeral] = useState(0);
  const [ano, setAno] = useState(2025);

  function anoAnterior() {
  setAno(prev => prev - 1);
  }

  function proximoAno() {
  setAno(prev => prev + 1);
  } 

  async function carregarDados() {
    try {
      const resHistorico = await fetch(
          `https://r4sb8ngs-3000.brs.devtunnels.ms/api/historico?ano=${ano}`
            );
      const historicoData = await resHistorico.json();

      setAvaliacaoGeral(historicoData.avaliacaoGeral);

      if (!historicoData.meses) {
        console.log("Resposta inesperada:", historicoData);
        return;
      }

      setMeses(historicoData.meses);
      setTotal(historicoData.total);

      const resServico = await fetch(
       `https://r4sb8ngs-3000.brs.devtunnels.ms/api/servico-mais-escolhido?ano=${ano}`
        );

      const servicoData = await resServico.json();

      setMaisEscolhido(servicoData?.servico || "Nenhum");

      const resFaturamento = await fetch(
      `https://r4sb8ngs-3000.brs.devtunnels.ms/api/faturamentoAnual?ano=${ano}`     
);
      const faturamentoData = await resFaturamento.json();
      setFaturamentoAnual(faturamentoData?.faturamento || 0)

    } catch (err) {
      console.log("Erro:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, [ano]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="white"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.anoBox}>
        <Text style={styles.anoTitulo}>{ano}</Text>

           <View style={styles.botoesAno}>
           <Text style={styles.botaoAno} onPress={anoAnterior}>◄</Text>
        <Text style={styles.botaoAno} onPress={proximoAno}>►</Text>
           </View>
      </View>

      <Text style={styles.titulo}>Resumo Anual</Text>

 <View style={styles.container2}>
      <Text style={styles.tituloAtendimentos}>Total de atendimentos:</Text>
      <Text style={styles.valor}>{total}</Text>

    
      <Text style={styles.tituloServico}>Serviço mais escolhido:</Text>
      <Text style={styles.valor}>{maisEscolhido}</Text>

       <Text style={styles.tituloFaturado}>Total Faturado:</Text>
      <Text style={styles.valor}>R$ {faturamentoAnual.toFixed(2)}</Text>

      <Text style={styles.tituloAvaliacao}>Avaliação geral:</Text>
      <Text style={styles.valor}>
        {avaliacaoGeral > 0 ? `${Number(avaliacaoGeral).toFixed(1)} ⭐` : "Sem avaliações"}
      </Text>

</View>

      <FlatList
        data={meses}
        keyExtractor={(item) => item.mes.toString()}
        renderItem={({ item }) => (
          <View style={styles.mesBox}>
            <Text style={styles.nomeMes}>{item.nome}</Text>

            {item.itens.length === 0 ? (
              <Text style={styles.vazio}>Sem atendimentos</Text>
            ) : (
              item.itens.map((ag, idx) => (
                <View key={idx} style={styles.itemBox}>
                  <Text style={styles.text}>{ag.data} • {ag.horario}</Text>
                  <Text style={styles.text}>{ag.servico} </Text>

                  <Text style={styles.text}>
                     Avaliação: {ag.avaliacao ? `${ag.avaliacao} ⭐` : "Sem avaliação"}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  padding: 20, 
  backgroundColor: "black" 
},

  loading: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  titulo: { 
  fontSize: 25, 
  fontWeight: "bold", 
  marginBottom: 5, 
  color: "white",
  fontFamily: "times new roman",
  color: "#E9CA4F"

},

 container2: {
  backgroundColor: "#161616",
  paddingVertical: 35,
  paddingHorizontal: 25,
  borderRadius: 20,
  marginTop: 30,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "#2a2a2a",
 },

 
 tituloAtendimentos: {
   fontFamily: "times new roman",
   color: "#c8c39b",
   fontSize: 15,

 },

 tituloServico: {
  marginTop: 15,
  color: "#c8c39b",
  fontSize: 15,
  fontFamily: "times new roman",
 },

 tituloAvaliacao: {
  marginTop: 15,
  color: "#c8c39b",
  fontSize: 15,

 },

 tituloFaturado: {
  marginTop: 15,
  color: "#c8c39b",
  fontSize: 15,
  fontFamily: "times new roman",
 },

 
  mesBox: { 
  marginBottom: 20,
   color: "white" 
  },

  nomeMes: { 
  fontSize: 18, 
  fontWeight: "bold", 
  color: "#E9CA4F",
  fontFamily: "serif"
},

  itemBox: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#564d4dff",
  },

  vazio: { 
    color: "#564d4dff",
    marginTop: 5 
  },

  text: {
  color: "#c3c3beff",
  fontFamily: "serif",
  fontSize: 18,
  },

  valor: {
   color: "white",
   fontSize: 22,
   marginBottom: 10,
   fontFamily: "serif",
   
  },

  anoBox: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 15,
},

anoTitulo: {
  fontSize: 32,
  fontWeight: "bold",
  color: "white",
  fontFamily: "times new roman",
},
botoesAno: {
  flexDirection: "row",
  gap: 20,
},
botaoAno: {
  fontSize: 28,
  color: "#e8c545",
  paddingHorizontal: 10,
},


});
