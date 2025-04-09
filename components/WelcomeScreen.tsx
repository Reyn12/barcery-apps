import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from "expo-status-bar";

import React from 'react'
import { Colors } from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

interface WelcomeScreenProps {
    onMulaiPress?: () => void;
}

export function WelcomeScreen({ onMulaiPress }: WelcomeScreenProps) {
    return (
        <>
            <StatusBar style="dark" />

            <SafeAreaView style={styles.container}>
                {/* Logo */}
                <View style={styles.card}>
                    <Image
                        source={require('../assets/images/logoScan.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Barcherry</Text>
                </View>

                {/* Deskripsi */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Cek Produk Secara Detail dan Teliti</Text>
                    <Text style={styles.infoDescription}>
                        Cek informasi produk, mulai dari gizi, sertifikasi, hingga afiliasi dengan Barcery.
                        Yuk, lebih teliti dalam memilih produk
                    </Text>
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={onMulaiPress}
                >
                    <Text style={styles.buttonText}>Mulai</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Neutral[10],
        padding: 20,
    },
    card: {
        backgroundColor: Colors.Neutral,
        borderRadius: 16,
        padding: 24,
        paddingVertical: 100,
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 40,
    },
    logo: {
        width: 110,
        height: 111,
    },
    title: {
        fontSize: 36,
        fontWeight: 'medium',
        color: Colors.primary,
        marginBottom: 24,
        lineHeight: 48,
    },
    infoContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    infoTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginHorizontal: 40,
        color: '#17171F',
        lineHeight: 32,
    },
    infoDescription: {
        fontSize: 16,
        textAlign: 'center',
        color: '#17171F',
        lineHeight: 18,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#1B6B46', // Warna hijau dari gambar
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        marginTop: 60,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default WelcomeScreen;