import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { ScanScreen } from "../components/ScanScreen";
import { StatusBar } from "expo-status-bar";
import DetailProduk from "./detail";


export default function Index() {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomeScreen onMulaiPress={() => setShowWelcome(false)} />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <ScanScreen />
      <DetailProduk />
    </>
  );
}

const styles = StyleSheet.create({
});