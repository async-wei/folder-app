import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, Pressable, View } from "react-native";
import { AppText } from "./Text";
import type { Stash } from "../store";

const ITEM_H = 64;
const GAP = 12;
const STEP = ITEM_H + GAP;
const BOX_W = 118;

export type StashColumnHandle = {
  /** Measure droppable chip positions; call once when a drag starts. */
  prepare: () => void;
  /** Update the hover highlight for a window point; returns the stash id under it. */
  hover: (x: number, y: number) => string | null;
  /** Resolve the drop target for a window point and clear the highlight. */
  drop: (x: number, y: number) => string | null;
};

type Props = {
  stashes: Stash[];
  onSort: (stashId: string) => void;
  tapToSort?: boolean;
  offsetY?: number;
  leftInset?: number;
};

type Rect = { x: number; y: number; w: number; h: number };
type AV = Animated.AnimatedInterpolation<number>;

// One chip. Smoothly grows a little (box + text) while it's the hover target.
function StashChip({
  stash,
  highlighted,
  opacity,
  translateX,
  marginBottom,
  tapToSort,
  onSort,
  registerRef,
}: {
  stash: Stash;
  highlighted: boolean;
  opacity: AV;
  translateX: AV;
  marginBottom: number;
  tapToSort: boolean;
  onSort: (id: string) => void;
  registerRef: (node: View | null) => void;
}) {
  const grow = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.spring(grow, { toValue: highlighted ? 1.09 : 1, friction: 6, useNativeDriver: true }).start();
  }, [highlighted, grow]);

  return (
    <Animated.View
      ref={registerRef as never}
      style={{ width: BOX_W, height: ITEM_H, marginBottom, opacity, transform: [{ translateX }, { scale: grow }] }}
    >
      <Pressable
        onPress={tapToSort ? () => onSort(stash.id) : undefined}
        disabled={!tapToSort}
        style={{ flex: 1, borderRadius: 14, backgroundColor: stash.color, paddingHorizontal: 10, justifyContent: "center" }}
      >
        <AppText size={12} weight="semibold" color="#FFFFFF" numberOfLines={1} style={{ lineHeight: 15 }}>
          {stash.name}
        </AppText>
        <AppText size={10} color="#FFFFFF" style={{ opacity: 0.72, marginTop: 2 }}>
          {stash.count} items
        </AppText>
      </Pressable>
    </Animated.View>
  );
}

/**
 * Picker-style stash column for the Unstashed sort view.
 *
 * Drop targets are measured with measureInWindow (real on-screen rects). The
 * card stack feeds in a window-space point computed the same way, so the two
 * always agree — no touch-vs-window coordinate skew. The hover highlight lives
 * inside this component so dragging never re-renders the screen.
 */
export const StashFadeColumn = forwardRef<StashColumnHandle, Props>(function StashFadeColumn(
  { stashes, onSort, tapToSort = true, offsetY = 0, leftInset = 24 },
  ref,
) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollVal = useRef(0);
  const [height, setHeight] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const chipRefs = useRef(new Map<string, View>());
  const rects = useRef(new Map<string, Rect>());

  const half = height / 2;
  const band = Math.min(2.3 * STEP, Math.max(STEP, half - STEP));
  const padCenter = Math.max(0, half - band - ITEM_H / 2);
  const maxShift = leftInset;

  const onLayout = (e: LayoutChangeEvent) => setHeight(e.nativeEvent.layout.height);

  // Item indices currently at full opacity (the center band) → droppable.
  const isDroppable = (i: number) => {
    const center = padCenter + i * STEP + ITEM_H / 2 - half;
    return Math.abs(center - scrollVal.current) <= band;
  };

  const setHover = (id: string | null) => {
    if (id !== hoveredRef.current) {
      hoveredRef.current = id;
      setHovered(id);
    }
  };

  const hitTest = (px: number, py: number): string | null => {
    for (const [id, r] of rects.current) {
      if (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) return id;
    }
    return null;
  };

  useImperativeHandle(
    ref,
    () => ({
      prepare: () => {
        rects.current.clear();
        stashes.forEach((stash, i) => {
          if (!isDroppable(i)) return;
          chipRefs.current
            .get(stash.id)
            ?.measureInWindow((x, y, w, h) => rects.current.set(stash.id, { x, y, w, h }));
        });
      },
      hover: (x, y) => {
        const id = hitTest(x, y);
        setHover(id);
        return id;
      },
      drop: (x, y) => {
        const id = hitTest(x, y);
        setHover(null);
        return id;
      },
    }),
    [stashes, height, leftInset],
  );

  return (
    <View style={{ width: leftInset + BOX_W, transform: [{ translateY: offsetY }] }} onLayout={onLayout}>
      {height > 0 && (
        <Animated.ScrollView
          style={{ height }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
            listener: (e: { nativeEvent: { contentOffset: { y: number } } }) => {
              scrollVal.current = e.nativeEvent.contentOffset.y;
            },
          })}
          contentContainerStyle={{ paddingLeft: leftInset, paddingTop: padCenter, paddingBottom: padCenter }}
        >
          {stashes.map((stash, i) => {
            const center = padCenter + i * STEP + ITEM_H / 2 - half;
            const input = [center - half, center - band, center + band, center + half];
            const opacity = scrollY.interpolate({ inputRange: input, outputRange: [0, 1, 1, 0], extrapolate: "clamp" });
            const translateX = scrollY.interpolate({ inputRange: input, outputRange: [-maxShift, 0, 0, -maxShift], extrapolate: "clamp" });
            return (
              <StashChip
                key={stash.id}
                stash={stash}
                highlighted={hovered === stash.id}
                opacity={opacity}
                translateX={translateX}
                marginBottom={i === stashes.length - 1 ? 0 : GAP}
                tapToSort={tapToSort}
                onSort={onSort}
                registerRef={(node) => {
                  if (node) chipRefs.current.set(stash.id, node);
                  else chipRefs.current.delete(stash.id);
                }}
              />
            );
          })}
        </Animated.ScrollView>
      )}
    </View>
  );
});
