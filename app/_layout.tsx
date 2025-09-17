import { Slot } from 'expo-router'; // Slot renderiza as páginas filhos
import { AuthProvider } from '../context/AuthContext';
import { useFonts } from 'expo-font';
import { View, Text } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    OvoRegular: require('../assets/fonts/Ovo-Regular.ttf'),
  });

  if (!fontsLoaded) {
    // Enquanto a fonte carrega, podemos mostrar um placeholder simples
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <Slot /> {/* Renderiza todas as páginas da pasta */}
    </AuthProvider>
  );
}
