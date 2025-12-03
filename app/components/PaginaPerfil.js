import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function PaginaPerfil({ fetchUser }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fetchUser) {
      fetchUser()
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  if (!user) return <Text>Usuário não encontrado</Text>;

  return (
    <View style={styles.container}>
      {user.foto && (
        <Image source={{ uri: user.foto }} style={styles.foto} />
      )}

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{user.nome}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.value}>{user.telefone}</Text>

      <Text style={styles.label}>Função:</Text>
      <Text style={styles.value}>{user.role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  foto: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { marginBottom: 5, textAlign: "center" }
});
