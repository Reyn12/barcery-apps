import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Flashlight, Settings, Camera as CameraIcon } from 'lucide-react-native'
import { StatusBar } from "expo-status-bar"
import { CameraView, Camera } from 'expo-camera'
import { useRef } from 'react'
import { Product } from '../types/product';
import productsData from '../data/products.json';
import { ProductNotFound } from './ProductNotFound';
import { ProductFound } from './ProductFound';
import { Colors } from '../constants/Colors';
import { useFocusEffect, router } from 'expo-router';

// Fungsi untuk mencari produk berdasarkan barcode
const findProductByBarcode = (barcode: string): Product | undefined => {
  return productsData.find(product => product.barcode === barcode);
};

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
  const [frameColor, setFrameColor] = useState('white'); 
  const [isScanning, setIsScanning] = useState(false);
  const [isScreenFocused, setIsScreenFocused] = useState(false);
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
      
      setFlashOn(true);

      // Matiin flash after 500ms
      const timer = setTimeout(() => {
        setFlashOn(false);
        setFlashInitialized(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [cameraReady, flashInitialized]);

  // Aktifkan scanner kembali saat kembali ke layar ini
  useFocusEffect(
    React.useCallback(() => {
      // Saat layar mendapatkan fokus (user kembali ke layar ini)
      console.log('ScanScreen mendapatkan fokus');
      
      // Set flag bahwa layar baru saja mendapatkan fokus
      setIsScreenFocused(true);
      
      // Hanya aktifkan scanner jika tidak ada produk yang ditemukan dan modal not found tidak tampil
      if (!foundProduct && !showNotFoundModal) {
        console.log('Mengaktifkan scanner kembali...');
        // Pastikan scanner diaktifkan
        setTimeout(() => {
          setScanned(false);
        }, 500);
      }
      
      return () => {
        // Saat layar kehilangan fokus, reset flag
        setIsScreenFocused(false);
      };
    }, [foundProduct, showNotFoundModal])
  );

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    // Jika layar baru saja mendapatkan fokus, abaikan scan pertama
    // Ini mencegah scan yang tidak diinginkan saat kembali dari halaman detail
    if (isScreenFocused) {
      setIsScreenFocused(false);
      return;
    }
    
    // Nonaktifkan scanner untuk mencegah multiple scan
    setScanned(true);
    setScannedBarcode(data);
    setIsScanning(true);

    // Cari produk dari barcode
    const product = findProductByBarcode(data);
    
    // Tambahkan jeda 1 detik biar tulisan "Scanning..." keliatan
    setTimeout(() => {
      if (product) {
        // Produk ditemukan
        setFoundProduct(product);
        setFrameColor(Colors.success[50]); 
      } else {
        // Produk tidak ditemukan
        setShowNotFoundModal(true);
        setFrameColor(Colors.danger[50]);
      }
    }, 1000); 
  };

  const handleCloseNotFoundModal = () => {
    setShowNotFoundModal(false);
    setFrameColor('white');
    setIsScanning(false);

    // Aktifkan scanner lagi abis modal ditutup
    setTimeout(() => setScanned(false), 500);
  };

  // Reset untuk navigasi ke halaman detail
  const resetForNavigation = () => {
    // Reset state tapi jangan aktifkan scanner
    setFoundProduct(null);
    setFrameColor('white');
    setIsScanning(false);
    // Tetap biarkan scanned = true agar scanner tidak aktif
  };

  // Navigasi ke halaman setting
  const navigateToSettings = () => {
    // Matikan scanner saat navigasi ke setting
    setScanned(true);
    // Reset state lainnya
    setFoundProduct(null);
    setFrameColor('white');
    setIsScanning(false);
    // Navigasi ke halaman setting
    router.push('/setting');
  };

  const handleResetScanner = () => {
    // Reset scanner untuk scan baru
    setFoundProduct(null);
    setFrameColor('white'); // Reset warna frame ke putih
    setIsScanning(false); // Reset status scanning
    setTimeout(() => setScanned(false), 500);
  };

  const nyalainFlash = async () => {
    try {
      // Jika kamera masih dalam proses inisialisasi, jangan lakukan apa-apa
      if (isInitializing) {
        return;
      }
      
      // Jika flash belum diinisialisasi, jangan lakukan apa-apa
      if (!flashInitialized) {
        return;
      }
      
      // Pastikan kamera sudah siap sebelum mengubah flash
      if (!cameraReady) {
        return;
      }
      
      // Toggle flash state dengan delay kecil
      setTimeout(() => {
        const newFlashMode = !flashOn;
        setFlashOn(newFlashMode);
      }, 100);
    } catch (error) {
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
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={navigateToSettings}
            >
              <Settings size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Tampilin klo gaada ada modal/product found */}
          {!showNotFoundModal && !foundProduct ? (
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                {isScanning ? "Scanning..." : "Arahkan kamera ke barcode"}
              </Text>
            </View>
          ) : (
            // Placeholder kosong 
            <View style={[styles.instructionContainer, { marginBottom: 40 }]} />
          )}

          {/* Frame scanner */}
          <View style={styles.scannerFrame}>
            <View style={[styles.corner, styles.topLeft, { borderColor: frameColor }]} />
            <View style={[styles.corner, styles.topRight, { borderColor: frameColor }]} />
            <View style={[styles.corner, styles.bottomLeft, { borderColor: frameColor }]} />
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
        
        {/* Modal Produk Ditemukan */}
        {foundProduct && (
          <ProductFound 
            product={foundProduct} 
            onReset={resetForNavigation}
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