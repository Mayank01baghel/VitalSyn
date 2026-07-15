import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HealthCard from '../components/HealthCard';

export default function DashboardScreen() {
  // Stub data
  const metrics = [
    { id: '1', title: 'Steps', value: '8,432', unit: 'steps' },
    { id: '2', title: 'Heart Rate', value: '72', unit: 'bpm' },
    { id: '3', title: 'Sleep', value: '7.2', unit: 'hrs' },
    { id: '4', title: 'Hydration', value: '1.5', unit: 'L' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>VitalSync Dashboard</Text>
      <View style={styles.grid}>
        {metrics.map((m) => (
          <HealthCard key={m.id} title={m.title} value={m.value} unit={m.unit} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
