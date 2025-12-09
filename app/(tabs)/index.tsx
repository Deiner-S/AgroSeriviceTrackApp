import Form from "@/models/Form";
import SqliteFormDAO from "@/services/SQLiteFormDAO";
import { useEffect, useState } from "react";
import { Button, FlatList, Pressable, Text, TextInput, View } from "react-native";




export default function Index() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [items, setItems] = useState<Form[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formDAO, setFormDAO] = useState<SqliteFormDAO | null>(null);
  useEffect(() => {
    async function init() {
      const dao = await SqliteFormDAO.build();
      setFormDAO(dao);

      const rows = await dao.readAll();
      setItems(rows);
    }    
    init();
  }, []);

  const saveData = async () => {
    if (!formDAO) return;
    await formDAO.create({
      name: name,
      age: Number(age),
      sinc: 0
    });

    const rows = await formDAO.readAll();
    setItems(rows);
  };

  const updateData = async () => {
    if (!formDAO || !selectedId) return;
    await formDAO.update(
      selectedId,{
      name: name,
      age: Number(age),
      sinc: 0
    })
    const rows = await formDAO.readAll();
    setItems(rows);
  }
  
  const deleteData = async () => {
    if (!formDAO || !selectedId) return;

    await formDAO.delete(selectedId);

    const rows = await formDAO.readAll();
    setItems(rows);
  };

  const sincData = async () => {
    if (!formDAO) return;
    const rows = await formDAO.readAll();
    for (const row of rows) {
      if(row.sinc === 0){
        console.log("Registros:", JSON.stringify(row, null, 2));
        /*

        try {
          const { sinc,id, ...payload } = row;
          const response = await fetch("http://10.0.2.2:8000/api/people/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            
            body: JSON.stringify(payload),
          });
          console.log("response")
          if (!response.ok) {
            console.error("Erro ao sincronizar:", row.id);
            continue; 
          }*/

          row.sinc = 1
          await formDAO.update(Number(row.id), row);
          console.log(`Registro ${row.id} sincronizado com sucesso!`);
          const rows = await formDAO.readAll();
          setItems(rows);
          /*
        }catch (error) {
          console.error("Falha na requisição:", error);
        }*/

      }

    };
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Cadastro Local
      </Text>

      <TextInput
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={saveData} />
      <Button title="Atualizar" onPress={updateData} />
      <Button title="Deletar" onPress={deleteData} />
      <Button title="Sincronizar" onPress={sincData} />
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        Registros salvos:
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedId;

          return (
            <Pressable onPress={() => setSelectedId(item.id!)}>
              <View style={{
                padding: 12,
                marginVertical: 6,
                borderRadius: 8,
                backgroundColor: isSelected ? "#cce5ff" : "#fff",
                borderWidth: isSelected ? 2 : 1,
                borderColor: isSelected ? "#3399ff" : "#ccc",
              }}>
                <Text style={{
                  fontWeight: isSelected ? "bold" : "normal",
                  color: isSelected ? "#0056b3" : "#333",
                }}>
                  {item.name} — {item.age} anos - {item.sinc}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
