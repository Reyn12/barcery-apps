import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Briefcase } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Header() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topSection}>
                    <View style={styles.greetingContainer}>
                        <Image
                            source={require('@/assets/images/contributor/avatarLogo.png')}
                            style={styles.profileImage}
                        />
                        <View style={styles.nameContainer}>
                            <Text style={styles.hello}>Hello, Wulan</Text>
                            <Text style={styles.welcome}>Welcome back</Text>
                        </View>
                    </View>
                </View>

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
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingBottom: 35,
    },
    safeArea: {
        gap: 24,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 16,
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    nameContainer: {
        flexDirection: 'column',
        marginLeft: 12,
        gap: 4,
    },
    hello: {
        fontSize: 14,
        color: Colors.neutral[10],
    },
    welcome: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.neutral[10],
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
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