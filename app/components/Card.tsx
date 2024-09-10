import { Shadows } from "@/app/constants/Shawdows";
import { useThemeColors } from "@/app/hooks/useThemeColor";
import { View, type ViewProps, type ViewStyle } from "react-native";

type Props = ViewProps;

export function Card({ style, ...rest }: Props) {
  const colors = useThemeColors();
  return (
    <View
      style={[styles, { backgroundColor: colors.grayWhite }, style]}
      {...rest}
    />
  );
}

const styles = {
  borderRadius: 8,
  overflow: "hidden",
  ...Shadows.dp2,
} satisfies ViewStyle;