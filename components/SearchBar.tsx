import { fontFamily } from "@/assets/fonts";
import { isIOS } from "@/types/isPlateForm";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../assets/colors";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search items...",
  onSearch,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          isIOS()
            ? { paddingVertical: verticalScale(7) }
            : { paddingVertical: verticalScale(2) },
        ]}
      >
        <Ionicons
          name="search"
          size={scale(22)}
          color={colors.grayLight}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.grayLight}
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(15),
  },
  searchContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(35),
    paddingHorizontal: scale(16),
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: scale(12),
  },
  input: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.regular,
    color: colors.black,
    width: "100%",
  },
});
