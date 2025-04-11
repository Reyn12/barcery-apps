import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

interface BerhasilSimpanDataProps {
  visible: boolean;
  onClose: () => void;
}

const BerhasilSimpanData: React.FC<BerhasilSimpanDataProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Ikon Centang dengan lingkaran biru dan kotak biru muda */}
          <View style={styles.iconOuterContainer}>
            <View style={styles.iconContainer}>
              <Check size={28} color="white" />
            </View>
          </View>
          
          {/* Judul */}
          <Text style={styles.title}>Berhasil simpan data</Text>
          
          {/* Deskripsi */}
          <Text style={styles.description}>
            Pengaturan telah berhasil disimpan. Kami akan memberitahumu jika ada produk yang melebihi batas atau mengandung alergen
          </Text>
          
          {/* Tombol OK */}
          <TouchableOpacity 
            style={styles.okButton}
            onPress={onClose}
          >
            <Text style={styles.okButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconOuterContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: Colors.information[20], // Warna biru muda untuk kotak luar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // Lingkaran sempurna
    backgroundColor: Colors.information[50], // Warna biru untuk lingkaran dalam
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: Colors.neutral[70],
    lineHeight: 20,
  },
  okButton: {
    backgroundColor: '#1B7A4D', // Warna hijau seperti pada gambar
    width: '80%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BerhasilSimpanData;