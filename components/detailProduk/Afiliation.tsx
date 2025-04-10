import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export function Afiliation() {
  return (
    <View style={styles.affiliationSection}>
      <Text style={styles.sectionTitle}>Afiliasi</Text>
      
      <View style={styles.affiliationRow}>
        {/* Israel */}
        <View style={styles.affiliationItem}>
          <View style={styles.flagContainer}>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1200px-Flag_of_Israel.svg.png' }} 
              style={styles.flagImage} 
            />
            <View style={styles.crossLine} />
          </View>
          <Text style={styles.affiliationLabel}>Israel</Text>
          <Text style={styles.affiliationStatus}>Terafiliasi</Text>
        </View>
        
        {/* LGBT */}
        <View style={styles.affiliationItem}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/1200px-Gay_Pride_Flag.svg.png' }} 
            style={styles.flagImage} 
          />
          <Text style={styles.affiliationLabel}>LGBT</Text>
          <Text style={styles.affiliationStatus}>Terafiliasi</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  affiliationSection: {
    backgroundColor: Colors.neutral[10],
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  affiliationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  affiliationItem: {
    alignItems: 'center',
    width: '48%',
  },
  flagContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  crossLine: {
    position: 'absolute',
    width: '140%',
    height: 3,
    backgroundColor: 'red',
    transform: [{ rotate: '45deg' }],
  },
  affiliationLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  affiliationStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
})