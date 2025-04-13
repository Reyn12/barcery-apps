import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Plus, Minus, AlertCircle } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

// Definisikan tipe untuk alergi
type Allergy = {
  id: number;
  name: string;
  selected: boolean;
};

// Definisikan tipe untuk props
type DaftarAlergiProps = {
  selectedFilter: string;
  allergies: Allergy[];
  newAllergy: string;
  showAllergyInput: boolean;
  toggleAllergySelection: (id: number) => void;
  removeAllergy: (id: number) => void;
  setNewAllergy: (value: string) => void;
  setShowAllergyInput: (show: boolean) => void;
  addNewAllergy: () => void;
  showAllergyInputAndScroll: () => void;
  saveSettings: () => void;
};

export default function DaftarAlergi({
  selectedFilter,
  allergies,
  newAllergy,
  showAllergyInput,
  toggleAllergySelection,
  removeAllergy,
  setNewAllergy,
  setShowAllergyInput,
  addNewAllergy,
  showAllergyInputAndScroll,
  saveSettings
}: DaftarAlergiProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Daftar Alergi Kamu</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={showAllergyInputAndScroll}
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Daftar alergi yang sudah ada */}
      {allergies
        .filter(allergy => {
          if (selectedFilter === 'Semua') return true;
          if (selectedFilter === 'Dipilih') return allergy.selected;
          if (selectedFilter === 'Belum Dipilih') return !allergy.selected;
          return true;
        })
        .map((allergy) => (
          <LinearGradient
            key={allergy.id}
            colors={['#D1FFDA', 'white']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.allergyItem}
          >
            <TouchableOpacity 
              style={styles.radioContainer}
              onPress={() => toggleAllergySelection(allergy.id)}
            >
              <View style={[
                styles.radioButton,
                allergy.selected && styles.radioButtonSelected
              ]}>
                {allergy.selected && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.allergyName}>{allergy.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removeAllergy(allergy.id)}
            >
              <Minus size={18} color="white" />
            </TouchableOpacity>
          </LinearGradient>
        ))}
      
      {/* Tampilkan pesan ketika tidak ada item yang sesuai filter */}
      {allergies.filter(allergy => {
        if (selectedFilter === 'Semua') return true;
        if (selectedFilter === 'Dipilih') return allergy.selected;
        if (selectedFilter === 'Belum Dipilih') return !allergy.selected;
        return true;
      }).length === 0 && (
        <View style={styles.emptyStateContainer}>
          <AlertCircle size={24} color={Colors.neutral[50]} />
          <Text style={styles.emptyStateText}>Belum ada item yang kamu pilih</Text>
        </View>
      )}
      
      {/* Form untuk menambah alergi baru */}
      {showAllergyInput && (
        <LinearGradient
          colors={['#D1FFDA', 'white']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.allergyItem}
        >
          <TouchableOpacity 
            style={styles.radioContainer}
            onPress={addNewAllergy}
          >
            <View style={styles.radioButton} />
            <TextInput
              style={styles.allergyInput}
              value={newAllergy}
              onChangeText={setNewAllergy}
              placeholder="Contoh: Kacang, Seafood, Susu, dll"
              onSubmitEditing={addNewAllergy}
              autoFocus={true}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => {
              setNewAllergy('');
              setShowAllergyInput(false);
            }}
          >
            <Minus size={18} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      )}
      
      {/* Tombol simpan */}
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={saveSettings}
      >
        <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
      </TouchableOpacity>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  allergyItem: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.success[50],
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success[50],
  },
  allergyName: {
    fontSize: 16,
    marginLeft: 12,
  },
  allergyInput: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.danger[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: Colors.success[50],
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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