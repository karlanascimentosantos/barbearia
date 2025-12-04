import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { AuthContext } from "./context/AuthContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // 👈 IMPORTANTE

export default function AlterarSenha() {
  const { user } = useContext(AuthContext);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const BASE_URL = process.env.EXPO_PUBLIC_API;

  async function handleAlterarSenha() {
    if (!senhaAtual || !novaSenha || !confirmar) {
      return Alert.alert("Erro", "Preencha todos os campos.");
    }

    if (novaSenha !== confirmar) {
      return Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
    }

    try {
      const response = await fetch(`${BASE_URL}/api/alterarSenha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          senhaAtual,
          novaSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return Alert.alert("Erro", data.error || "Não foi possível alterar.");
      }

      Alert.alert("Sucesso", "Senha alterada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar com o servidor.");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>

      {/* SENHA ATUAL */}
      <Text style={styles.label}>Senha Atual</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={!showSenhaAtual}
          style={styles.input}
          value={senhaAtual}
          onChangeText={setSenhaAtual}
          placeholder="Digite sua senha atual"
          placeholderTextColor="#777"
        />
        <TouchableOpacity
          onPress={() => setShowSenhaAtual(!showSenhaAtual)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showSenhaAtual ? "eye-off" : "eye"}
            size={22}
            color="#FFD700"
          />
        </TouchableOpacity>
      </View>

      {/* NOVA SENHA */}
      <Text style={styles.label}>Nova Senha</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={!showNovaSenha}
          style={styles.input}
          value={novaSenha}
          onChangeText={setNovaSenha}
          placeholder="Nova senha"
          placeholderTextColor="#777"
        />
        <TouchableOpacity
          onPress={() => setShowNovaSenha(!showNovaSenha)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showNovaSenha ? "eye-off" : "eye"}
            size={22}
            color="#FFD700"
          />
        </TouchableOpacity>
      </View>

      {/* CONFIRMAR SENHA */}
      <Text style={styles.label}>Confirmar Nova Senha</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={!showConfirmar}
          style={styles.input}
          value={confirmar}
          onChangeText={setConfirmar}
          placeholder="Confirme sua nova senha"
          placeholderTextColor="#777"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmar(!showConfirmar)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showConfirmar ? "eye-off" : "eye"}
            size={22}
            color="#FFD700"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAlterarSenha}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 25,
  },
  label: {
    color: "#FFD700",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    padding: 12,
    paddingRight: 45,
    color: "#fff",
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 15,
    padding: 10,
  },
  cancelText: {
    color: "#FFD700",
    textAlign: "center",
  },
});
