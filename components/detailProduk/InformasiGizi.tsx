import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { PieChart } from 'react-native-chart-kit'

export function InformasiGizi() {
  const chartConfig = {
    backgroundGradientFrom: Colors.neutral[10],
    backgroundGradientTo: Colors.neutral[10],
    color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
    strokeWidth: 5,
    barPercentage: 0.5,
  }
  
  // Data untuk masing-masing nutrisi
  const karboData = [
    {
      name: 'Karbo',
      value: 3,
      color: Colors.danger[50],
      legendFontColor: Colors.neutral[50],
      legendFontSize: 12
    },
    {
      name: 'Sisa',
      value: 97,
      color: Colors.neutral[30],
      legendFontColor: Colors.neutral[50],
      legendFontSize: 12
    }
  ]
  
  const proteinData = [
    {
      name: 'Protein',
      value: 9,
      color: Colors.information[50],
      legendFontColor: Colors.neutral[50],
      legendFontSize: 12
    },
    {
      name: 'Sisa',
      value: 91,
      color: Colors.neutral[30],
      legendFontColor: Colors.neutral[50],
      legendFontSize: 12
    }
  ]
  
  const lemakData = [
    {
      name: 'Lemak',
      value: 10,
      color: Colors.warning[50],
      legendFontColor: Colors.neutral[50],
      legendFontSize: 12
    },
    {
      name: 'Sisa',
      value: 90,
      color: Colors.neutral[30],
      legendFontColor: Colors.neutral[50],
      legendFontSize: 12
    }
  ]
  
  const natriumData = [
    {
      name: 'Natrium',
      value: 6,
      color: Colors.success[50],
      legendFontColor: Colors.neutral[50],
      legendFontSize: 12
    },
    {
      name: 'Sisa',
      value: 94,
      color: Colors.neutral[30],
      legendFontColor: Colors.neutral[50],
      legendFontSize: 12
    }
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informasi Gizi</Text>
      
      {/* Nutrient Charts */}
      <View style={styles.nutrientCirclesContainer}>
        {/* Karbo */}
        <View style={styles.nutrientItem}>
          <View style={styles.chartContainer}>
            <PieChart
              data={karboData}
              width={70}
              height={70}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="18"
              hasLegend={false}
            />
          </View>
          <Text style={styles.nutrientLabel}>Karbo</Text>
          <Text style={styles.nutrientValue}>3% AKG</Text>
        </View>
        
        {/* Protein */}
        <View style={styles.nutrientItem}>
          <View style={styles.chartContainer}>
            <PieChart
              data={proteinData}
              width={70}
              height={70}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="18"
              hasLegend={false}
            />
          </View>
          <Text style={styles.nutrientLabel}>Protein</Text>
          <Text style={styles.nutrientValue}>9% AKG</Text>
        </View>
        
        {/* Lemak */}
        <View style={styles.nutrientItem}>
          <View style={styles.chartContainer}>
            <PieChart
              data={lemakData}
              width={70}
              height={70}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="18"
              hasLegend={false}
            />
          </View>
          <Text style={styles.nutrientLabel}>Lemak</Text>
          <Text style={styles.nutrientValue}>10% AKG</Text>
        </View>
        
        {/* Natrium */}
        <View style={styles.nutrientItem}>
          <View style={styles.chartContainer}>
            <PieChart
              data={natriumData}
              width={70}
              height={70}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="18"
              hasLegend={false}
            />
          </View>
          <Text style={styles.nutrientLabel}>Natrium</Text>
          <Text style={styles.nutrientValue}>6% AKG</Text>
        </View>
      </View>
      
      {/* Nutrition Facts Table */}
      <View style={styles.nutritionTable}>
        {/* Energi Total */}
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Energi total</Text>
          <Text style={styles.nutritionValue}>120kkal</Text>
        </View>
        
        {/* Energi dari lemak */}
        <View style={[styles.nutritionRow, styles.subRow]}>
          <Text style={styles.nutritionSubLabel}>Energi dari lemak</Text>
          <Text style={styles.nutritionValue}>60kkal</Text>
        </View>
        
        {/* Lemak Total */}
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Lemak Total</Text>
          <Text style={styles.nutritionValue}>7g</Text>
        </View>
        
        {/* Kolesterol */}
        <View style={[styles.nutritionRow, styles.subRow]}>
          <Text style={styles.nutritionSubLabel}>Kolesterol</Text>
          <Text style={styles.nutritionValue}>20mg</Text>
        </View>
        
        {/* Lemak Jenuh */}
        <View style={[styles.nutritionRow, styles.subRow]}>
          <Text style={styles.nutritionSubLabel}>Lemak Jenuh</Text>
          <Text style={styles.nutritionValue}>4g</Text>
        </View>
        
        {/* Protein */}
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Protein</Text>
          <Text style={styles.nutritionValue}>6g</Text>
        </View>
        
        {/* Karbohidrat Total */}
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Karbohidrat Total</Text>
          <Text style={styles.nutritionValue}>10g</Text>
        </View>
        
        {/* Gula Total */}
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Gula Total</Text>
          <Text style={styles.nutritionValue}>10g</Text>
        </View>
        
        {/* Sukrosa */}
        <View style={[styles.nutritionRow, styles.subRow]}>
          <Text style={styles.nutritionSubLabel}>Sukrosa</Text>
          <Text style={styles.nutritionValue}>0g</Text>
        </View>
        
        {/* Laktosa */}
        <View style={[styles.nutritionRow, styles.subRow]}>
          <Text style={styles.nutritionSubLabel}>Laktosa</Text>
          <Text style={styles.nutritionValue}>10g</Text>
        </View>
        
        {/* Garam (Natrium) */}
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Garam (Natrium)</Text>
          <Text style={styles.nutritionValue}>90mg</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[10],
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.neutral[100],
  },
  nutrientCirclesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  nutrientItem: {
    alignItems: 'center',
    width: '22%',
  },
  chartContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nutrientLabel: {
    fontSize: 14,
    color: Colors.neutral[100],
    fontWeight: '500',
  },
  nutrientValue: {
    fontSize: 12,
    color: Colors.neutral[50],
  },
  nutritionTable: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[30],
    paddingTop: 16,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subRow: {
    paddingLeft: 16,
  },
  nutritionLabel: {
    fontSize: 14,
    color: Colors.neutral[100],
    fontWeight: '500',
  },
  nutritionSubLabel: {
    fontSize: 14,
    color: Colors.neutral[50],
  },
  nutritionValue: {
    fontSize: 14,
    color: Colors.neutral[100],
  },
})
