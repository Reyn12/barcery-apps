import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Switch, RefreshControl, Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BerhasilSimpanData from '../components/setting/BerhasilSimpanData';
import { LinearGradient } from 'expo-linear-gradient';

export default function Setting() {
  // State untuk dropdown
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [refreshing, setRefreshing] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  type ConsumptionKey = 'gula' | 'kalori' | 'garam' | 'lemak';

  // State untuk batas konsumsi
  const [consumptionLimits, setConsumptionLimits] = useState({
    gula: { active: false, value: '', unit: 'g' },
    kalori: { active: false, value: '', unit: 'kkal' },
    garam: { active: false, value: '', unit: 'g' },
    lemak: { active: false, value: '', unit: 'g' }
  });

  // State untuk daftar alergi
  const [allergies, setAllergies] = useState([
    { id: 1, name: 'Kacang', selected: false },
    { id: 2, name: 'Terigu', selected: false },
    { id: 3, name: 'Susu Sapi', selected: false },
    { id: 4, name: 'Telur', selected: false },
    { id: 5, name: 'Seafood', selected: false },
  ]);
  const [newAllergy, setNewAllergy] = useState('');
  const [showAllergyInput, setShowAllergyInput] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Load data dari AsyncStorage saat komponen dimount
  useEffect(() => {
    loadSettings();
  }, []);

  // Fungsi untuk memuat data dari AsyncStorage
  const loadSettings = async () => {
    try {
      const storedLimits = await AsyncStorage.getItem('consumptionLimits');
      const storedAllergies = await AsyncStorage.getItem('allergies');
      
      if (storedLimits) {
        setConsumptionLimits(JSON.parse(storedLimits));
      }
      
      if (storedAllergies) {
        setAllergies(JSON.parse(storedAllergies));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  // Fungsi untuk refresh data
  const onRefresh = async () => {
    setRefreshing(true);
    await loadSettings();
    setRefreshing(false);
  };

  // Fungsi untuk menyimpan data ke AsyncStorage
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('consumptionLimits', JSON.stringify(consumptionLimits));
      await AsyncStorage.setItem('allergies', JSON.stringify(allergies));
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Gagal menyimpan pengaturan');
    }
  };

  // Fungsi untuk mengubah status aktif batas konsumsi
  const toggleConsumptionLimit = (key: ConsumptionKey) => {
    setConsumptionLimits({
      ...consumptionLimits,
      [key]: {
        ...consumptionLimits[key],
        active: !consumptionLimits[key].active
      }
    });
  };

  // Fungsi untuk mengubah nilai batas konsumsi
  const updateConsumptionValue = (key: ConsumptionKey, value: string) => {
    setConsumptionLimits({
      ...consumptionLimits,
      [key]: {
        ...consumptionLimits[key],
        value
      }
    });
  };
 
  // Fungsi untuk mengubah unit batas konsumsi
  const updateConsumptionUnit = (key: ConsumptionKey, unit: string) => {
    setConsumptionLimits({
      ...consumptionLimits,
      [key]: {
        ...consumptionLimits[key],
        unit
      }
    });
  };

  // Fungsi untuk mengubah status pilihan alergi
  const toggleAllergySelection = (id: number) => {
    setAllergies(allergies.map(allergy => 
      allergy.id === id ? { ...allergy, selected: !allergy.selected } : allergy
    ));
  };

  // Fungsi untuk menambah alergi baru
  const addNewAllergy = () => {
    if (newAllergy.trim() === '') return;
    
    const newId = allergies.length > 0 ? Math.max(...allergies.map(a => a.id)) + 1 : 1;
    setAllergies([...allergies, { id: newId, name: newAllergy, selected: false }]);
    setNewAllergy('');
    setShowAllergyInput(false);
  };

  // Fungsi untuk menghapus alergi
  const removeAllergy = (id: number) => {
    setAllergies(allergies.filter(allergy => allergy.id !== id));
  };

  // Fungsi untuk menampilkan input alergi baru dan scroll ke bawah
  const showAllergyInputAndScroll = () => {
    setShowAllergyInput(true);
    // Scroll ke bawah setelah input muncul
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <>
      <StatusBar style="dark" />
      {/* Header dengan tombol back */}
      <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pengaturan</Text>
        </View>
      <ScrollView 
        style={styles.container}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      >
        

        {/* Card Kontributor */}
        <View style={styles.contributorCard}>
          <View style={styles.contributorContent}>
            <View>
              <Text style={styles.contributorTitle}>Ingin Jadi Kontributor?</Text>
              <Text style={styles.contributorSubtitle}>Ayo Bergabung!</Text>
              <Text style={styles.contributorDescription}>
                Login untuk menambahkan produk favoritmu
              </Text>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <Image 
              source={require('../assets/images/setting/rocket.png')} 
              style={styles.rocketImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Pengaturan Batas Konsumsi */}
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
                  style={styles.dropdownItem}
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
          {Object.entries(consumptionLimits).map(([key, limit]) => {
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
        </View>

        {/* Daftar Alergi */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daftar Alergi Kamu</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={showAllergyInputAndScroll}
            >
              <Plus size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Daftar alergi yang sudah ada */}
          {allergies.map((allergy) => (
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

        
      </ScrollView>

      {/* Popup Berhasil Simpan Data */}
      <BerhasilSimpanData 
        visible={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[10],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'white',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
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
  addButton: {
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
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
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 14,
  },
  selectedDropdownText: {
    fontWeight: 'bold',
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
  contributorCard: {
    backgroundColor: Colors.success[10],
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    overflow: 'hidden',
  },
  contributorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contributorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.neutral[90],
  },
  contributorSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.neutral[90],
    marginBottom: 8,
  },
  contributorDescription: {
    fontSize: 14,
    color: Colors.neutral[70],
    marginBottom: 16,
    maxWidth: '70%',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rocketImage: {
    width: 130,
    height: 130,
  },
});