import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Pencil, Trash2 } from 'lucide-react-native';

export const CardProduk = () => {
  return (
    <View style={styles.container}>
      {/* Card In-check */}
      <View style={styles.card}>
        <Text style={styles.inCheckText}>In-check</Text>
        
        <View style={styles.cardContent}>
          <Image 
            source={require('@/assets/images/contributor/kokoCrunch.png')} 
            style={styles.productImage} 
          />
          
          <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">Koko Krunch</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity>
              <Pencil size={24} color="#006837" />
            </TouchableOpacity>
            
            <TouchableOpacity>
              <Trash2 size={24} color="#E30613" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailText}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Card Publish */}
      <View style={[styles.card, styles.marginTop]}>
        <Text style={styles.publishText}>Publish</Text>
        
        <View style={styles.cardContent}>
          <Image 
            source={require('@/assets/images/contributor/dancow.png')} 
            style={styles.productImage} 
          />
          
          <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">DANCOW FortiGro</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity>
              <Pencil size={24} color="#006837" />
            </TouchableOpacity>
            
            <TouchableOpacity>
              <Trash2 size={24} color="#E30613" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailText}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 12,
    marginLeft: 16,
    maxWidth: 120,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 17,
    marginTop: 16,
    marginLeft: 30,
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