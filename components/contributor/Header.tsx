import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';

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

                    <TouchableOpacity style={styles.profileIcon}>
                        <User color={Colors.neutral[10]} size={24} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
    },
    safeArea: {
        gap: 24,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    profileIcon: {
        padding: 4,
    },
});