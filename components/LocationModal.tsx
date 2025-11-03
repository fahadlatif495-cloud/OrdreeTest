import colors from "@/assets/colors";
import { fontFamily } from "@/assets/fonts";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Typography from "./Typography";

export type Location = {
  id: string;
  name: string;
  isSelected: boolean;
};

type LocationModalProps = {
  locations: Location[];
  onLocationPress: (locationId: string) => void;
};

const LocationModalContent: React.FC<LocationModalProps> = ({
  locations,
  onLocationPress,
}) => {
  return (
    <FlatList
      data={locations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.locationItem}
          onPress={() => onLocationPress(item.id)}
          activeOpacity={0.7}
          accessible
          accessibilityRole="checkbox"
          accessibilityState={{ checked: item.isSelected }}
          accessibilityLabel={`Select location ${item.name}`}
        >
          <Typography
            size={14}
            color={item.isSelected ? colors.DarkRed : colors.black}
            family={item.isSelected ? fontFamily.semiBold : fontFamily.regular}
          >
            {item.name}
          </Typography>
          <View style={styles.checkboxContainer}>
            <View
              style={[
                styles.checkbox,
                item.isSelected && styles.checkboxSelected,
              ]}
            >
              {item.isSelected && (
                <Octicons
                  name="dot-fill"
                  size={scale(19)}
                  color={colors.white}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.locationList}
    />
  );
};

export default LocationModalContent;

const styles = StyleSheet.create({
  locationList: {
    paddingVertical: verticalScale(6),
  },

  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.cardGray,
    width: "100%",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    marginRight: scale(12),
  },
  checkbox: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(15),
    borderWidth: 2,
    borderColor: colors.grayLight,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: colors.DarkRed,
    borderColor: colors.DarkRed,
  },
});
