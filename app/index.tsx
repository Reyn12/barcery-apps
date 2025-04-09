import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { ScanScreen } from "../components/ScanScreen";
import { StatusBar } from "expo-status-bar";


export default function Index() {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomeScreen onMulaiPress={() => setShowWelcome(false)} />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <ScanScreen />
    </>
  );
}

const styles = StyleSheet.create({
});