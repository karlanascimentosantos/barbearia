import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getWeekDays, isSameDay } from "./CalendarBase";

export default function CalendarSemanal({ diaSelecionado, onDiaPress }) {
  const [diasSemana, setDiasSemana] = useState([]);

  useEffect(() => {
    const hoje = new Date();
    setDiasSemana(getWeekDays(hoje));

    if (!diaSelecionado) {
      onDiaPress(hoje);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mesTitulo}>
        {new Date().toLocaleString("pt-BR", { month: "long" }).toUpperCase()}
      </Text>

      <View style={styles.weekRow}>
        {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((d)=>(
          <Text key={d} style={styles.weekLabel}>{d}</Text>
        ))}
      </View>

      <View style={styles.daysRow}>
        {diasSemana.map((dia, i) => {
          const selecionado = isSameDay(dia, diaSelecionado);

          return (
            <TouchableOpacity
              key={i}
              onPress={() => onDiaPress(dia)}
              style={[styles.dayBox, selecionado && styles.daySelected]}
            >
              <Text style={[styles.dayText, selecionado && styles.daySelectedText]}>
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
  container: { backgroundColor: "#ddd", padding: 12, borderRadius: 16 },
  mesTitulo: { fontSize: 20, fontWeight: "bold", marginBottom: 6, color: "#524617" },
  weekRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  weekLabel: { width: 35, textAlign: "center", fontSize: 12, color: "#666" },
  daysRow: { flexDirection: "row", justifyContent: "space-between" },
  dayBox: { width: 35, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  daySelected: { backgroundColor: "#98ABAC" },
  dayText: { fontSize: 16, fontWeight: "600" },
  daySelectedText: { color: "#000000ff" },
});
