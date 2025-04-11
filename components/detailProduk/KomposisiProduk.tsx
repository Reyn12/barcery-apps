import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export function KomposisiProduk() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Komposisi</Text>
      <Text style={styles.content}>
        Padatan susu (susu sapi, susu bubuk bubuk skim, lemak susu, laktosa), 3 mineral, pengemulsi lesitin kedelai, premiks vitamin.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[10],
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: Colors.neutral[90],
    lineHeight: 20,
  }
})