import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { MapPin, Mail, Globe, Phone } from 'lucide-react-native'

export function InformasiProdusen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informasi Produsen dan Importir</Text>
      
      <Text style={styles.subTitle}>Diproduksi oleh: PT Nestlé Indonesia</Text>
      <View style={styles.infoRow}>
        <MapPin size={18} color={Colors.primary} />
        <Text style={styles.infoText}>
          Perkantoran Hijau Arkadia, Tower B, Lantai 5{'\n'}
          Jln. Letjen. T. B. Simatupang Kav. 88, Jakarta Selatan 12520, Indonesia
        </Text>
      </View>
      
      <Text style={styles.subTitle}>Diimport oleh: PT Nestlé Indonesia</Text>
      <View style={styles.infoRow}>
        <MapPin size={18} color={Colors.primary} />
        <Text style={styles.infoText}>
          Perkantoran Hijau Arkadia, Tower B, Lantai 5{'\n'}
          Jln. Letjen. T. B. Simatupang Kav. 88, Jakarta Selatan 12520, Indonesia
        </Text>
      </View>
      
      <View style={styles.infoRow}>
        <Mail size={18} color={Colors.primary} />
        <Text style={styles.infoText}>dancow.parentingcenter@id.nestle.com</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Globe size={18} color={Colors.primary} />
        <Text style={styles.infoText}>dancow.co.id</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Phone size={18} color={Colors.primary} />
        <Text style={styles.infoText}>080018-21028</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[10],
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.neutral[90],
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  }
})