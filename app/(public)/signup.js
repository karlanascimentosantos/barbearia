import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const addConsumidor = async () => {
    const consumidor = { nome, email, senha };


    try {
      console.log("Tentando conectar...");

      const response = await fetch(
        'https://r4sb8ngs-3000.brs.devtunnels.ms/api/autenticacao/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(consumidor),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => router.push('/login') },
        ]);
      } else {
        Alert.alert('Erro', data.error || 'Erro ao cadastrar cliente');
      }
    } catch (error) {
      Alert.alert('Erro de conexão', error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          width: 250,
          padding: 8,
          borderRadius: 8,
        }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          width: 250,
          padding: 8,
          borderRadius: 8,
        }}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{
          borderWidth: 1,
          marginBottom: 10,
          width: 250,
          padding: 8,
          borderRadius: 8,
        }}
      />

      <Button title="Cadastrar" onPress={addConsumidor} />
    </View>
  );
}
