import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

interface NotFoundProps {
  visible: boolean;
  onClose: () => void;
  barcode: string;
  onAddProduct: () => void;
}

export function NotFound({ visible, onClose, barcode, onAddProduct }: NotFoundProps) {
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
            source={require('@/assets/icons/logoTambah.png')} 
            style={styles.icon} 
          />
          
          <Text style={styles.modalTitle}>
            Barang Belum Terdaftar
          </Text>
          
          <Text style={styles.modalText}>
            Produk dengan barcode {barcode} belum ada di database. Kamu bisa menambahkan data baru untuk produk ini
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={onAddProduct}
          >
            <Text style={styles.buttonText}>Tambah Data</Text>
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