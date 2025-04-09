import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { X } from 'lucide-react-native'
import { Colors } from '../constants/Colors'


interface ProductNotFoundProps {
  visible: boolean;
  barcode: string;
  onClose: () => void;
}

export function ProductNotFound({ visible, barcode, onClose }: ProductNotFoundProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Icon X dalam persegi dengan lingkaran merah di dalam */}
          <View style={styles.iconSquare}>
            <View style={styles.iconContainer}>
              <X size={24} color="white" />
            </View>
          </View>
          
          {/* Judul */}
          <Text style={styles.title}>Produk Tidak Ditemukan</Text>
          
          {/* Deskripsi */}
          <Text style={styles.description}>
            Produk dengan barcode {barcode} tidak ditemukan.
          </Text>
          
          {/* Garis pemisah */}
          <View style={styles.divider} />
          
          {/* Tombol kembali ke scan */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Kembali ke Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconSquare: {
    width: 64,
    height: 64,
    backgroundColor: Colors.danger[20],
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.danger[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#17171F',
  },
  description: {
    fontSize: 14,
    color: Colors.gray[100],
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});