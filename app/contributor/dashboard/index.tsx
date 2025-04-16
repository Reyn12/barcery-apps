import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/contributor/Header';
import { CariProduk } from '@/components/contributor/CariProduk';
import { CardProduk } from '@/components/contributor/CardProduk';
import { CardTotalInputProduk } from '@/components/contributor/CardTotalInputProduk';

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
  }
});