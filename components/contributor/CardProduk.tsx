import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Pencil, Trash2 } from 'lucide-react-native';

// Data produk untuk di-mapping
const productData = [
  {
    id: 1,
    status: 'in-check',
    statusText: 'In-check',
    statusStyle: (styles: { inCheckText: any; }) => styles.inCheckText,
    name: 'Koko Krunch',
    image: require('@/assets/images/contributor/kokoCrunch.png')
  },
  {
    id: 2,
    status: 'published',
    statusText: 'Published',
    statusStyle: (styles: { publishText: any; }) => styles.publishText,
    name: 'Oreo Biskuit',
    image: require('@/assets/images/contributor/kokoCrunch.png') // Ganti dengan gambar yang sesuai
  },
  {
    id: 3,
    status: 'in-check',
    statusText: 'In-check',
    statusStyle: (styles: { inCheckText: any; }) => styles.inCheckText,
    name: 'Chitato',
    image: require('@/assets/images/contributor/kokoCrunch.png') // Ganti dengan gambar yang sesuai
  },
  {
    id: 4,
    status: 'published',
    statusText: 'Published',
    statusStyle: (styles: { publishText: any; }) => styles.publishText,
    name: 'Pocky',
    image: require('@/assets/images/contributor/kokoCrunch.png') // Ganti dengan gambar yang sesuai
  }
];

export const CardProduk = () => {
  return (
    <View style={styles.container}>
      {productData.map(product => (
        <View key={product.id} style={[styles.card, product.id > 1 && styles.marginTop]}>
          <Text style={product.statusStyle(styles)}>{product.statusText}</Text>
          
          <View style={styles.cardContent}>
            <Image 
              source={product.image} 
              style={styles.productImage} 
            />
            
            <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">{product.name}</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <Pencil size={24} color="#006837" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconButton}>
                <Trash2 size={24} color="#E30613" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  marginTop: {
    marginTop: 16,
  },
  inCheckText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF9800',
    padding: 16,
  },
  publishText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4CAF50',
    padding: 16,
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'relative',
    height: 112, // Tetapkan tinggi yang konsisten
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    maxWidth: 120,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 17,
    position: 'absolute',
    right: 16,
    top: 16,
  },
  iconButton: {
    padding: 4,
  },
  detailButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  detailText: {
    color: '#006837',
    fontSize: 16,
    fontWeight: '500',
  },
});