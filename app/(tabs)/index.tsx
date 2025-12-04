import Form from "@/models/Form";
import SqliteFormDAO from "@/services/SQLiteFormDAO";
import { useEffect, useState } from "react";
import { Button, FlatList, Pressable, Text, TextInput, View } from "react-native";


export default async function Index() {
  const [name, setName] = useState(""); //tipo um GET
  const [age, setAge] = useState("");
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const formDAO = new SqliteFormDAO();

  const newForm: Form = {
    nome: name,
    idade: Number(age),
    ativo: true
  };


  useEffect(() => {
    const carregarDados = async () => {
      const dados = await formDAO.readAll(); // supondo que você crie um método readAll no DAO
      setItems(dados); // setForms é useState para lista de forms
  };

    carregarDados();
  }, []);

  const saveData = () => {
    formDAO.create(newForm)    
  }
  const deleteData = ()=>{
    if(!selectedId){
      return("nenhum item selecionado");
    }
    console.log(selectedId)
    formDAO.delete(selectedId)
  }

  const syncData = () => {
    // aqui você vai bater no backend Django
    // pegar os itens "pendentes" do SQLite
    // enviar via POST
    // e marcar como sincronizados
    console.log("Função de sync pronta pra integrar com Django 💙");
  };
  
  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Cadastro Local
      </Text>

      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8
        }}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8
        }}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={saveData} />
      <Button title="Deletar" onPress={deleteData} />
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        Registros salvos:
      </Text>
        
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedId;

          return (
            <Pressable onPress={() => setSelectedId(item.id)}>
              <View
                style={{
                  padding: 12,
                  marginVertical: 6,
                  borderRadius: 8,
                  backgroundColor: isSelected ? "#cce5ff" : "#fff",
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? "#3399ff" : "#ccc",
                }}
              >
                <Text
                  style={{
                    fontWeight: isSelected ? "bold" : "normal",
                    color: isSelected ? "#0056b3" : "#333",
                  }}
                >
                  {item.name} — {item.age} anos
                </Text>
              </View>
            </Pressable>
          );
        }}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Sincronizar com servidor" onPress={syncData} />
      </View>
    </View>
  );
}
