import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Flashlight, Settings, Camera as CameraIcon, ArrowLeft } from 'lucide-react-native'
import { StatusBar } from "expo-status-bar"
import { CameraView, Camera } from 'expo-camera'
import { Product } from '@/types/product';
import productsData from '@/data/products.json';
import { ProductNotFound } from '@/components/ProductNotFound';
import { ProductFound } from '@/components/ProductFound';
import { Colors } from '@/constants/Colors';
import { useFocusEffect, router } from 'expo-router';
import { Found } from '@/components/contributor/scanModal/Found';
import { NotFound } from '@/components/contributor/scanModal/NotFound';

// Fungsi untuk mencari produk berdasarkan barcode
const findProductByBarcode = (barcode: string): Product | undefined => {
    return productsData.find(product => product.barcode === barcode);
};

export default function ScanQRScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [scanned, setScanned] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);
    const [flashOn, setFlashOn] = useState(false);
    const [flashInitialized, setFlashInitialized] = useState(false);
    const [showNotFoundModal, setShowNotFoundModal] = useState(false);
    const [showProductFoundModal, setShowProductFoundModal] = useState(false);
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
            if (!foundProduct && !showNotFoundModal && !showProductFoundModal) {
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
        }, [foundProduct, showNotFoundModal, showProductFoundModal])
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
                // Produk ditemukan - tampilkan modal bahwa produk sudah ada
                setFoundProduct(product);
                setShowProductFoundModal(true);
                setFrameColor(Colors.danger[50]);
            } else {
                // Produk tidak ditemukan - tampilkan NotFound
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

    const handleAddProduct = () => {
        // Tutup modal
        setShowNotFoundModal(false);
        setFrameColor('white');
        setIsScanning(false);

        // Navigasi ke halaman tambah produk dengan membawa barcode
        // router.push({
        //   pathname: '/contributor/dashboard/add-product',
        //   params: { barcode: scannedBarcode }
        // });
    };

    const handleCloseProductFoundModal = () => {
        setShowProductFoundModal(false);
        setFoundProduct(null);
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
                    onCameraReady={() => {
                        setCameraReady(true);
                    }}
                    enableTorch={flashOn}
                >
                    <SafeAreaView style={styles.overlayContainer}>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => router.back()}>
                                <ArrowLeft size={24} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={navigateToSettings}
                            >
                                <Settings color="white" size={20} />
                            </TouchableOpacity>
                        </View>

                        {/* Instruction Text */}
                        <View style={styles.instructionContainer}>
                            <Text style={styles.instructionText}>
                                Arahkan kamera ke barcode produk
                            </Text>
                        </View>

                        {/* Scanner Frame */}
                        <View style={[styles.scannerFrame, { borderColor: frameColor }]}>
                            <View style={[styles.corner, styles.topLeft, { borderColor: frameColor }]} />
                            <View style={[styles.corner, styles.topRight, { borderColor: frameColor }]} />
                            <View style={[styles.corner, styles.bottomLeft, { borderColor: frameColor }]} />
                            <View style={[styles.corner, styles.bottomRight, { borderColor: frameColor }]} />

                            {isScanning && (
                                <View style={{
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    padding: 10,
                                    borderRadius: 5
                                }}>
                                    <Text style={{ color: 'white' }}>
                                        {foundProduct ? 'Produk ditemukan!' :
                                            showNotFoundModal ? 'Produk tidak ditemukan' :
                                                'Scanning...'}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Camera Button */}
                        <View style={styles.cameraButtonContainer}>
                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={nyalainFlash}
                            >
                                <Flashlight color="white" size={30} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </CameraView>

                {/* Product Not Found Modal */}
                {showNotFoundModal && (
                    <NotFound
                        barcode={scannedBarcode}
                        onClose={handleCloseNotFoundModal}
                        visible={showNotFoundModal}
                        onAddProduct={handleAddProduct}
                    />
                )}

                {/* Product Already Exists Modal */}
                {showProductFoundModal && foundProduct && (
                    <Found
                        visible={showProductFoundModal}
                        onClose={handleCloseProductFoundModal}
                        barcode={scannedBarcode}
                    />
                )}

                {/* Product Found Modal */}
                {foundProduct && !showProductFoundModal && (
                    <ProductFound
                        product={foundProduct}
                        onReset={handleResetScanner}
                    />
                )}
            </View>
        </>
    );
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
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(100,100,100,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
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