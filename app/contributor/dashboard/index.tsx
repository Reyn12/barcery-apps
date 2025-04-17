import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/contributor/Header';
import { CariProduk } from '@/components/contributor/CariProduk';
import { CardProduk } from '@/components/contributor/CardProduk';
import { CardTotalInputProduk } from '@/components/contributor/CardTotalInputProduk';
import { QrCode } from 'lucide-react-native'; // Import icon QR Code
import { router } from 'expo-router';


export default function DashboardScreen() {
  return (
    <>
      <View style={styles.containerUtama}>
        <Header />
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <CardTotalInputProduk />
          <View style={styles.mainContent}>
            <CariProduk />
            <CardProduk />
          </View>
        </ScrollView>

        {/* Button QRIS Overlay */}
        <TouchableOpacity
          style={styles.qrisButton}
          onPress={() => router.push('/contributor/dashboard/scan-qr')}
        >
          <QrCode size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerUtama: {
    backgroundColor: Colors.primary,
    flex: 1,
    width: '100%',
  },
  mainContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 8,
    marginTop: -30,
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
  },
  // Style untuk button QRIS
  qrisButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});