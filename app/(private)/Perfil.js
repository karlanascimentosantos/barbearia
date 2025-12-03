import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { router } from "expo-router";
  


export default function Perfil() {
  const { user, signOut } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);


  function handleLogout() {
    setModalVisible(true);
  }

  async function confirmLogout() {
    await signOut();
    setModalVisible(false);
    router.replace("/");
  }

  function goToChangePassword() {
    router.push("/alterarSenha");
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.profileCard}>
        <Text style={styles.name}>{user?.nome}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity
          style={styles.changePassButton}
          onPress={goToChangePassword}
          activeOpacity={0.8}
        >
          <Text style={styles.changePassText}>Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

   
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Sair da Conta?</Text>
            <Text style={styles.modalMessage}>Deseja realmente sair?</Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmLogout}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmText}>Sim, sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const COLORS = {
  background: "#000000",
  yellow: "#F7C844",
  yellowDark: "#D9A72E",
  card: "#0F0F0F",
  text: "#FFFFFF",
  red: "#E44545",
  muted: "#AAA",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },


  profileCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    paddingVertical: 35,
    paddingHorizontal: 25,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#494141ff",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },

  name: {
    color: COLORS.yellow,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
    fontFamily: "times new roman",
  },
  email: {
    color: COLORS.muted,
    fontSize: 16,
    marginBottom: 30,
    fontFamily: "times new roman",
  },

  changePassButton: {
    backgroundColor: COLORS.yellow,
    padding: 15,
    width: "100%",
    borderRadius: 14,
    marginBottom: 15,
  
  },
  changePassText: {
    textAlign: "center",
    color: "#000",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "arial",
  },

  logoutButton: {
    backgroundColor: COLORS.red,
    padding: 15,
    width: "100%",
    borderRadius: 14,
  },
  logoutText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "serif"
  },

 
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBox: {
    width: "100%",
    backgroundColor: COLORS.card,
    padding: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },

  modalTitle: {
    color: COLORS.yellow,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "arial"
  },
  modalMessage: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 25,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  cancelText: {
    color: COLORS.muted,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
