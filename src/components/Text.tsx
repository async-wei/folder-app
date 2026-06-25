import { Text, TextProps } from "react-native";
import { fontFamily } from "../theme";

type Weight = "regular" | "medium" | "semibold" | "bold";

type AppTextProps = TextProps & {
  size?: number;
  weight?: Weight;
  color?: string;
};

/**
 * Text wrapper that applies the correct San Francisco font file for a given
 * size + weight. Custom fonts on Android don't synthesize weights from
 * fontWeight, so the family itself must encode the weight.
 */
export function AppText({
  size = 15,
  weight = "regular",
  color = "#000000",
  style,
  children,
  ...rest
}: AppTextProps) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: fontFamily(size, weight), fontSize: size, color }, style]}
    >
      {children}
    </Text>
  );
}
