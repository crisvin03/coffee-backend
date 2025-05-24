import React, { useState, useEffect } from 'react';
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
import { Feather, Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App'; // adjust if needed

const categories = ['All', 'Hot', 'Iced', 'Pastries'];

const items = new Array(8).fill(null).map((_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  desc: `Description ${i + 1}`,
}));

export default function HomeScreen() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
      visibilityTime: 1500,
    });
  };

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchText]);

  const renderItem = ({ item }: any) => {
    const favorite = isFavorite(item.id);

    const toggleFavorite = () => {
      if (favorite) {
        removeFavorite(item.id);
        showToast('Removed from Favorites');
      } else {
        addFavorite(item);
        showToast('Added to Favorites');
      }
    };

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })} style={styles.card}>
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>★</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.desc}</Text>
        </View>
        <TouchableOpacity style={styles.cardButton} onPress={toggleFavorite}>
          <Feather name="heart" size={18} color={favorite ? '#FF4D4D' : '#ffffff'} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1c1c1e', '#111']} style={styles.topSection}>
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#aaa"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Entypo name="circle-with-cross" size={18} color="#aaa" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {filteredItems.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>No search results found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <>
              <View style={styles.featuredCard}>
                <Text style={styles.featuredTitle}>☕ Recommended</Text>
                <View style={styles.featuredLines}>
                  <View style={styles.featuredLine} />
                  <View style={[styles.featuredLine, { width: '60%' }]} />
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow}>
                {categories.map((cat) => (
                  <TouchableOpacity key={cat} style={styles.tab}>
                    <Text style={styles.tabText}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          }
        />
      )}
      <Toast />
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
    justifyContent: 'space-between',
    gap: 10,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: '#C77B4D',
    padding: 12,
    borderRadius: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 90,
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
    marginBottom: 6,
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
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    width: '48%',
    marginBottom: 16,
    position: 'relative',
    height: 160,
    justifyContent: 'space-between',
  },
  cardBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#C77B4D',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 1,
  },
  cardBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#666',
  },
  cardButton: {
    backgroundColor: '#C77B4D',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noResultText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
