import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Weight, UtensilsCrossed } from "lucide-react-native";
import { Colors } from '../constants/Colors'
import { InformasiGizi } from "../components/detailProduk/InformasiGizi";

export default function DetailProduk() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Produk</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text style={styles.detailLabel}>Berat Bersih</Text>
              <Text style={styles.detailValue}>780gr</Text>
            </View>
            
            {/* Serving */}
            <View style={styles.detailBox2}>
              <UtensilsCrossed size={24} color="#e74c3c" />
              <Text style={styles.detailLabel}>Jumlah Persajian</Text>
              <Text style={styles.detailValue}>31</Text>
            </View>
          </View>
          
          {/* Informasi Gizi */}
          <InformasiGizi />
          
          {/* Affiliations */}
          <View style={styles.affiliationSection}>
            <Text style={styles.sectionTitle}>Afiliasi</Text>
            
            <View style={styles.affiliationRow}>
              {/* Israel */}
              <View style={styles.affiliationItem}>
                <View style={styles.flagContainer}>
                  <Image 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1200px-Flag_of_Israel.svg.png' }} 
                    style={styles.flagImage} 
                  />
                  <View style={styles.crossLine} />
                </View>
                <Text style={styles.affiliationLabel}>Israel</Text>
                <Text style={styles.affiliationStatus}>Terafiliasi</Text>
              </View>
              
              {/* LGBT */}
              <View style={styles.affiliationItem}>
                <Image 
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/1200px-Gay_Pride_Flag.svg.png' }} 
                  style={styles.flagImage} 
                />
                <Text style={styles.affiliationLabel}>LGBT</Text>
                <Text style={styles.affiliationStatus}>Terafiliasi</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    paddingTop: 50,
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
    backgroundColor: '#9DD9FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  detailBox2: {
    flex: 1,
    backgroundColor: Colors.danger[30],
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  affiliationSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  affiliationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  affiliationItem: {
    alignItems: 'center',
    width: '48%',
  },
  flagContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  crossLine: {
    position: 'absolute',
    width: '140%',
    height: 3,
    backgroundColor: 'red',
    transform: [{ rotate: '45deg' }],
  },
  affiliationLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  affiliationStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});