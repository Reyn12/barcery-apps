import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { UserCircle2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      
      <SafeAreaView style={styles.content}>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('@/assets/images/contributor/avatarLogo.png')}
              style={styles.profileImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.greeting}>Hello, Wulan</Text>
              <Text style={styles.welcomeText}>Welcome back</Text>
            </View>
          </View>
          <TouchableOpacity>
            <UserCircle2 size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});