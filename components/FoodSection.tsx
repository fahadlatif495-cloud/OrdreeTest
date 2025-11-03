import { fontFamily } from "@/assets/fonts";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../assets/colors";
import { FoodCard } from "./FoodCard";
import Typography from "./Typography";

interface FoodItem {
  id: string;
  name: string;
  rating?: number;
  restaurant: string;
  price: string;
  image: string;
  isFavorite?: boolean;
}

interface FoodSectionProps {
  title: string;
  items: FoodItem[];
  onItemPress?: (item: FoodItem) => void;
  onFavoritePress?: (item: FoodItem) => void;
  onViewAllPress?: () => void;
}

export const FoodSection: React.FC<FoodSectionProps> = ({
  title,
  items,
  onItemPress,
  onFavoritePress,
  onViewAllPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Typography
          size={20}
          color={colors.DarkRed}
          family={fontFamily.semiBold}
        >
          {title}
        </Typography>
        <TouchableOpacity
          onPress={() => router.push("/ViewAll")}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Typography
            size={16}
            color={colors.DarkRed}
            family={fontFamily.semiBold}
          >
            View all
          </Typography>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={onItemPress}
            onFavoritePress={onFavoritePress}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: verticalScale(16),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(20),
    color: colors.DarkRed,
    fontFamily: fontFamily.semiBold,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
  },
});
