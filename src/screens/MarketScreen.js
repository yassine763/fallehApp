// src/screens/MarketScreen.js - Market Prices with Charts
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MarketScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState('Tomates');
  const [timeRange, setTimeRange] = useState('7d');
  const scrollY = useRef(new Animated.Value(0)).current;

  const products = [
    { name: 'Tomates', price: '1,750', unit: 'TND/kg', trend: '+100', icon: 'apple-alt', color: '#E53935', data: [1.5, 1.6, 1.65, 1.7, 1.75, 1.75, 1.75] },
    { name: 'Blé', price: '1,200', unit: 'TND/kg', trend: '0', icon: 'wheat', color: '#FFB300', data: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2] },
    { name: 'Olives', price: '7,500', unit: 'TND/L', trend: '-200', icon: 'oil-can', color: '#43A047', data: [7.7, 7.6, 7.6, 7.55, 7.5, 7.5, 7.5] },
    { name: 'Oranges', price: '2,100', unit: 'TND/kg', trend: '+50', icon: 'lemon', color: '#FB8C00', data: [2.0, 2.05, 2.05, 2.08, 2.1, 2.1, 2.1] },
  ];

  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [{
      data: products.find(p => p.name === selectedProduct)?.data || [],
      color: (opacity = 1) => `rgba(27, 94, 32, ${opacity})`,
      strokeWidth: 3,
    }],
  };

  const renderProductCard = (product, index) => (
    <MotiView
      key={product.name}
      from={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: index * 100 }}
    >
      <TouchableOpacity
        style={[
          styles.productCard,
          selectedProduct === product.name && styles.selectedCard,
        ]}
        onPress={() => setSelectedProduct(product.name)}
      >
        <LinearGradient
          colors={selectedProduct === product.name ? ['#1B5E20', '#2E7D32'] : ['#FFF', '#F5F5F5']}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: product.color + '20' }]}>
              <FontAwesome5 name={product.icon} size={24} color={product.color} />
            </View>
            <View style={[
              styles.trendBadge,
              { backgroundColor: product.trend.startsWith('+') ? '#4CAF50' : product.trend === '0' ? '#9E9E9E' : '#F44336' }
            ]}>
              <Ionicons 
                name={product.trend.startsWith('+') ? 'arrow-up' : product.trend === '0' ? 'remove' : 'arrow-down'} 
                size={14} 
                color="#FFF" 
              />
              <Text style={styles.trendText}>{product.trend}</Text>
            </View>
          </View>
          
          <Text style={[
            styles.productName,
            selectedProduct === product.name && styles.selectedText,
          ]}>
            {product.name}
          </Text>
          <Text style={[
            styles.productPrice,
            selectedProduct === product.name && styles.selectedText,
          ]}>
            {product.price} <Text style={styles.unit}>{product.unit}</Text>
          </Text>
          
          <Text style={styles.updateTime}>Dernière Màj: il y a 20 min</Text>
        </LinearGradient>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1B5E20', '#2E7D32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <FontAwesome5 name="chart-line" size={24} color="#FFF" />
            <Text style={styles.headerTitle}>Prix du Marché</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsScroll}
        >
          {products.map((product, index) => renderProductCard(product, index))}
        </ScrollView>

        {/* Chart Section */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 400 }}
          style={styles.chartContainer}
        >
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Historique des Prix</Text>
            <View style={styles.timeRangeSelector}>
              {['24h', '7j', '30j'].map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.timeBtn,
                    timeRange === range && styles.timeBtnActive,
                  ]}
                  onPress={() => setTimeRange(range)}
                >
                  <Text style={[
                    styles.timeBtnText,
                    timeRange === range && styles.timeBtnTextActive,
                  ]}>
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <LineChart
            data={chartData}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(27, 94, 32, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#1B5E20',
              },
              propsForBackgroundLines: {
                strokeDasharray: '',
                stroke: '#E0E0E0',
              },
            }}
            bezier
            style={styles.chart}
            withVerticalLines={false}
            withHorizontalLines={true}
            withDots={true}
            withShadow={false}
          />
        </MotiView>

        {/* Market List */}
        <View style={styles.marketList}>
          <Text style={styles.sectionTitle}>Tous les Produits</Text>
          
          {products.map((product, index) => (
            <MotiView
              key={product.name}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 600 + index * 100 }}
            >
              <TouchableOpacity style={styles.marketItem}>
                <View style={styles.marketLeft}>
                  <View style={[styles.marketIcon, { backgroundColor: product.color + '15' }]}>
                    <FontAwesome5 name={product.icon} size={20} color={product.color} />
                  </View>
                  <View>
                    <Text style={styles.marketName}>{product.name}</Text>
                    <Text style={styles.marketUpdate}>il y a 20 min</Text>
                  </View>
                </View>
                <View style={styles.marketRight}>
                  <Text style={styles.marketPrice}>{product.price}</Text>
                  <Text style={styles.marketUnit}>{product.unit}</Text>
                </View>
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>

        {/* Related Products */}
        <View style={styles.relatedSection}>
          <Text style={styles.sectionTitle}>Produits Liés</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Engrais', 'Semences', 'Pesticides'].map((item, index) => (
              <TouchableOpacity key={item} style={styles.relatedChip}>
                <Text style={styles.relatedText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tips Section */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1000 }}
          style={styles.tipsCard}
        >
          <MaterialCommunityIcons name="lightbulb-on" size={32} color="#FFB300" />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Conseil du Jour</Text>
            <Text style={styles.tipsText}>
              Les prix des tomates devraient augmenter de 5% la semaine prochaine. 
              Stockez si possible.
            </Text>
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 15,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  productsScroll: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  productCard: {
    width: 160,
    marginRight: 15,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  selectedCard: {
    transform: [{ scale: 1.05 }],
    elevation: 10,
  },
  cardGradient: {
    padding: 20,
    height: 180,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  selectedText: {
    color: '#FFF',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  unit: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  updateTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 'auto',
  },
  chartContainer: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 25,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 4,
  },
  timeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeBtnActive: {
    backgroundColor: '#1B5E20',
  },
  timeBtnText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  timeBtnTextActive: {
    color: '#FFF',
  },
  chart: {
    borderRadius: 16,
    marginLeft: -10,
  },
  marketList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  marketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },
  marketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  marketName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  marketUpdate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  marketRight: {
    alignItems: 'flex-end',
  },
  marketPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  marketUnit: {
    fontSize: 12,
    color: '#666',
  },
  relatedSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  relatedChip: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  relatedText: {
    color: '#1B5E20',
    fontWeight: '600',
  },
  tipsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB300',
  },
  tipsContent: {
    marginLeft: 15,
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 5,
  },
  tipsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default MarketScreen;