import { fontFamily } from "@/assets/fonts";
import { IMAGES } from "@/assets/images";
import Typography from "@/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  AccessibilityRole,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { verticalScale } from "react-native-size-matters";
import colors from "../assets/colors";

const GRADIENT_COLORS = [
  colors.LightRed as string,
  colors.DarkRed as string,
] as const;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handlePrimaryAction = () => {
    // Wire your auth action here (login/signup navigation)
    router.push("/(tabs)");
  };

  const accessibilityButtonRole = useMemo<AccessibilityRole>(
    () => "button",
    []
  );

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <Image
        source={IMAGES.topBlob}
        style={styles.topBlobImg}
        accessibilityIgnoresInvertColors
      />
      <Image
        source={IMAGES.bottomBlob}
        style={styles.bottomBlobImg}
        accessibilityIgnoresInvertColors
      />

      <View style={styles.container}>
        <Image source={IMAGES.logo} style={styles.logo} />

        {/* Page title */}
        <Typography
          size={32}
          color={colors.DarkRed}
          family={fontFamily.semiBold}
          textAlign="center"
          accessibilityRole="header"
        >
          Access Your Orderee{"\n"}Account
        </Typography>

        {/* Subtitle */}
        <Typography
          size={14}
          color={colors.grayLight}
          family={fontFamily.medium}
          textAlign="center"
          marginVertical={15}
        >
          Welcome back! Sign in to continue your
          {Platform.OS === "ios" ? "\n" : " "}journey with us.
        </Typography>

        {/* Email input */}
        <View style={styles.inputWrap}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor={colors.grayLight}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            accessibilityLabel="Email"
            style={styles.input}
          />
        </View>

        {/* Password input */}
        <View style={styles.inputWrap}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.grayLight}
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
            accessibilityLabel="Password"
            style={styles.input}
          />
          <TouchableOpacity
            accessibilityRole={accessibilityButtonRole}
            accessibilityLabel={
              isPasswordVisible ? "Hide password" : "Show password"
            }
            onPress={handleTogglePasswordVisibility}
            style={styles.eyeButton}
          >
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={22}
              color={colors.grayLight}
            />
          </TouchableOpacity>
        </View>

        {/* Forgot password */}
        <TouchableOpacity
          accessibilityRole={accessibilityButtonRole}
          accessibilityLabel="Forgot Password"
          onPress={() => {}}
          style={styles.forgotWrap}
        >
          <Typography
            size={16}
            color={colors.DarkRed}
            family={fontFamily.semiBold}
          >
            Forgot Password?
          </Typography>
        </TouchableOpacity>

        {/* Primary CTA */}
        <TouchableOpacity
          accessibilityRole={accessibilityButtonRole}
          accessibilityLabel="Signup or Login"
          onPress={handlePrimaryAction}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={GRADIENT_COLORS}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryCta}
          >
            <Typography
              size={18}
              color={colors.white}
              family={fontFamily.semiBold}
            >
              Login
            </Typography>
          </LinearGradient>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Typography color={colors.grayLight}>Or Continue With</Typography>
          <View style={styles.divider} />
        </View>

        {/* Socials */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            accessibilityRole={accessibilityButtonRole}
            accessibilityLabel="Continue with Google"
            onPress={() => {}}
            // style={styles.socialButton}
          >
            <Image source={IMAGES.google} style={styles.googleIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole={accessibilityButtonRole}
            accessibilityLabel="Continue with Apple"
            onPress={() => {}}
            // style={styles.socialButton}
          >
            <Ionicons name="logo-apple" size={30} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  topBlobImg: {
    position: "absolute",
    right: -60,
    top: -30,
    width: 300,
    height: 220,
    resizeMode: "contain",
  },
  bottomBlobImg: {
    position: "absolute",
    left: -80,
    bottom: -30,
    width: 340,
    height: 260,
    resizeMode: "contain",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  inputWrap: {
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 0.5,
    paddingHorizontal: 16,
  },
  input: {
    height: 48,
    fontSize: 14,
    color: colors.black,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  forgotWrap: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
  primaryCta: {
    marginTop: 24,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.DarkRed,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  dividerRow: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grayLight,
  },
  dividerText: {
    marginHorizontal: 12,
    color: colors.grayLight,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    marginVertical: 20,
  },
  socialButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "50%",
    height: "30%",
    alignSelf: "center",
    resizeMode: "contain",
    paddingTop: verticalScale(70),
  },
  googleIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});

export default Login;
