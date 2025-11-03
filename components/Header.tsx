import { fontFamily } from "@/assets/fonts";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../assets/colors";
import CustomModal from "./CustomModal";
import LocationModalContent, { Location } from "./LocationModal";
import { SearchBar } from "./SearchBar";
import Typography from "./Typography";
interface HeaderProps {
  onLocationPress?: () => void;
  onLoginPress?: () => void;
}

const LOCATIONS: Location[] = [
  { id: "1", name: "New York", isSelected: true },
  { id: "2", name: "Los Angeles", isSelected: false },
  { id: "3", name: "Chicago", isSelected: false },
  { id: "4", name: "Houston", isSelected: false },
  { id: "5", name: "Phoenix", isSelected: false },
  { id: "6", name: "Philadelphia", isSelected: false },
  { id: "7", name: "San Antonio", isSelected: false },
  { id: "8", name: "San Diego", isSelected: false },
];

export const Header: React.FC<HeaderProps> = ({ onLoginPress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>(LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<string>("New York");

  const handleLocationPress = () => {
    setIsModalOpen(true);
  };

  const handleLocationToggle = (locationId: string) => {
    const updatedLocations = locations.map((location) => ({
      ...location,
      isSelected: location.id === locationId,
    }));
    setLocations(updatedLocations);
    const selected = updatedLocations.find((loc) => loc.isSelected);
    if (selected) {
      setSelectedLocation(selected.name);
    }
  };

  const handleSearch = (text: string) => {
    console.log("Search:", text);
  };
  return (
    <>
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
              <Typography
                size={16}
                color={colors.white}
                family={fontFamily.semiBold}
              >
                Good Morning
              </Typography>
              <TouchableOpacity
                style={styles.locationRow}
                onPress={handleLocationPress}
              >
                <Typography
                  size={12}
                  color={colors.white}
                  family={fontFamily.semiBold}
                  style={{ marginRight: scale(4) }}
                >
                  {selectedLocation}
                </Typography>
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
              <Typography
                size={14}
                color={colors.DarkRed}
                family={fontFamily.semiBold}
              >
                Login
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
        <SearchBar onSearch={handleSearch} />
      </LinearGradient>

      <CustomModal
        visible={isModalOpen}
        title="Select Location"
        onClose={() => setIsModalOpen(false)}
      >
        <LocationModalContent
          locations={locations}
          onLocationPress={handleLocationToggle}
        />
      </CustomModal>
    </>
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
