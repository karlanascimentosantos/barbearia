import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const buscarUsuario = async () => {
    try {
      const res = await fetch(
        "https://r4sb8ngs-3000.brs.devtunnels.ms/api/auth/session",
        { credentials: "include" }
      );

      const json = await res.json();

      setUser(json?.user || null);
    } catch (err) {
      console.log("Erro ao carregar usuário:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarUsuario();
  }, []);

  const logout = async () => {
    await fetch("https://r4sb8ngs-3000.brs.devtunnels.ms/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.headerDiagonal} />

      <Text style={styles.titulo}>EU</Text>

      {/* FOTO DO PERFIL */}
      <Image
        source={{ uri: "https://i.imgur.com/OGa7N8Z.png" }}
        style={styles.foto}
      />

      <TouchableOpacity>
        <Text style={styles.editarFoto}>Editar foto</Text>
      </TouchableOpacity>

      {/* INFORMAÇÕES */}
      <Text style={styles.info}>Email:  {user?.email}</Text>
      <Text style={styles.info}>Telefone: {user?.telefone || "Não informado"}</Text>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Editar dados pessoais</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.alterarSenha}>Alterar senha</Text>
      </TouchableOpacity>

      {/* SAIR */}
      <TouchableOpacity onPress={logout}>
        <Text style={styles.sair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 80,
    alignItems: "center",
  },
  headerDiagonal: {
    position: "absolute",
    width: "100%",
    height: 140,
    backgroundColor: "#e1c24a",
    transform: [{ skewY: "-10deg" }],
    top: -40,
  },
  titulo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editarFoto: {
    color: "#fff",
    marginTop: 10,
    marginBottom: 30,
  },
  info: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  botaoTexto: {
    color: "#fff",
  },
  alterarSenha: {
    color: "#fff",
    fontSize: 16,
    marginTop: 30,
  },
  sair: {
    color: "#fff",
    fontSize: 20,
    marginTop: 50,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
