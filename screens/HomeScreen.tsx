import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';

const categories = ['All', 'Hot', 'Iced', 'Pastries'];
const items = new Array(8).fill(null).map((_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  desc: `Description ${i + 1}`,
}));

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardBadge}>
        <Text style={styles.cardBadgeText}>★</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Feather name="info" color="#fff" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Gradient Header */}
      <LinearGradient colors={['#1c1c1e', '#111']} style={styles.topSection}>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#aaa"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Featured Card */}
        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>☕ Recommended</Text>
          <View style={styles.featuredLines}>
            <View style={styles.featuredLine} />
            <View style={[styles.featuredLine, { width: '60%' }]} />
          </View>
        </View>

        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.tab,
                selectedCategory === cat && styles.tabActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === cat && styles.tabTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grid Cards */}
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1' },
  topSection: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#1c1c1e',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 12,
    color: '#fff',
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#C77B4D',
    padding: 12,
    borderRadius: 12,
  },
  content: {
    padding: 20,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  featuredTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  featuredLines: {
    flexDirection: 'column',
    gap: 6,
  },
  featuredLine: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    width: '80%',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tab: {
    backgroundColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: '#C77B4D',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    width: '48%',
    marginBottom: 16,
    position: 'relative',
  },
  cardBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#C77B4D',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  cardBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: 20,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  cardButton: {
    backgroundColor: '#C77B4D',
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 8,
  },
});
