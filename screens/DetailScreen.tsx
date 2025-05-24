import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext'; // ✅ Added
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { item } = route.params;
  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // ✅ Added
  const isFav = isFavorite(item.id); // ✅ Added

  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
        <TouchableOpacity
          onPress={() => {
            if (isFav) {
              removeFavorite(item.id);
              Toast.show({
                type: 'info',
                text1: 'Removed from Favorites',
                position: 'bottom',
                visibilityTime: 1500,
              });
            } else {
              addFavorite(item);
              Toast.show({
                type: 'success',
                text1: 'Added to Favorites',
                position: 'bottom',
                visibilityTime: 1500,
              });
            }
          }}
        >
          <Feather name="heart" size={24} color={isFav ? '#FF4D4D' : '#333'} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageBox}>
          <Image
            source={require('../assets/Background.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>₱120</Text>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.ratingRow}>
            <Entypo name="star" size={16} color="#F9A825" />
            <Text style={styles.ratingText}>4.8</Text>
            <Text style={styles.ratingCount}>(230)</Text>
          </View>

          <View style={styles.colorOptions}>
            {[0, 1, 2].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorBox,
                  selectedColor === index && styles.colorBoxActive,
                ]}
                onPress={() => setSelectedColor(index)}
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {item.desc} with more details. This is placeholder text for the product description.
        </Text>

        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Quantity</Text>
        </View>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(prev => Math.max(prev - 1, 1))}
          >
            <Text style={styles.quantitySymbol}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, styles.quantitySelected]}
            onPress={() => setQuantity(prev => prev + 1)}
          >
            <Text style={styles.quantitySymbol}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Main', { screen: 'Cart' })}
        >
          <Feather name="shopping-cart" size={24} color="#C77B4D" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            addToCart(item, quantity);
            Toast.show({
              type: 'success',
              text1: 'Added to Cart',
              text2: `${item.title} x${quantity} added successfully`,
              position: 'bottom',
              visibilityTime: 2000,
            });
          }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3efed',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#f3efed',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  imageBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 16,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C77B4D',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ratingCount: {
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  colorBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  colorBoxActive: {
    backgroundColor: '#C77B4D',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    gap: 16,
  },
  quantityButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  quantitySelected: {
    borderWidth: 1,
    borderColor: '#C77B4D',
    backgroundColor: '#fef4f0',
  },
  quantitySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C77B4D',
  },
  quantityNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cartIcon: {
    backgroundColor: '#f6eae4',
    padding: 14,
    borderRadius: 14,
  },
  addToCartButton: {
    backgroundColor: '#C77B4D',
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
