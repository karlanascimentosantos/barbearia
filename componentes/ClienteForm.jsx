import {useEffect, useState} from 'react'
import {TouchableOpacity, View, Text, TextInput, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Picker } from 'react-native-web'



export default function ClienteForm({ onAddAgendamento}){
    const [servico, setServico] = useState([]) 
    const [servicoId, setServicoId] = useState('')
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')
    const [horarios, setHorarios] = useState('') 

    useEffect(() => {fetchServicos() }, [])

    const fetchServicos = async() => {
        try {
            const res = await fetch('https://r4sb8ngs-3000.brs.devtunnels.ms/api/servicos')
            const data = await res.json()
            setServico(Array.isArray(data) ? data : [])
        } catch(err) {
            Alert.alert('Erro', 'não foi possível carregar serviços')
        }
    }

    const fetchHorarios = async(dataSelecionada) => {
        setData(dataSelecionada)
        setHora('')
        if (!dataSelecionada) {setHorarios([]); return }
        try {
            const res = await fetch(`https://r4sb8ngs-3000.brs.devtunnels.ms/api/horarios?data=${dataSelecionada}`)
            const json = await res.json()
            setHorarios(Array.isArray(json.horariosDisponiveis) ? json.horariosDisponiveis: [])
        } catch(err) {
            Alert.alert('Erro', 'Erro ao carregar horários')
        }
    }

    const handleSubmit = () => {
        if(!servicoId) return Alert.alert('erro', 'Selecione um serviço')
        if(!data || !hora) return Alert.alert('erro', 'Selecione uma data e o horário')
            const datahora = `${data} ${hora}:00`
        onAddAgendamento({id_servico: servicoId, datahora})
    }
    
    return(
        <ScrollView>
            <Text> Qual o serviço de hoje?</Text>
            <View>
                <Picker
                    selectedValue={servicoId}
                    onValueChange={(itemValue) => setServicoId(itemValue)}
                >
                    <Picker.Item label="Selecione um serviço" value=""/>
                    {servico.map(s => (
                        <Picker.Item key={s.id} label={s.nome} value={s.id}/>
                    ))}

                </Picker>
            </View>

            <Text> Selecione uma data </Text>
            <TextInput style={style.input} placeholder="YYYY-MM-DD" Value={data} onchangeText={fetchHorarios}/>

            <Text> Escolha um horário disponível </Text>
            <View>
                {horarios.length === 0 &&  <Text>Selecione uma data</Text>}
                {horarios.map(h => (
                    <TouchableOpacity key={h} onPress={() => setHora(h)}>
                    <Text> {h}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity onPress={handleSubmit}>
                <Text> Agendar</Text>
            </TouchableOpacity>

        </ScrollView>
    )

}