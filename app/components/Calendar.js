import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function Calendar({ mostrarSemana = false }) {
  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [diasDoMes, setDiasDoMes] = useState([]);
  const [primeiroDiaSemana, setPrimeiroDiaSemana] = useState(0);
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate());

  const nomesMeses = [
    "JANEIRO","FEVEREIRO","MARÇO","ABRIL",
    "MAIO","JUNHO","JULHO","AGOSTO",
    "SETEMBRO","OUTUBRO","NOVEMBRO","DEZEMBRO"
  ];
  const diasSemana = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

  const { width } = useWindowDimensions();
  const pillSize = Math.min(44, Math.floor((width - 60) / 9)); 

  useEffect(() => {
    gerarDias(mes, ano);
  }, [mes, ano]);

  function gerarDias(mes, ano) {
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    setPrimeiroDiaSemana(primeiroDia);

    const dias = [];
    for (let i = 1; i <= ultimoDia; i++) dias.push(i);
    setDiasDoMes(dias);

    const hojeEhMesmoMes = mes === hoje.getMonth() && ano === hoje.getFullYear();
    if (hojeEhMesmoMes) setDiaSelecionado(hoje.getDate());
  }

  function avancarMes() {
    if (mes === 11) {
      setMes(0);
      setAno(ano + 1);
    } else setMes(mes + 1);
  }

  function voltarMes() {
    if (mes === 0) {
      setMes(11);
      setAno(ano - 1);
    } else setMes(mes - 1);
  }

  
  
  const renderSemana = () => {
    const weekDays = [];
    const diaSemana = hoje.getDay();

    for (let i = 0; i < 7; i++) {
      const diff = i - diaSemana;
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + diff);

      weekDays.push({
        label: data.toLocaleDateString("pt-BR", { weekday: "short" }).toUpperCase(),
        day: data.getDate(),
        isToday: data.toDateString() === hoje.toDateString(),
      });
    }

    return (
      <View style={styles.weekContainer}>
        {weekDays.map((d, index) => (
          <View
            key={index}
            style={[styles.weekBox, d.isToday && styles.todayWeekBox]}
          >
            <Text style={[styles.weekLabel, d.isToday && styles.todayText]}>
              {d.label}
            </Text>

            <Text style={[styles.weekNumber, d.isToday && styles.todayText]}>
              {d.day}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  
  if (mostrarSemana) return renderSemana();


  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={voltarMes} style={styles.arrowBtn}>
            <Text style={styles.arrow}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.mes}>{nomesMeses[mes]} {ano}</Text>

          <TouchableOpacity onPress={avancarMes} style={styles.arrowBtn}>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.semanaRow}>
          {diasSemana.map((d, i) => (
            <Text key={i} style={styles.semana}>{d}</Text>
          ))}
        </View>

        <View style={styles.diasGrid}>
          {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
            <View key={`empty-${i}`} style={[styles.diaBox, {height: pillSize + 12}]} />
          ))}

          {diasDoMes.map((dia, i) => {
            const eHoje =
              dia === hoje.getDate() &&
              mes === hoje.getMonth() &&
              ano === hoje.getFullYear();

            const eSelecionado = dia === diaSelecionado;

            return (
              <TouchableOpacity
                key={i}
                onPress={() => setDiaSelecionado(dia)}
                style={[styles.diaBox]}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.diaContainer,
                    { width: pillSize, height: pillSize + 4, borderRadius: Math.ceil(pillSize / 2) },
                    eHoje && styles.hoje,
                    eSelecionado && styles.selecionado,
                  ]}
                >
                  <Text
                    style={[
                      styles.diaTexto,
                      eHoje && styles.hojeTexto,
                      eSelecionado && styles.selecionadoTexto,
                    ]}
                  >
                    {dia}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

// ---------------------
// ESTILOS
// ---------------------
const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  weekBox: {
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },

  todayWeekBox: {
    backgroundColor: "#FFD36B",
  },

  weekLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  weekNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  todayText: {
    color: "#000",
    fontWeight: "700",
  },

  wrapper: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "#EDECEC",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 20,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mes: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5A4A1F",
    textTransform: "uppercase",
  },

  arrowBtn: {
    padding: 6,
  },

  arrow: {
    fontSize: 22,
    color: "#5A4A1F",
  },

  semanaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 8,
  },

  semana: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },

  diasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  diaBox: {
    width: `${100 / 7}%`,
    alignItems: "center",
    marginBottom: 8,
  },

  diaContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  diaTexto: {
    fontSize: 14,
    color: "#000",
  },

  selecionado: {
    backgroundColor: "#C6D5D3",
  },

  selecionadoTexto: {
    fontWeight: "700",
    color: "#1C3836",
  },

  hoje: {
    backgroundColor: "#FFD36B",
  },

  hojeTexto: {
    fontWeight: "700",
    color: "#000",
  },
});
