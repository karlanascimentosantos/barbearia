import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getMonthDays, isSameDay } from "./CalendarBase";

export default function CalendarMensal({ diaSelecionado, onDiaPress }) {
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [diasMes, setDiasMes] = useState([]);

  useEffect(() => {
    setDiasMes(getMonthDays(anoAtual, mesAtual));
  }, [mesAtual, anoAtual]);

  const meses = new Date(anoAtual, mesAtual).toLocaleString("pt-BR", {
    month: "long",
  }).toUpperCase();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (mesAtual === 0) {
              setAnoAtual(anoAtual - 1);
              setMesAtual(11);
            } else {
              setMesAtual(mesAtual - 1);
            }
          }}
        >
          <Text style={styles.arrow}>◀</Text>
        </TouchableOpacity>

        <Text style={styles.mesTitulo}>{meses}</Text>

        <TouchableOpacity
          onPress={() => {
            if (mesAtual === 11) {
              setAnoAtual(anoAtual + 1);
              setMesAtual(0);
            } else {
              setMesAtual(mesAtual + 1);
            }
          }}
        >
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.weekRow}>
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <Text key={d} style={styles.weekLabel}>{d}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {diasMes.map((dia, i) => {
            if (dia === null) {
                return (
                    <View key={i} style={[styles.dayBox, {opacity:0}]}/>
                );
            }
          const selecionado = isSameDay(dia, diaSelecionado);

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.dayBox,
                selecionado && styles.daySelected
              ]}
              onPress={() => onDiaPress(dia)}
            >
              <Text
                style={[
                  styles.dayText,
                  selecionado && styles.daySelectedText
                ]}
              >
                {dia.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 16,
    marginBottom: 20
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  mesTitulo: {
    fontSize: 22,
    fontWeight: "bold",
  },

  arrow: {
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  weekLabel: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dayBox: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 6,
  },

  daySelected: {
    backgroundColor: "#d3d3d3",
  },

  dayText: {
    fontSize: 15,
    fontWeight: "600",
  },

  daySelectedText: {
    color: "#000",
  },
});
