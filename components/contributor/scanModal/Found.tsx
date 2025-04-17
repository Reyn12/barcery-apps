import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

interface FoundProps {
  visible: boolean;
  onClose: () => void;
  barcode: string;
}

export function Found({ visible, onClose, barcode }: FoundProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image 
            source={require('@/assets/icons/logoProductAda.png')} 
            style={styles.icon} 
          />
          
          <Text style={styles.modalTitle}>
            Data Barang Sudah Ada
          </Text>
          
          <Text style={styles.modalText}>
            Produk dengan barcode {barcode} sudah ada di database. Kamu tidak bisa menambahkan barang yang sama lagi
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  button: {
    backgroundColor: Colors.primary[50],
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});