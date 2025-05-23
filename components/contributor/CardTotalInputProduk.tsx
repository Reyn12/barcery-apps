import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';

export function CardTotalInputProduk() {
    return (
        <View style={styles.container}>
            <View style={styles.statsCard}>
                <View style={styles.statsContent}>
                    <View style={styles.statsIcon}>
                        <Image
                            source={require('@/assets/images/contributor/icTas.png')}
                            style={styles.tasIcon}
                        />

                        <Text style={styles.statsLabel}>Total Input Produk</Text>
                    </View>

                    <View style={styles.statsText}>
                        <Text style={styles.statsValue}>200</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 50,
    },
    statsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 60,
    },
    statsIcon: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
    },
    tasIcon: {
        width: 40,
        height: 40,
    },
    statsText: {
        gap: 4,
    },
    statsLabel: {
        fontSize: 16,
        color: Colors.neutral[10],
        marginTop: 4,
    },
    statsValue: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.neutral[10],
    },
});