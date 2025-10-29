import { fontFamily } from "@/assets/fonts";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { BrandCard } from "./BrandCard";
import colors from "./colors";

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
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => router.push("/ViewAll")}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.viewAll}>View all</Text>
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
  viewAll: {
    fontSize: moderateScale(16),
    color: colors.DarkRed,
    fontFamily: fontFamily.semiBold,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
  },
});
