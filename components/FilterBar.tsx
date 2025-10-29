import { fontFamily } from "@/assets/fonts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "./colors";

interface FilterBarProps {
  onFilterPress?: () => void;
  onSortPress?: () => void;
  onOffersPress?: () => void;
  onStarOffersPress?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterPress,
  onSortPress,
  onOffersPress,
  onStarOffersPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Ionicons
          name="options-outline"
          size={scale(16)}
          color={colors.black}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
        <Text style={styles.buttonText}>Sort</Text>
        <Ionicons name="chevron-down" size={scale(12)} color={colors.black} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.offersButton} onPress={onOffersPress}>
        <Text style={styles.buttonText}>Offers</Text>
        <Ionicons name="chevron-down" size={scale(12)} color={colors.black} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.starOffersButton}
        onPress={onStarOffersPress}
      >
        <Ionicons name="star" size={scale(10)} color={colors.black} />
        <Text style={styles.starOffersText}>Offers 4.0+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(1),
    borderWidth: 0.5,
    borderColor: colors.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },
  sortButton: {
    backgroundColor: colors.white,
    borderRadius: scale(20),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(2),
    borderWidth: 0.5,
    borderColor: colors.grayLight,
    flexDirection: "row",
    alignItems: "center",
  },
  offersButton: {
    backgroundColor: colors.white,
    borderRadius: scale(20),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(2),
    borderWidth: 0.5,
    borderColor: colors.grayLight,
    flexDirection: "row",
    alignItems: "center",
  },
  starOffersButton: {
    backgroundColor: colors.white,
    borderRadius: scale(20),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(2),
    borderWidth: 0.5,
    borderColor: colors.grayLight,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: moderateScale(12),
    color: colors.black,
    marginRight: scale(4),
    fontFamily: fontFamily.medium,
  },
  starOffersText: {
    fontSize: moderateScale(14),
    color: colors.black,
    marginLeft: scale(4),
    fontFamily: fontFamily.medium,
  },
});
