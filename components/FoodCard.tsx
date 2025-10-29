import { fontFamily } from "@/assets/fonts";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "./colors";

interface FoodItem {
  id: string;
  name: string;
  rating?: number;
  restaurant: string;
  price: string;
  image: string;
  isFavorite?: boolean;
}

interface FoodCardProps {
  item: FoodItem;
  onPress?: (item: FoodItem) => void;
  onFavoritePress?: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onPress,
  onFavoritePress,
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const placeholderImage = require("../assets/images/icon.png");
  const imageSource = useFallback
    ? placeholderImage
    : item?.image
    ? { uri: item.image }
    : placeholderImage;
  const handlePress = () => {
    onPress?.(item);
  };

  const handleFavoritePress = () => {
    onFavoritePress?.(item);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.image}
          contentFit="cover"
          cachePolicy="memory-disk"
          onError={() => setUseFallback(true)}
          accessibilityLabel={item.name}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
        >
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={scale(20)}
            color={item.isFavorite ? "red" : "red"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.name}>{item.name}</Text>

          <View>
            {item.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={scale(14)} color="#FCD34D" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.restaurant}>{item.restaurant}</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.delivery}>Free Delivery</Text>
          </View>

          <TouchableOpacity style={styles.priceButton}>
            <Text style={styles.priceText}>$ {item.id}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardGray,
    borderRadius: scale(12),
    marginRight: scale(12),
    width: scale(240), // 65% of screen width
    height: verticalScale(200),
  },
  imageContainer: {
    position: "relative",
    height: verticalScale(100),
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    // padding: scale(12),
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
  },
  name: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.semiBold,
    color: colors.black,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: moderateScale(12),
    color: colors.black,
    fontFamily: fontFamily.medium,
    marginLeft: scale(4),
  },
  restaurant: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(10),
  },
  delivery: {
    fontSize: moderateScale(11),
    color: colors.DarkRed,
    fontFamily: fontFamily.semiBold,
  },
  priceButton: {
    backgroundColor: colors.black,
    borderRadius: scale(20),
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(16),
    minWidth: scale(60),
    alignItems: "center",
  },
  priceText: {
    color: colors.white,
    fontSize: moderateScale(14),
    fontFamily: fontFamily.medium,
  },
});
