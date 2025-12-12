import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

interface ChecklistStateItem {
  id: number;
  selected: string | null;
  photoUri: string | null;
}

export default function useCheckListController(){

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [chassi, setChassi] = useState("");
    const [orimento, setOrimento] = useState("");
    const [modelo, setModelo] = useState("");

    const [checklistState, setChecklistState] = useState<ChecklistStateItem[]>([
      { id: 1, selected: null, photoUri: null },
      { id: 2, selected: null, photoUri: null },
      { id: 3, selected: null, photoUri: null },
      { id: 4, selected: null, photoUri: null },
    ]);
    
    function setItemSelected(id: number, value: string | null) {
      setChecklistState(prev =>
        prev.map(item =>
          item.id === id ? { ...item, selected: value } : item
        )
      );
    }

    function setItemPhotoUri(id: number, uri: string) {
      setChecklistState(prev =>
        prev.map(item =>
          item.id === id ? { ...item, photoUri: uri } : item
        )
      );
    }


    const operation_code = "OS-45872";
    const symptoms = "Equipamento não liga ao pressionar o botão.";
    const client = "Empresa Atlas Tecnologia – Unidade SP";
    const saveData = () => {
      console.log('Salvo')
    }


  function onChange(_event: any, selectedDate?: Date) {
    setOpen(false);
    if (selectedDate) setDate(selectedDate);
  }

  const takePhoto = async (itemID:number) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permission.granted) return alert("Permita acesso à câmera.");
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });

    if (!result.canceled)
      setItemPhotoUri(itemID, result.assets[0].uri);
  }

  const checklistItems = [
    { id: 1, name: "LIMPEZA" },
    { id: 2, name: "PNEU F/D"},
    { id: 3, name: "PNEU F/E" },
    { id: 4, name: "PNEU T/D" },
    { id: 5, name: "PNEU F/E" },
    { id: 6, name: "CABINE" },
    { id: 7, name: "PARALAMA T/D" },
    { id: 8, name: "PARALAMA T/E" },
    { id: 9, name: "PARALAMA D/D" },
    { id: 10, name: "PARALAMA D/E" },
    { id: 11, name: "CAPÔ L/D" },
    { id: 12, name: "CAPÔ L/F" },
    { id: 13, name: "CAPÔ CIMA" },
    { id: 14, name: "VAZAMENTO MOTOR" },
    { id: 15, name: "VAZAMENTO TRANSMISÃO" },
    { id: 16, name: "FAROL DIANTEIRO CAPÔ" },
    { id: 17, name: "FAROL LATERAL D/CAPÔ" },
    { id: 18, name: "FAROL LATERAL E/CAPÔ" },
    { id: 19, name: "CONTRA PESO DIANTEIRO" },
    { id: 20, name: "CONTRA PESO TRASEIRO L/D" },
    { id: 21, name: "CONTRA PESO TRASEIRO L/E" },
    { id: 22, name: "PINO LEVANTE HIDRAULICO L/D" },
    { id: 23, name: "PINO LEVANTE HIDRAULICO L/E" },
    { id: 24, name: "PINO BARRA DE TRAÇÃO" },
    { id: 25, name: "PINO BARRA DE TRAÇÃO L/D" },
    { id: 26, name: "PINO BARRA DE TRAÇÃO L/E" },
    { id: 27, name: "TECLAS CABINE" },
    { id: 28, name: "PORTA L/D" },
    { id: 29, name: "PORTA L/E" },
    { id: 30, name: "PORTA LATERAL L/D" },
    { id: 31, name: "PORTA LATERAL L/E" },
    { id: 32, name: "PORTA TRASEIRA" },
    { id: 33, name: "PAINEL" },
    { id: 34, name: "BOZINA" },
    { id: 35, name: "LUZ ALTA" },
    { id: 36, name: "LUZ BAIXA" },
    { id: 37, name: "SETA F/D" },
    { id: 38, name: "SETA F/E" },
    { id: 39, name: "SETA T/D" },
    { id: 40, name: "SETA T/E" },
    { id: 41, name: "PISCA ALERTA" },    
  ];

  return{
    date, setDate,open, setOpen,
    chassi, setChassi,orimento, setOrimento,
    modelo, setModelo, checklistState, setChecklistState,
    setItemSelected, setItemPhotoUri,operation_code, 
    symptoms,client,saveData,onChange,takePhoto, checklistItems
  }


}