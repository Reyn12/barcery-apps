import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { ChevronRight } from 'lucide-react-native'

export function Sertifikasi() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sertifikasi</Text>
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* BPOM Certificate */}
        <View style={styles.certificateCard}>
          <Image 
            source={require('../../assets/images/detailPage/bpomLogo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.certName}>Sertifikasi BPOM</Text>
          <Text style={styles.certNumber}>MD 802813136007</Text>
          <TouchableOpacity style={styles.navButton}>
            <ChevronRight size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* MUI Certificate */}
        <View style={styles.certificateCard}>
          <Image 
            source={require('../../assets/images/detailPage/muiLogo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.certName}>Sertifikasi MUI</Text>
          <Text style={styles.certNumber}>00040021820902</Text>
          <TouchableOpacity style={styles.navButton}>
            <ChevronRight size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Kemenperdag Certificate */}
        <View style={styles.certificateCard}>
          <Image    
            source={require('../../assets/images/detailPage/kemenperdag.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.certName}>Sertifikasi KMNPRDG</Text>
          <Text style={styles.certNumber}>00040021820903</Text>
          <TouchableOpacity style={styles.navButton}>
            <ChevronRight size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'Colors.neutral[10]',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollViewContent: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  certificateCard: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    position: 'relative',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.neutral[30],
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  certName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  certNumber: {
    fontSize: 12,
    color: Colors.neutral[70],
    textAlign: 'center',
  },
  navButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  }
})