import WorkOrder from '@/models/WorkOrder';
import WorkOrderRepository from '@/repository/WorkOrderRepository';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tipagem das rotas do Stack
type StackParamList = {
  Home: undefined;
  Details: { id: number };
};

type HomeScreenNavigationProp =
  NativeStackNavigationProp<StackParamList, 'Home'>;

export default function Index() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {
    async function loadWorkOrders() {
      // Sempre constrói o repository via build()
      // garante que o banco esteja inicializado
      const workOrderRepository = await WorkOrderRepository.build();

      // Busca todas as ordens locais
      const data: WorkOrder[] = await workOrderRepository.getAll();

      setWorkOrders(data);
    }

    loadWorkOrders();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      {/* Container apenas organiza a lista vertical */}
      <View style={styles.container}>
        {workOrders.map(item => (
          <Pressable
            // key é obrigatória em listas
            // usamos operation_code porque é único
            key={item.operation_code}

            onPress={() => navigation.navigate('Details', { id: 42 })}

            //style como função permite efeito visual ao pressionar
            style={({ pressed }) => [
              styles.pressable,
              pressed && styles.pressablePressed,
              pressed && { transform: [{ scale: 0.97 }] }, // efeito "afundar"
            ]}
          >
            {/*  Linha horizontal para separar código e status */}
            <View style={styles.row}>
              {/*  Código da OS destacado como título */}
              <Text style={[styles.text, styles.operationCode]}>
                {item.operation_code}
              </Text>

              {/*Status com cor condicional */}
              <Text
                style={[
                  styles.status,
                  item.status === 'Pendente'
                    ? styles.statusPendente
                    : styles.statusFinalizado,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // Fundo escuro para contraste com os cards
    backgroundColor: '#25292e',

    // Padding cria respiro lateral e superior
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  pressable: {
    // Removido position:absolute
    // agora os cards se empilham naturalmente
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,

    // Espaço entre os cards
    marginBottom: 12,

    // Sombra no Android
    elevation: 4,

    // Sombra no iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  pressablePressed: {
    // Feedback visual ao pressionar
    opacity: 0.85,
  },

  row: {
    // Organiza os textos lado a lado
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    // Cor padrão do texto
    color: '#1c1c1e',
  },

  operationCode: {
    // Destaque visual para o código da OS
    fontSize: 16,
    fontWeight: '600',
  },

  status: {
    // Texto do status um pouco menor
    fontSize: 14,
    fontWeight: '500',
  },

  statusPendente: {
    // Vermelho suave (alerta)
    color: '#e53935',
  },

  statusFinalizado: {
    // Verde suave (ok)
    color: '#43a047',
  },
});
