import { fontFamily } from "@/assets/fonts";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../assets/colors";
import { BrandCard } from "./BrandCard";
import Typography from "./Typography";

interface Brand {
  id: string;
  name: string;
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
  website: ReactNode;
  // suite: string;
}

interface BrandSectionProps {
  title: string;
  brands: Brand[];
  onBrandPress?: (brand: Brand) => void;
  onViewAllPress?: () => void;
}

export const BrandSection: React.FC<BrandSectionProps> = ({
  title,
  brands,
  onBrandPress,
  onViewAllPress,
}) => {
  // console.log("brandsbrands==>>", brands);
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Typography
          size={18}
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
        data={brands}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <BrandCard brand={item} onPress={onBrandPress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(16),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(18),
    color: colors.DarkRed,
    fontFamily: fontFamily.semiBold,
    marginBottom: 0,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
  },
});
