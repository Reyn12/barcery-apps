import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Weight, UtensilsCrossed } from "lucide-react-native";
import { Colors } from '../constants/Colors'
import { InformasiGizi } from "../components/detailProduk/InformasiGizi";
import { KomposisiProduk } from "../components/detailProduk/KomposisiProduk";
import { InformasiProdusen } from "../components/detailProduk/InformasiProdusen";
import { Sertifikasi } from "@/components/detailProduk/Sertifikasi";
import { Afiliation } from "../components/detailProduk/Afiliation";
import { router } from "expo-router";

export default function DetailProduk() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    
    // Simulasi fetch data
    setTimeout(() => {
      // Di sini nanti bisa panggil API untuk refresh data produk
      console.log('Refreshing data produk...');
      setRefreshing(false);
    }, 1000);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Produk</Text>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
            title="Memuat ulang..."
            titleColor={Colors.neutral[70]}
          />
        }
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/images/products/dancowSusu.png')} 
            style={styles.productImage} 
            resizeMode="contain"
          />
        </View>
        
        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>DANCOW FortiGro Full Cream 780 gr</Text>
          <Text style={styles.productVariant}>Variasi : Full Cream</Text>
          
          <View style={styles.detailsRow}>
            {/* Weight */}
            <View style={styles.detailBox1}>
              <Weight size={24} color="#3498db" />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Berat Bersih</Text>
                <Text style={styles.detailValue}>780gr</Text>
              </View>
            </View>
            
            {/* Serving */}
            <View style={styles.detailBox2}>
              <UtensilsCrossed size={24} color="#e74c3c" />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Jmlh Persajian</Text>
                <Text style={styles.detailValue}>31</Text>
              </View>
            </View>
          </View>
          
          {/* Afiliasi */}
          <Afiliation />

          {/* Informasi Gizi */}
          <InformasiGizi />
          
          {/* Komposisi Produk */}
          <KomposisiProduk />
          
          {/* Informasi Produsen */}
          <InformasiProdusen />
          
          {/* Sertifikasi */}
          <Sertifikasi />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '80%',
    height: 300,
  },
  infoContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productVariant: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailBox1: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#9DD9FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginHorizontal: 6,
  },
  detailTextContainer: {
    flexDirection: 'column',
  },
  detailBox2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.danger[30],
    borderRadius: 12,
    padding: 16,
    gap: 20,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#17171F',
    marginTop: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  }
});