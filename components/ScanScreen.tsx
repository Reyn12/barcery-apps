import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Flashlight, Settings, Camera as CameraIcon } from 'lucide-react-native'
import { StatusBar } from "expo-status-bar"
import { CameraView, Camera } from 'expo-camera'
import { useRef } from 'react'
import { findProductByBarcode, Product } from '../types/product';
import { ProductNotFound } from './ProductNotFound';
import { ProductFound } from './ProductFound';
import { Colors } from '../constants/Colors';

export function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [flashInitialized, setFlashInitialized] = useState(false);
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [foundProduct, setFoundProduct] = useState<Product | null>(null);
  const [frameColor, setFrameColor] = useState('white'); // Default warna frame putih
  const [isScanning, setIsScanning] = useState(false); // State untuk status scanning
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
    
    // Tambahkan timeout untuk memastikan kamera sudah siap
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1500); // Tunggu 1.5 detik
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (cameraReady && !flashInitialized) {
      console.log("Menginisialisasi flash...");
      
      // Nyalakan flash sebentar
      setFlashOn(true);
      
      // Matikan flash setelah 500ms
      const timer = setTimeout(() => {
        setFlashOn(false);
        setFlashInitialized(true);
        console.log("Flash berhasil diinisialisasi");
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [cameraReady, flashInitialized]);

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedBarcode(data);
    setIsScanning(true); // Set status scanning jadi true
    
    // Cari produk berdasarkan barcode
    const product = findProductByBarcode(data);
    
    // Tambahkan jeda 1 detik agar tulisan "Scanning..." terlihat
    setTimeout(() => {
      if (product) {
        // Produk ditemukan, tampilkan komponen ProductFound
        setFoundProduct(product);
        setFrameColor(Colors.success[50]); // Set warna frame jadi hijau
        // Tidak perlu set timeout karena user akan klik tombol untuk scan lagi
      } else {
        // Produk tidak ditemukan, tampilkan modal
        setShowNotFoundModal(true);
        setFrameColor(Colors.danger[50]); // Set warna frame jadi merah
      }
    }, 1000); // Jeda 1 detik
  };

  const handleCloseNotFoundModal = () => {
    setShowNotFoundModal(false);
    setFrameColor('white'); // Reset warna frame ke putih
    setIsScanning(false); // Reset status scanning
    // Aktifkan scanner lagi setelah modal ditutup
    setTimeout(() => setScanned(false), 500);
  };

  const handleProductPress = () => {
    // Di sini bisa navigasi ke halaman detail produk atau lakukan aksi lain
    // Untuk sementara kita hanya reset scanner
    setFoundProduct(null);
    setFrameColor('white'); // Reset warna frame ke putih
    setIsScanning(false); // Reset status scanning
    setTimeout(() => setScanned(false), 500);
  };

  const nyalainFlash = async () => {
    try {
      // Jika kamera masih dalam proses inisialisasi, jangan lakukan apa-apa
      if (isInitializing) {
        console.log("Kamera masih dalam proses inisialisasi, tunggu sebentar...");
        return;
      }
      
      // Jika flash belum diinisialisasi, jangan lakukan apa-apa
      if (!flashInitialized) {
        console.log("Flash belum diinisialisasi, tunggu sebentar...");
        return;
      }
      
      console.log("Status flash sebelum:", flashOn);
      console.log("Status kamera ready:", cameraReady);
      
      // Pastikan kamera sudah siap sebelum mengubah flash
      if (!cameraReady) {
        console.log("Kamera belum siap, menunggu...");
        // Jika kamera belum siap, jangan ubah status flash dulu
        return;
      }
      
      // Toggle flash state dengan delay kecil
      setTimeout(() => {
        const newFlashMode = !flashOn;
        setFlashOn(newFlashMode);
        console.log("Mengubah flash ke:", newFlashMode ? "on" : "off");
      }, 100);
    } catch (error) {
      console.error("Error saat mengaktifkan flash:", error);
      alert('Gagal mengaktifkan flash: ' + error);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={{ color: 'white' }}>Meminta izin kamera...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text style={{ color: 'white' }}>Tidak ada akses ke kamera</Text></View>;
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "code128", "code39", "code93", "upc_e"],
          }}
          enableTorch={flashOn}
          onCameraReady={() => {
            console.log("Kamera siap!");
            setCameraReady(true);
          }}
          />

        <SafeAreaView style={styles.overlayContainer}>
          {/* Header dengan tombol back dan settings */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={nyalainFlash}
            >
              <Flashlight size={24} color={flashOn ? "yellow" : "white"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Text instruksi - tampilkan hanya jika tidak ada modal/product found */}
          {!showNotFoundModal && !foundProduct ? (
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                {isScanning ? "Scanning..." : "Arahkan kamera ke barcode"}
              </Text>
            </View>
          ) : (
            // Placeholder kosong untuk menjaga posisi frame tetap di tengah
            <View style={[styles.instructionContainer, { marginBottom: 40 }]} />
          )}

          {/* Frame scanner */}
          <View style={styles.scannerFrame}>
            {/* Garis sudut kiri atas */}
            <View style={[styles.corner, styles.topLeft, { borderColor: frameColor }]} />
            {/* Garis sudut kanan atas */}
            <View style={[styles.corner, styles.topRight, { borderColor: frameColor }]} />
            {/* Garis sudut kiri bawah */}
            <View style={[styles.corner, styles.bottomLeft, { borderColor: frameColor }]} />
            {/* Garis sudut kanan bawah */}
            <View style={[styles.corner, styles.bottomRight, { borderColor: frameColor }]} />
          </View>

          {/* Tombol kamera di bawah */}
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => setScanned(false)}
            >
              <CameraIcon size={30} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Modal Produk Tidak Ditemukan */}
        <ProductNotFound 
          visible={showNotFoundModal} 
          barcode={scannedBarcode} 
          onClose={handleCloseNotFoundModal} 
        />

        {/* Tampilkan ProductFound jika produk ditemukan */}
        {foundProduct && (
          <ProductFound 
            product={foundProduct} 
            onPress={handleProductPress} 
          />
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(100,100,100,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionContainer: {
    alignItems: 'center',
    marginTop: 70,
  },
  instructionText: {
    color: Colors.neutral[90],
    backgroundColor: Colors.success[30],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 16,
  },
  scannerFrame: {
    width: 280,
    height: 280,
    alignSelf: 'center',
    marginTop: 20,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 6,
    borderRadius: 20,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  cameraButtonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(100,100,100,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
})