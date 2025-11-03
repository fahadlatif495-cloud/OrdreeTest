import { fontFamily } from "@/assets/fonts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../assets/colors";
import Typography from "./Typography";

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface CategorySectionProps {
  onCategoryPress?: (category: Category) => void;
}

const categories: Category[] = [
  { id: "1", name: "Food", icon: "restaurant-outline" },
  { id: "2", name: "Groceries", icon: "cart-outline" },
  { id: "3", name: "Pharmacy", icon: "medical-outline" },
  { id: "4", name: "Sweets", icon: "ice-cream-outline" },
  { id: "5", name: "Stores", icon: "storefront-outline" },
];

export const CategorySection: React.FC<CategorySectionProps> = ({
  onCategoryPress,
}) => {
  const handleCategoryPress = (category: Category) => {
    onCategoryPress?.(category);
  };

  return (
    <View style={styles.container}>
      <Typography
        size={20}
        color={colors.DarkRed}
        family={fontFamily.semiBold}
        marginBottom={verticalScale(16)}
      >
        What would you like to order today?
      </Typography>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(item)}
          >
            <View style={styles.categoryIcon}>
              <Ionicons
                name={item.icon}
                size={scale(24)}
                color={colors.DarkRed}
              />
            </View>
            <Typography
              size={12}
              color={colors.black}
              family={fontFamily.medium}
              textAlign="center"
            >
              {item.name}
            </Typography>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
  },
  title: {
    fontSize: moderateScale(20),
    color: colors.DarkRed,
    fontFamily: fontFamily.semiBold,
    marginBottom: verticalScale(16),
  },
  scrollContent: {
    paddingRight: scale(16),
  },
  categoryItem: {
    alignItems: "center",
    marginRight: scale(15),
    width: scale(62),
  },
  categoryIcon: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: colors.cardGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  categoryText: {
    fontSize: moderateScale(12),
    color: colors.black,
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
});
