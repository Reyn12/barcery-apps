import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl, Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BerhasilSimpanData from '../components/setting/BerhasilSimpanData';
import BatasKonsumsi from '../components/setting/BatasKonsumsi';
import DaftarAlergi from '../components/setting/DaftarAlergi';

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
        <BatasKonsumsi 
          filterOpen={filterOpen}
          selectedFilter={selectedFilter}
          consumptionLimits={consumptionLimits}
          setFilterOpen={setFilterOpen}
          setSelectedFilter={setSelectedFilter}
          toggleConsumptionLimit={toggleConsumptionLimit}
          updateConsumptionValue={updateConsumptionValue}
          updateConsumptionUnit={updateConsumptionUnit}
        />

        {/* Daftar Alergi */}
        <DaftarAlergi 
          selectedFilter={selectedFilter}
          allergies={allergies}
          newAllergy={newAllergy}
          showAllergyInput={showAllergyInput}
          toggleAllergySelection={toggleAllergySelection}
          removeAllergy={removeAllergy}
          setNewAllergy={setNewAllergy}
          setShowAllergyInput={setShowAllergyInput}
          addNewAllergy={addNewAllergy}
          showAllergyInputAndScroll={showAllergyInputAndScroll}
          saveSettings={saveSettings}
        />
        
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