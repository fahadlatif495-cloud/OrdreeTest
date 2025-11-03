import colors from "@/assets/colors";
import { fontFamily } from "@/assets/fonts";
import Typography from "@/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type Option = { id: string; label: string };

export default function ModalScreen() {
  const sortOptions: Option[] = useMemo(
    () => [
      { id: "relevance", label: "Relevance" },
      { id: "rating", label: "Rating" },
      { id: "price_low", label: "Price: Low" },
      { id: "price_high", label: "Price: High" },
      { id: "delivery", label: "Fast delivery" },
    ],
    []
  );

  const offerOptions: Option[] = useMemo(
    () => [
      { id: "free_delivery", label: "Free delivery" },
      { id: "discount_10", label: "10% off" },
      { id: "discount_20", label: "20% off" },
      { id: "bogo", label: "BOGO" },
    ],
    []
  );

  const ratingOptions: Option[] = useMemo(
    () => [
      { id: "4plus", label: "4.0+" },
      { id: "4_5plus", label: "4.5+" },
      { id: "5", label: "5.0" },
    ],
    []
  );

  const categories: Option[] = useMemo(
    () => [
      { id: "burger", label: "Burger" },
      { id: "pizza", label: "Pizza" },
      { id: "pasta", label: "Pasta" },
      { id: "dessert", label: "Dessert" },
      { id: "drinks", label: "Drinks" },
      { id: "salad", label: "Salad" },
    ],
    []
  );

  const [selectedSort, setSelectedSort] = useState<string>(sortOptions[0].id);
  const [selectedOffers, setSelectedOffers] = useState<Set<string>>(new Set());
  const [selectedRatings, setSelectedRatings] = useState<Set<string>>(
    new Set()
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleToggle = (
    set: Set<string>,
    id: string,
    setSetter: (s: Set<string>) => void
  ) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSetter(next);
  };

  const handleApply = () => {
    router.back();
  };

  const handleClear = () => {
    setSelectedSort(sortOptions[0].id);
    setSelectedOffers(new Set());
    setSelectedRatings(new Set());
    setSelectedCategories(new Set());
  };

  const renderChip = (
    option: Option,
    selected: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      key={option.id}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.black : colors.white,
          borderColor: colors.grayLight,
        },
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={option.label}
    >
      <Typography
        size={12}
        family={fontFamily.medium}
        color={selected ? colors.white : colors.black}
      >
        {option.label}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography size={20} color={colors.black} family={fontFamily.semiBold}>
          Filters
        </Typography>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={scale(22)} color={colors.black} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={["sort", "offers", "rating", "categories"]}
        keyExtractor={(s) => s}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          if (item === "sort") {
            return (
              <View style={styles.section}>
                <Typography
                  size={16}
                  color={colors.DarkRed}
                  family={fontFamily.semiBold}
                  marginBottom={verticalScale(10)}
                >
                  Sort by
                </Typography>
                <View style={styles.rowWrap}>
                  {sortOptions.map((opt) =>
                    renderChip(opt, selectedSort === opt.id, () =>
                      setSelectedSort(opt.id)
                    )
                  )}
                </View>
              </View>
            );
          }
          if (item === "offers") {
            return (
              <View style={styles.section}>
                <Typography
                  size={16}
                  color={colors.DarkRed}
                  family={fontFamily.semiBold}
                  marginBottom={verticalScale(10)}
                >
                  Offers
                </Typography>
                <View style={styles.rowWrap}>
                  {offerOptions.map((opt) =>
                    renderChip(opt, selectedOffers.has(opt.id), () =>
                      handleToggle(selectedOffers, opt.id, setSelectedOffers)
                    )
                  )}
                </View>
              </View>
            );
          }
          if (item === "rating") {
            return (
              <View style={styles.section}>
                <Typography
                  size={16}
                  color={colors.DarkRed}
                  family={fontFamily.semiBold}
                  marginBottom={verticalScale(10)}
                >
                  Rating
                </Typography>
                <View style={styles.rowWrap}>
                  {ratingOptions.map((opt) =>
                    renderChip(opt, selectedRatings.has(opt.id), () =>
                      handleToggle(selectedRatings, opt.id, setSelectedRatings)
                    )
                  )}
                </View>
              </View>
            );
          }
          return (
            <View style={styles.section}>
              <Typography
                size={16}
                color={colors.DarkRed}
                family={fontFamily.semiBold}
                marginBottom={verticalScale(10)}
              >
                Categories
              </Typography>
              <View style={styles.rowWrap}>
                {categories.map((opt) =>
                  renderChip(opt, selectedCategories.has(opt.id), () =>
                    handleToggle(
                      selectedCategories,
                      opt.id,
                      setSelectedCategories
                    )
                  )
                )}
              </View>
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerBtn, styles.clearBtn]}
          onPress={handleClear}
        >
          <Typography
            size={14}
            color={colors.black}
            family={fontFamily.semiBold}
          >
            Clear
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerBtn, styles.applyBtn]}
          onPress={handleApply}
        >
          <Typography
            size={14}
            color={colors.white}
            family={fontFamily.semiBold}
          >
            Apply
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(20),
    color: colors.black,
    fontFamily: fontFamily.semiBold,
  },
  closeBtn: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardGray,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(80),
  },
  section: {
    marginBottom: verticalScale(18),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    color: colors.DarkRed,
    fontFamily: fontFamily.semiBold,
    marginBottom: verticalScale(10),
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
  },
  chip: {
    borderWidth: 0.8,
    borderRadius: scale(20),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
  },
  chipText: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.medium,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: scale(12),
    padding: scale(16),
    backgroundColor: colors.white,
  },
  footerBtn: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtn: {
    backgroundColor: colors.cardGray,
  },
  applyBtn: {
    backgroundColor: colors.black,
  },
  footerBtnText: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.semiBold,
  },
});
