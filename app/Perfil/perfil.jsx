import { View, Text, TouchableOpacity, Image, Alert, Linking, } from "react-native";
import { useAuth } from '../../context/AuthContext';
import React,{ useEffect, useState} from "react";
import { ScrollView } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function Perfil() {
    const {usuarioLogado} = useAuth()
    const [agendamentos, setAgendamentos ] = useState([])
    const [proximo, setProximo] = useState(null)

    useEffect(() => {
        if(!usuarioLogado?.id) return;

        async function fetchAgendamentos(){
            try {
                const response = await fetch(`https://r4sb8ngs-3000.brs.devtunnels.ms/api/agendamento?consumidorId=${usuarioLogado.id}`)
                const data = await response.json();
                setAgendamentos(data);

                const agora = new Date();
                const futuros = data.filter((a) => new Date(a.datahora) > agora);
                futuros.sort((a, b) => new Date(a.datahora) - new Date(b.datahora));
                setProximo(futuros[0] || null);
            } catch (error) {
                console.error("Erro ao buscar agendamento", error)
            }
        }

        fetchAgendamentos();
    }, [usuarioLogado]);

    if (!usuarioLogado) return <Text> Voce não está logado </Text>

    async function handleDelete(id) {
    if (!id) return Alert.alert("Erro", "ID inválido");

      Alert.alert("Confirmação", "Deseja realmente cancelar  este agendamento?", [
        { text: "Cancelar", style: "cancel"},
        {
          text: "OK",
          onPress: async () => {

          try{
            const response = await fetch(`https://r4sb8ngs-3000.brs.devtunnels.ms/api/agendamento`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id })
            });

            const data = await response.json();
            if(response.ok) {
                Alert.alert("Sucesso", data.message);
                setAgendamentos((prev) => prev.filter(a => a.agendamentoid !== id));

                const agora = new Date();
                const futuros =  agendamentos
                    .filter(a => a.agendamentoid !== id && new Date(a.datahora) > agora)
                    .sort((a, b) => new Date(a.datahora) - new Date(b.datahora));
                setProximo(futuros[0] || null);
            } else {
                Alert.alert("Erro", data.error || "Erro ao cancelar serviço");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Erro", "Erro ao cancelar serviço")
        }
      },
    },
  ]);
}

  return (
   <ScrollView >
    <Text> 
     <CircleUserRound/> { usuarioLogado.nome}
    </Text> 

    <TouchableOpacity onPress={() => console.log("Agendar horário")}>
        <Text> Agendar horario</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => console.log("Histórico")}>
        <Text> Ver historico </Text>
    </TouchableOpacity>

    <Text> Dúvidas? Fale comigo no whatsapp</Text>

    <TouchableOpacity onPress={() => Linking.openURL("https://wa.me/558394182171")}>
        <MessageCircleCircle/>
        <Text>Clique aqui!</Text>
    </TouchableOpacity>


    <View>
        <MapPin/>
        <Text>Estamos abertos até o meio dia</Text>
    </View>


    <Image source={require("../../assets/images/bigodee.png")}/>

    <View> 
        <Text>Seu próximo serviço:</Text>

        {proximo ? (
            <View>
                <Text>{proximo.servico}</Text>
                <Text>
                    <Calendar/>{" "}
                    {new Date(proximo.datahora).toLocaleDateString("pt-Br",{
                        day: "2-digit",
                        month: "2-digit",
                    })}{" "}
                    ás{" "}
                    {new Date(proximo.datahora).toLocaleDateString([],{
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>

                <TouchableOpacity
                    onPress={() => handleDelete(proximo?.agendamentoid)}
                    > 
                    <Trash2/>  
                    <Text>Cancelar</Text>         
                </TouchableOpacity>
                </View>
        ) : (

            <Text> Voce não possui serviços agendados. </Text>
              )}
              </View>
   </ScrollView>

  );
}