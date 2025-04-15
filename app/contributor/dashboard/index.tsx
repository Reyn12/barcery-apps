import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/contributor/Header';
import { CariProduk } from '@/components/contributor/CariProduk';
import { CardProduk } from '@/components/contributor/CardProduk';

export default function DashboardScreen() {
  return (
    <>
      <Header />
      <View style={styles.mainContent}>
        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <CariProduk />
          <CardProduk />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 8,
    marginTop: -40,
    flex: 1,
    width: '100%',
    // Shadow untuk iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Shadow untuk Android
    elevation: 5,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  }
});