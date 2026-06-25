import { View } from "react-native";
import Svg, { Circle, Ellipse, Path } from "react-native-svg";
import { COLORS } from "../theme";

export function KangarooPlaceholder() {
  return (
    <View
      style={{
        width: 120,
        height: 120,
        borderRadius: 24,
        backgroundColor: "#F5EDE6",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={68} height={68} viewBox="0 0 68 68" fill="none">
        <Ellipse cx={34} cy={42} rx={13} ry={16} stroke={COLORS.rust} strokeWidth={2.2} fill="none" />
        <Ellipse cx={44} cy={22} rx={9} ry={8} stroke={COLORS.rust} strokeWidth={2.2} fill="none" />
        <Ellipse cx={40} cy={14} rx={3} ry={5} stroke={COLORS.rust} strokeWidth={2} fill="none" />
        <Ellipse cx={50} cy={13} rx={2.5} ry={4.5} stroke={COLORS.rust} strokeWidth={2} fill="none" />
        <Ellipse cx={50} cy={25} rx={4} ry={3} stroke={COLORS.rust} strokeWidth={1.8} fill="none" />
        <Circle cx={46} cy={20} r={1.5} fill={COLORS.rust} />
        <Path d="M26 40 Q20 44 22 52" stroke={COLORS.rust} strokeWidth={2} strokeLinecap="round" fill="none" />
        <Path d="M21 52 Q14 58 18 64" stroke={COLORS.rust} strokeWidth={2.2} strokeLinecap="round" fill="none" />
        <Path d="M38 57 Q40 62 46 64" stroke={COLORS.rust} strokeWidth={2.2} strokeLinecap="round" fill="none" />
        <Ellipse cx={30} cy={44} rx={4} ry={3} stroke={COLORS.rust} strokeWidth={1.5} fill="none" opacity={0.6} />
        <Circle cx={30} cy={42} r={1} fill={COLORS.rust} opacity={0.6} />
      </Svg>
    </View>
  );
}
