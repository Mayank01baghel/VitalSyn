import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {isAuthenticated ? (
        <DashboardScreen />
      ) : (
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
