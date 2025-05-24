import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { Feather } from '@expo/vector-icons';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <Feather name="heart" size={60} color="#ccc" />
            <Text style={styles.empty}>No favorites yet.</Text>
            <Text style={styles.subtext}>Tap the heart icon on items to add them here.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  desc: { color: '#666' },
  emptyWrapper: {
    alignItems: 'center',
    marginTop: 80,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 15,
    fontSize: 18,
    fontWeight: '500',
  },
  subtext: {
    color: '#bbb',
    marginTop: 6,
    fontSize: 14,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
});
