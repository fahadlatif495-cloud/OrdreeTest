import { fontFamily } from "@/assets/fonts";
import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../assets/colors";
import Typography from "./Typography";

interface Brand {
  website: ReactNode;
  id: string;
  name: string;
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface BrandCardProps {
  brand: Brand;
  onPress?: (brand: Brand) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand, onPress }) => {
  const handlePress = () => {
    onPress?.(brand);
  };

  const getBrandIcon = (brandName: string): keyof typeof Ionicons.glyphMap => {
    switch (brandName.toLowerCase()) {
      case "layers bakeshop":
        return "cafe-outline";
      case "hardee's":
        return "restaurant-outline";
      case "domino's pizza":
        return "pizza-outline";
      case "sweet creme":
        return "ice-cream-outline";
      case "california pizza":
        return "pizza-outline";
      default:
        return "storefront-outline";
    }
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={handlePress}>
      <View>
        <Ionicons
          name={getBrandIcon(brand.name)}
          size={scale(32)}
          color={brand.textColor || "#E53E3E"}
        />
      </View>
      <Typography
        size={10}
        family={fontFamily.semiBold}
        color={colors.black}
        textAlign="center"
        style={{ width: "70%" }}
        numberOfLines={1}
      >
        {brand.website}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardGray,
    borderRadius: scale(12),
    marginRight: scale(16),
    width: scale(67),
    height: verticalScale(60),
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: moderateScale(10),
    fontFamily: fontFamily.semiBold,
    textAlign: "center",
    width: "70%",
    color: colors.black,
  },
});
