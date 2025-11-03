import { fontFamily } from "@/assets/fonts";
import React, { forwardRef } from "react";
import { Text, TextProps, TextStyle } from "react-native";
import colors from "../assets/colors";

export type TypographyProps = TextProps & {
  color?: string;
  size?: number;
  align?: TextStyle["textAlign"];
  family?: keyof typeof fontFamily | string;
  textAlign?: "center" | "left" | "right" | "justify";
  numberOfLines?: number;
  marginBottom?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  paddingBottom?: number;
  paddingTop?: number;
  paddingLeft?: number;
};

const Typography = forwardRef<Text, TypographyProps>(
  (
    {
      color = colors.black,
      family = fontFamily.regular,
      size = 14,
      align,
      style,
      textAlign,
      numberOfLines,
      marginBottom,
      marginTop,
      marginLeft,
      marginRight,
      marginVertical,
      marginHorizontal,
      paddingBottom,
      paddingTop,
      paddingLeft,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <Text
        ref={ref}
        style={[
          color ? { color: color } : null,
          family ? { fontFamily: family } : null,
          size ? { fontSize: size } : null,
          align ? { textAlign: align } : null,
          textAlign ? { textAlign: textAlign } : null,
          marginBottom ? { marginBottom: marginBottom } : null,
          marginTop ? { marginTop: marginTop } : null,
          marginLeft ? { marginLeft: marginLeft } : null,
          marginRight ? { marginRight: marginRight } : null,
          marginVertical ? { marginVertical: marginVertical } : null,
          marginHorizontal ? { marginHorizontal: marginHorizontal } : null,
          paddingBottom ? { paddingBottom: paddingBottom } : null,
          style,
        ]}
        {...rest}
      >
        {children}
      </Text>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
