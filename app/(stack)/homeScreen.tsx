import OsCard from '@/components/homeComponents/orderBox';
import { useSync } from '@/contexts/syncContext';
import useHomeHook, { WORK_ORDER_STATUS_OPTIONS } from '@/hooks/homeHook';
import React, { useMemo, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { workOrders, selectedStatus, setSelectedStatus, reload } = useHomeHook();
  const { lastSyncAt } = useSync();

  useEffect(() => {
    if (lastSyncAt) {
      reload();
    }
  }, [lastSyncAt]);

  const filteredOrders = useMemo(() => {
    if (selectedStatus === "all") return workOrders;
    return workOrders.filter((item) => item.status === selectedStatus);
  }, [workOrders, selectedStatus]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} edges={['left', 'right', 'bottom']}>
      <ScrollView
        horizontal
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
        showsHorizontalScrollIndicator={false}
      >
        {WORK_ORDER_STATUS_OPTIONS.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => setSelectedStatus(opt.value)}
            style={[
              styles.filterChip,
              selectedStatus === opt.value && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedStatus === opt.value && styles.filterChipTextActive,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}

      </ScrollView>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {filteredOrders.map((item) => (
          <OsCard key={item.operation_code} item={item} /> 
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    maxHeight: 48,
    backgroundColor: '#25292e',
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#3a3f45',
  },
  filterChipActive: {
    backgroundColor: '#0a7ea4',
  },
  filterChipText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
