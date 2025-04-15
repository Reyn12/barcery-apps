import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Search, ChevronDown } from 'lucide-react-native';

export const CariProduk = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search color={Colors.neutral[50]} size={24} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Product"
          placeholderTextColor={Colors.neutral[50]}
        />
      </View>

      <View style={styles.entriesContainer}>
        <Text style={styles.showText}>Show</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>5</Text>
          <ChevronDown size={16} color={Colors.neutral[70]} />
        </View>
        <Text style={styles.entriesText}>Entries</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[30],
    borderRadius: 8,
    paddingHorizontal: 12,
    flex: 1,
    height: 48,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: Colors.neutral[90],
  },
  entriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  showText: {
    fontSize: 14,
    color: Colors.neutral[70],
    marginRight: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[30],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    minWidth: 60,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 14,
    color: Colors.neutral[90],
    marginRight: 8,
  },
  entriesText: {
    fontSize: 14,
    color: Colors.neutral[70],
    marginLeft: 8,
  }
});