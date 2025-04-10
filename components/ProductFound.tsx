import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ChevronRight, ImageIcon } from 'lucide-react-native'
import { Product } from '../types/product'
import { router } from 'expo-router'

interface ProductFoundProps {
  product: Product;
  onPress: () => void;
  onReset?: () => void;
}

export function ProductFound({ product, onPress, onReset }: ProductFoundProps) {

  const handleNavigateToDetail = () => {
    router.push('/detail');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleNavigateToDetail}>
        <View style={styles.imageContainer}>
          {product.imageUrl ? (
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <ImageIcon size={32} color="#999" />
              <Text style={styles.placeholderText}>Gambar</Text>
            </View>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          {product.price && (
            <Text style={styles.productPrice}>
              Rp {product.price.toLocaleString('id-ID')}
            </Text>
          )}
        </View>
        
        <ChevronRight size={24} color="#0D7F3F" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#0D7F3F',
    fontWeight: 'bold',
  },
});
