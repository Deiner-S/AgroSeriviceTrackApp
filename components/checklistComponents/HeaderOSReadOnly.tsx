import WorkOrder from "@/models/WorkOrder";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderOSReadOnlyProps {
  workOrder: WorkOrder;
}

function formatDate(value: string | undefined): string {
  if (!value) return "—";
  try {
    const d = new Date(value);
    return isNaN(d.getTime()) ? value : d.toLocaleDateString("pt-BR");
  } catch {
    return value;
  }
}

export default function HeaderOSReadOnly({ workOrder }: HeaderOSReadOnlyProps) {
  return (
    <View style={styles.content}>
      <Text style={styles.label}>Cliente:</Text>
      <Text style={styles.text}>{workOrder.client}</Text>

      <Text style={styles.label}>Ordem de Serviço:</Text>
      <Text style={styles.text}>{workOrder.operation_code}</Text>

      <Text style={styles.label}>Problema relatado:</Text>
      <Text style={styles.text}>{workOrder.symptoms}</Text>

      <Text style={styles.label}>Chassi:</Text>
      <Text style={styles.text}>{workOrder.chassi ?? "—"}</Text>

      <Text style={styles.label}>Horímetro:</Text>
      <Text style={styles.text}>
        {workOrder.horimetro !== undefined && workOrder.horimetro !== null
          ? String(workOrder.horimetro)
          : "—"}
      </Text>

      <Text style={styles.label}>Modelo:</Text>
      <Text style={styles.text}>{workOrder.model ?? "—"}</Text>

      <Text style={styles.label}>Data entrada:</Text>
      <Text style={styles.text}>{formatDate(workOrder.date_in)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    padding: 6,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
    fontSize: 14,
  },
  text: {
    color: "#ccc",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },
});
