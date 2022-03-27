import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { ThemeProvider } from 'styled-components/native';
import { THEME } from './src/theme';
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/auth';
import { ExpenseProvider } from './src/contexts/expense';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={THEME}>
      <AuthProvider >
        <ExpenseProvider>
          <Routes />
          <StatusBar style="auto" />
        </ExpenseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}