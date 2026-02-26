import HeaderOSReadOnly from "@/components/checklistComponents/HeaderOSReadOnly";
import useMaintenanceHook from "@/hooks/maintenanceHook";
import WorkOrder from "@/models/WorkOrder";
import WorkOrderRepository from "@/repository/WorkOrderRepository";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "../routes";

export default function MaintenanceScreen() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { workOrder: workOrderParam } = (route.params ?? {}) as { workOrder: WorkOrder };
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(workOrderParam ?? null);

  useEffect(() => {
    if (!workOrderParam?.operation_code) return;
    let cancelled = false;
    (async () => {
      try {
        const repo = await WorkOrderRepository.build();
        const loaded = await repo.getById(workOrderParam.operation_code);
        if (!cancelled && loaded) setWorkOrder(loaded);
      } catch (_) {
        if (!cancelled && workOrderParam) setWorkOrder(workOrderParam);
      }
    })();
    return () => { cancelled = true; };
  }, [workOrderParam?.operation_code]);

  const displayOrder = workOrder ?? workOrderParam ?? ({} as WorkOrder);
  const { service, setService, saveService, saving } = useMaintenanceHook(displayOrder);


  async function handleSave() {
    try {
      await saveService();
      navigation.navigate(Routes.HOME);
    } catch (error) {
      console.error("Erro ao salvar serviço", error);
    }
  }

  if (!workOrderParam) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Ordem de serviço não informada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderOSReadOnly workOrder={displayOrder} />

        <View style={styles.divider} />

        <Text style={styles.label}>Serviço realizado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descreva o serviço realizado..."
          placeholderTextColor="#8e8e93"
          value={service}
          onChangeText={setService}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Pressable
            onPress={handleSave}
            disabled={saving}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
              saving && styles.submitButtonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>
              {saving ? "Salvando..." : "Salvar"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  errorText: {
    color: "#ccc",
    padding: 24,
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#3a3f45",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#2e3238",
    color: "#fff",
    fontSize: 16,
    minHeight: 120,
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    marginVertical: 12,
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  submitButton: {
    width: "100%",
    maxWidth: 320,
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
