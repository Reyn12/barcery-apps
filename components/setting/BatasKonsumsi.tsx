import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

// Definisikan tipe untuk key konsumsi
type ConsumptionKey = 'gula' | 'kalori' | 'garam' | 'lemak';

// Definisikan tipe untuk limit konsumsi
type ConsumptionLimit = {
  active: boolean;
  value: string;
  unit: string;
};

// Definisikan tipe untuk props
type BatasKonsumsiProps = {
  filterOpen: boolean;
  selectedFilter: string;
  consumptionLimits: Record<ConsumptionKey, ConsumptionLimit>;
  setFilterOpen: (open: boolean) => void;
  setSelectedFilter: (filter: string) => void;
  toggleConsumptionLimit: (key: ConsumptionKey) => void;
  updateConsumptionValue: (key: ConsumptionKey, value: string) => void;
  updateConsumptionUnit: (key: ConsumptionKey, unit: string) => void;
};

export default function BatasKonsumsi({
  filterOpen,
  selectedFilter,
  consumptionLimits,
  setFilterOpen,
  setSelectedFilter,
  toggleConsumptionLimit,
  updateConsumptionValue,
  updateConsumptionUnit
}: BatasKonsumsiProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Atur Batas Konsumsi Kamu</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setFilterOpen(!filterOpen)}
        >
          <Text style={styles.filterText}>{selectedFilter}</Text>
          {filterOpen ? <ChevronUp size={20} color="black" /> : <ChevronDown size={20} color="black" />}
        </TouchableOpacity>
      </View>

      {/* Dropdown filter */}
      {filterOpen && (
        <View style={styles.dropdown}>
          {['Semua', 'Dipilih', 'Belum Dipilih'].map((option) => (
            <TouchableOpacity 
              key={option}
              style={[
                styles.dropdownItem,
                selectedFilter === option && styles.selectedDropdownItem
              ]}
              onPress={() => {
                setSelectedFilter(option);
                setFilterOpen(false);
              }}
            >
              <Text style={[
                styles.dropdownText,
                selectedFilter === option && styles.selectedDropdownText
              ]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Batas Konsumsi Cards */}
      {Object.entries(consumptionLimits)
        .filter(([key, limit]) => {
          if (selectedFilter === 'Semua') return true;
          if (selectedFilter === 'Dipilih') return limit.active;
          if (selectedFilter === 'Belum Dipilih') return !limit.active;
          return true;
        })
        .map(([key, limit]) => {
        const nutrient = key as ConsumptionKey;
        const placeholders: Record<ConsumptionKey, string> = {
          gula: '100',
          kalori: '2000',
          garam: '5',
          lemak: '65'
        };
        
        // Kapitalisasi huruf pertama untuk judul
        const title = key.charAt(0).toUpperCase() + key.slice(1);
        
        return (
          <LinearGradient
            key={key}
            colors={['#D1FFDA', 'white']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.limitCard}
          >
            <View style={styles.limitHeader}>
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => toggleConsumptionLimit(nutrient)}
              >
                <View style={[
                  styles.checkbox,
                  limit.active && styles.checkboxActive
                ]}>
                  {limit.active && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.limitTitle}>{title}</Text>
              </TouchableOpacity>
            </View>
            {limit.active && (
              <View style={styles.limitInputContainer}>
                <Text style={styles.limitLabel}>Atur Batas {title}</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.valueInput}
                    value={limit.value}
                    onChangeText={(text) => updateConsumptionValue(nutrient, text)}
                    keyboardType="numeric"
                    placeholder={placeholders[nutrient]}
                  />
                  <TextInput
                    style={styles.unitInput}
                    value={limit.unit}
                    onChangeText={(text) => updateConsumptionUnit(nutrient, text)}
                    placeholder={nutrient === 'kalori' ? 'kkal' : 'g'}
                  />
                </View>
              </View>
            )}
          </LinearGradient>
        );
      })}
      
      {/* Tampilkan pesan ketika tidak ada item yang sesuai filter */}
      {Object.entries(consumptionLimits).filter(([key, limit]) => {
        if (selectedFilter === 'Semua') return true;
        if (selectedFilter === 'Dipilih') return limit.active;
        if (selectedFilter === 'Belum Dipilih') return !limit.active;
        return true;
      }).length === 0 && (
        <View style={styles.emptyStateContainer}>
          <AlertCircle size={24} color={Colors.neutral[50]} />
          <Text style={styles.emptyStateText}>Belum ada item yang kamu pilih</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.neutral[90],
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[30],
  },
  filterText: {
    fontSize: 14,
    marginRight: 4,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[30],
    width: 150,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedDropdownItem: {
    backgroundColor: Colors.neutral[10],
  },
  dropdownText: {
    fontSize: 14,
  },
  selectedDropdownText: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  limitCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  limitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.success[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.success[50],
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  limitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  limitInputContainer: {
    marginTop: 12,
  },
  limitLabel: {
    fontSize: 14,
    color: Colors.neutral[70],
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral[30],
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  unitInput: {
    width: 80,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral[30],
    borderRadius: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
  },
  emptyStateText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.neutral[70],
    textAlign: 'center',
  },
});