import { fontFamily } from "@/assets/fonts";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SearchBar } from "./SearchBar";
import colors from "./colors";
interface HeaderProps {
  onLocationPress?: () => void;
  onLoginPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginPress }) => {
  const handleSearch = (text: string) => {
    console.log("Search:", text);
  };
  return (
    <LinearGradient
      colors={[colors.LightRed, colors.DarkRed]}
      start={{ x: 0, y: 1.5 }}
      end={{ x: 1, y: 1.5 }}
    >
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <View style={styles.profileIcon}>
            <Ionicons
              name="person-outline"
              size={scale(20)}
              color={colors.DarkRed}
            />
          </View>
          <View style={styles.locationSection}>
            <Text style={styles.greeting}>Good Morning</Text>
            <TouchableOpacity
              style={styles.locationRow}
              onPress={() => router.push("/modal")}
            >
              <Text style={styles.location}>New York</Text>
              <Ionicons
                name="chevron-down"
                size={scale(14)}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="globe-outline"
              size={scale(23)}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar onSearch={handleSearch} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(50),
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  locationSection: {
    flex: 1,
  },
  greeting: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontFamily: fontFamily.semiBold,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    color: colors.white,
    fontSize: moderateScale(12),
    marginRight: scale(4),
    fontFamily: fontFamily.semiBold,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  loginButton: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(33),
    paddingVertical: verticalScale(7),
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: colors.DarkRed,
    fontSize: moderateScale(12),
    fontFamily: fontFamily.semiBold,
  },
});
