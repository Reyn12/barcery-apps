import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function WelcomeScreen() {
  return (
  <View style={styles.container}>
  
  <View style={styles.content}>
    <Image 
      source={require('../../assets/images/contributor/logoWelcomeContributor.png')}
      style={styles.image}
      resizeMode="contain"
    />
    
    <Text style={styles.title}>Cek Produk Secara{'\n'}Detail dan Teliti</Text>
    
    <Text style={styles.description}>
      Cek informasi produk, mulai dari gizi,{'\n'}
      sertifikasi, hingga afiliasi dengan Barcery.{'\n'}
      Yuk, lebih teliti dalam memilih produk
    </Text>

    <Text style={styles.terms}>Syarat dan Ketentuan</Text>
  </View>

  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={() => router.push('/contributor/auth/login')}>
      <Text style={styles.buttonText}>Mulai</Text>
    </TouchableOpacity>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '80%',
    height: 300,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.neutral[100],
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.neutral[70],
    textAlign: 'center',
    lineHeight: 24,
  },
  terms: {
    color: Colors.primary,
    fontSize: 14,
    marginBottom: 30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  
});