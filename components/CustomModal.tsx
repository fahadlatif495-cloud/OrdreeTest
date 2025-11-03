import colors from "@/assets/colors";
import { fontFamily } from "@/assets/fonts";
import Typography from "@/components/Typography";
import React, { ReactNode } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type ModalAction = {
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
};

type CustomModalProps = {
  visible: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  dismissable?: boolean;
};

const CustomModal = ({
  visible,
  title,
  children,
  onClose,
  primaryAction,
  secondaryAction,
  dismissable = true,
}: CustomModalProps) => {
  const handleBackdropPress = () => {
    if (!dismissable) return;
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      presentationStyle={
        Platform.OS === "ios" ? "overFullScreen" : "fullScreen"
      }
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={handleBackdropPress}
        accessibilityLabel="Close modal"
        accessibilityRole="button"
      >
        <Pressable style={styles.sheet} onPress={() => {}} accessible={false}>
          <SafeAreaView edges={["bottom"]} style={styles.contentWrap}>
            <View style={styles.topBar} />

            <View style={styles.header}>
              {!!title && (
                <Typography
                  size={18}
                  color={colors.DarkRed}
                  family={fontFamily.semiBold}
                >
                  {title}
                </Typography>
              )}
            </View>

            <View style={styles.body}>{children}</View>

            {(primaryAction || secondaryAction) && (
              <View style={styles.footer}>
                {secondaryAction && (
                  <TouchableOpacity
                    onPress={secondaryAction.onPress}
                    style={[styles.footerBtn, styles.secondaryBtn]}
                    accessibilityRole="button"
                    accessibilityLabel={
                      secondaryAction.accessibilityLabel ||
                      secondaryAction.label
                    }
                  >
                    <Typography
                      size={14}
                      color={colors.black}
                      family={fontFamily.semiBold}
                    >
                      {secondaryAction.label}
                    </Typography>
                  </TouchableOpacity>
                )}
                {primaryAction && (
                  <TouchableOpacity
                    onPress={primaryAction.onPress}
                    style={[styles.footerBtn, styles.primaryBtn]}
                    accessibilityRole="button"
                    accessibilityLabel={
                      primaryAction.accessibilityLabel || primaryAction.label
                    }
                  >
                    <Typography
                      size={14}
                      color={colors.white}
                      family={fontFamily.semiBold}
                    >
                      {primaryAction.label}
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </SafeAreaView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    overflow: "hidden",
  },
  contentWrap: {
    paddingBottom: verticalScale(12),
  },
  header: {
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(18),
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
  closeBtnText: {
    fontSize: moderateScale(18),
    color: colors.black,
    lineHeight: moderateScale(18),
    marginTop: -2,
    fontFamily: fontFamily.semiBold,
  },
  body: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(12),
  },
  footer: {
    flexDirection: "row",
    gap: scale(12),
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(4),
  },
  footerBtn: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtn: {
    backgroundColor: colors.cardGray,
  },
  primaryBtn: {
    backgroundColor: colors.black,
  },
  footerBtnText: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.semiBold,
  },

  topBar: {
    width: scale(60),
    height: verticalScale(2),
    borderRadius: scale(4),
    backgroundColor: colors.DarkRed,
    alignSelf: "center",
    marginVertical: verticalScale(12),
  },
});
