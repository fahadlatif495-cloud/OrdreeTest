import { BrandSection } from "@/components/BrandSection";
import { CategorySection } from "@/components/CategorySection";
import colors from "@/components/colors";
import { FilterBar } from "@/components/FilterBar";
import { FoodSection } from "@/components/FoodSection";
import { Header } from "@/components/Header";
import { useAppStore } from "@/hooks/useAppStore";
import { useUsers } from "@/hooks/useUsers";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { verticalScale } from "react-native-size-matters";

interface FoodItem {
  id: string;
  name: string;
  rating?: number;
  restaurant: string;
  price: string;
  image: string;
  isFavorite?: boolean;
}

interface Brand {
  id: string;
  name: string;
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
  website: ReactNode;
}

export default function HomeScreen() {
  const handleCategoryPress = (category: any) => {
    console.log("Category pressed:", category);
  };

  const handleFoodItemPress = (item: FoodItem) => {
    console.log("Food item pressed:", item);
  };

  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const handleFavoritePress = (item: FoodItem) => {
    toggleFavorite(item.id);
  };

  const handleBrandPress = (brand: Brand) => {
    console.log("Brand pressed:", brand);
  };

  const { data: users, isLoading } = useUsers();

  const userItems: FoodItem[] = (users ?? []).map((u) => ({
    id: String(u.id),
    name: u.name,
    restaurant: u.username,
    price: "0",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    isFavorite: favoriteIds.includes(String(u.id)),
    rating: u.username.length,
  }));
  const sections = [
    {
      key: "categories",
      render: <CategorySection onCategoryPress={handleCategoryPress} />,
    },
    {
      key: "filterBar",
      render: (
        <FilterBar
          onFilterPress={() => router.push("/modal")}
          onSortPress={() => router.push("/modal")}
          onOffersPress={() => router.push("/modal")}
          onStarOffersPress={() => router.push("/modal")}
        />
      ),
    },
    {
      key: "food1",
      render: (
        <FoodSection
          title="Try something new"
          items={userItems}
          onItemPress={handleFoodItemPress}
          onFavoritePress={handleFavoritePress}
        />
      ),
    },
    {
      key: "brands",
      render: (
        <BrandSection
          title="Near by Top Brand"
          brands={(users ?? []).map((u) => ({
            id: String(u.id),
            name: u.name,
            website: u.website,
          }))}
          onBrandPress={handleBrandPress}
        />
      ),
    },
    {
      key: "food2",
      render: (
        <FoodSection
          title="Up to 30% off"
          items={userItems}
          onItemPress={handleFoodItemPress}
          onFavoritePress={handleFavoritePress}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
        accessibilityLabel="Loading content"
        accessibilityRole="progressbar"
      >
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        onLocationPress={() => console.log("Location pressed")}
        onLoginPress={() => console.log("Login pressed")}
      />

      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => <View>{item.render}</View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: verticalScale(10),
  },
});
