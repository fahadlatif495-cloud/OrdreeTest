import { fontFamily } from "@/assets/fonts";
import colors from "@/components/colors";
import { useAlbums } from "@/hooks/useUsers";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function ViewAll() {
  const params = useLocalSearchParams<{ title?: string }>();
  const title = (params?.title as string) || "Near by Top Brand";
  const { data: albums, isLoading } = useAlbums();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={scale(24)} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View all</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.DarkRed} />
        </View>
      ) : (
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          ListHeaderComponent={<Text style={styles.sectionTitle}>{title}</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={[styles.brandBadge]}>
                <Ionicons
                  name="storefront"
                  size={scale(28)}
                  color={colors.DarkRed}
                />
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.brandName} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.etaRow}>
                  <Ionicons
                    name="time-outline"
                    size={scale(18)}
                    color={colors.grayLight}
                  />
                  <Text style={styles.etaText}>
                    {item.id}
                    {item.userId} : {"mins"}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
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
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  backBtn: {
    width: scale(24),
    height: scale(24),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: moderateScale(20),
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    marginLeft: scale(16),
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    color: colors.DarkRed,
    fontFamily: fontFamily.semiBold,
    marginBottom: verticalScale(16),
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardGray,
    borderRadius: scale(16),
    marginBottom: verticalScale(14),
  },
  brandBadge: {
    width: scale(62),
    height: scale(62),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(16),
    backgroundColor: colors.blue,
  },
  cardRight: {
    flex: 1,
  },
  brandName: {
    fontSize: moderateScale(18),
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    marginBottom: verticalScale(6),
    width: "80%",
  },
  etaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  etaText: {
    marginLeft: scale(8),
    fontSize: moderateScale(14),
    color: colors.grayLight,
    fontFamily: fontFamily.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
