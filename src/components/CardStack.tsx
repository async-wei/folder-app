import { useEffect, useRef } from "react";
import { Animated, GestureResponderEvent, LayoutChangeEvent, PanResponder, PanResponderGestureState, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppText } from "./Text";
import type { UnstashedItem } from "../store";

const CARD_W = 185;
const CARD_H = 295;
// The card sits centered-ish in its container; behind cards fan up and to the
// sides, so leave a little room all around (more on top for the upward peek).
const BASE_LEFT = 30;
const BASE_TOP = 22;
const PAD_BOTTOM = 12;
const CONTAINER_W = CARD_W + BASE_LEFT * 2;
const CONTAINER_H = BASE_TOP + CARD_H + PAD_BOTTOM;

// Tilt/offset for the (up to 3) cards peeking behind the top card.
const BEHIND = [
  { rotate: "-5deg", tx: -16, ty: -6, scale: 0.94, opacity: 0.9 },
  { rotate: "6deg", tx: 16, ty: -12, scale: 0.88, opacity: 0.72 },
  { rotate: "-9deg", tx: -22, ty: -18, scale: 0.82, opacity: 0.55 },
];
const ENTER = BEHIND[0]; // the new top card promotes from the first behind slot

type Origin = { x: number; y: number };

function BehindCard({ item, cfg }: { item: UnstashedItem; cfg: (typeof BEHIND)[number] }) {
  return (
    <LinearGradient
      colors={item.bg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        position: "absolute",
        left: BASE_LEFT,
        top: BASE_TOP,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 20,
        opacity: cfg.opacity,
        transform: [{ translateX: cfg.tx }, { translateY: cfg.ty }, { rotate: cfg.rotate }, { scale: cfg.scale }],
      }}
    />
  );
}

function DraggableCard({
  item,
  mode,
  onSort,
  dragStart,
  dragMove,
  dragResolve,
  getOrigin,
}: {
  item: UnstashedItem;
  mode: "tap" | "drag";
  onSort: (stashId: string) => void;
  dragStart: () => void;
  dragMove: (x: number, y: number) => void;
  dragResolve: (x: number, y: number) => string | null;
  getOrigin: () => Origin | null;
}) {
  // grab = one-time offset so the card's center jumps to the finger on grab.
  // pan  = the finger's drag delta. Card position = grab + pan, so the card
  // center always sits exactly under the finger. JS-driven (PanResponder
  // gestures can't use the native driver).
  const grab = useRef(new Animated.ValueXY()).current;
  const pan = useRef(new Animated.ValueXY({ x: ENTER.tx, y: ENTER.ty })).current;
  const scale = useRef(new Animated.Value(ENTER.scale)).current;
  const opacity = useRef(new Animated.Value(ENTER.opacity)).current;
  const rot = useRef(new Animated.Value(0)).current; // 0 = ENTER.rotate, 1 = 0deg
  const rotate = rot.interpolate({ inputRange: [0, 1], outputRange: [ENTER.rotate, "0deg"] });
  const touch = useRef({ x: 0, y: 0 }); // grab point within the card

  const modeRef = useRef(mode);
  modeRef.current = mode;
  const cbs = useRef({ dragStart, dragMove, dragResolve, onSort, getOrigin });
  cbs.current = { dragStart, dragMove, dragResolve, onSort, getOrigin };

  // The card center, in window coordinates (same space as the stash rects), given
  // the current drag delta. This is the invisible "true container" reference point.
  const point = (dx: number, dy: number): Origin | null => {
    const o = cbs.current.getOrigin();
    if (!o) return null;
    return { x: o.x + BASE_LEFT + touch.current.x + dx, y: o.y + BASE_TOP + touch.current.y + dy };
  };

  // Promote from the first behind slot to the front (smooth, no flash).
  useEffect(() => {
    Animated.parallel([
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false, friction: 8 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: false, friction: 8 }),
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: false }),
      Animated.timing(rot, { toValue: 1, duration: 220, useNativeDriver: false }),
    ]).start();
  }, [opacity, pan, rot, scale]);

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => modeRef.current === "drag",
      onMoveShouldSetPanResponder: () => modeRef.current === "drag",
      onPanResponderGrant: (e: GestureResponderEvent) => {
        pan.stopAnimation();
        scale.stopAnimation();
        rot.setValue(1);
        opacity.setValue(1);
        const { locationX, locationY } = e.nativeEvent;
        touch.current = { x: locationX, y: locationY };
        grab.setValue({ x: locationX - CARD_W / 2, y: locationY - CARD_H / 2 });
        pan.setValue({ x: 0, y: 0 });
        Animated.spring(scale, { toValue: 0.6, useNativeDriver: false, friction: 7 }).start();
        cbs.current.dragStart();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
        listener: ((_e: GestureResponderEvent, g: PanResponderGestureState) => {
          const p = point(g.dx, g.dy);
          if (p) cbs.current.dragMove(p.x, p.y);
        }) as (e: GestureResponderEvent) => void,
      }),
      onPanResponderRelease: (_e, g) => {
        const p = point(g.dx, g.dy);
        const id = p ? cbs.current.dragResolve(p.x, p.y) : null;
        if (id) {
          Animated.parallel([
            Animated.timing(opacity, { toValue: 0, duration: 150, useNativeDriver: false }),
            Animated.timing(scale, { toValue: 0.3, duration: 150, useNativeDriver: false }),
          ]).start(() => cbs.current.onSort(id));
        } else {
          Animated.parallel([
            Animated.spring(grab, { toValue: { x: 0, y: 0 }, useNativeDriver: false }),
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }),
            Animated.spring(scale, { toValue: 1, useNativeDriver: false }),
          ]).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(grab, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      {...responder.panHandlers}
      style={{
        position: "absolute",
        left: BASE_LEFT,
        top: BASE_TOP,
        width: CARD_W,
        height: CARD_H,
        zIndex: 100,
        opacity,
        transform: [
          { translateX: Animated.add(grab.x, pan.x) },
          { translateY: Animated.add(grab.y, pan.y) },
          { rotate },
          { scale },
        ],
      }}
    >
      <LinearGradient
        colors={item.bg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 20,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOpacity: 0.28,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 10 },
          elevation: 12,
        }}
      >
        <View style={{ position: "absolute", top: 14, right: 14, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 }}>
          <AppText size={10} weight="semibold" color="#FFFFFF">
            {mode === "drag" ? "Drag me" : "Tap a stash →"}
          </AppText>
        </View>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.52)"]}
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, paddingTop: 28, paddingHorizontal: 14, paddingBottom: 14 }}
        >
          <AppText size={14} weight="semibold" color="#FFFFFF">
            {item.label}
          </AppText>
          <AppText size={11} color="#FFFFFF" style={{ opacity: 0.75 }}>
            {item.source}
          </AppText>
        </LinearGradient>
      </LinearGradient>
    </Animated.View>
  );
}

export function CardStack({
  items,
  mode,
  onSort,
  dragStart,
  dragMove,
  dragResolve,
}: {
  items: UnstashedItem[];
  mode: "tap" | "drag";
  onSort: (stashId: string) => void;
  dragStart: () => void;
  dragMove: (x: number, y: number) => void;
  dragResolve: (x: number, y: number) => string | null;
}) {
  const top = items[0];
  const containerRef = useRef<View>(null);
  const origin = useRef<Origin | null>(null);

  const measureOrigin = () =>
    containerRef.current?.measureInWindow((x, y) => {
      origin.current = { x, y };
    });

  return (
    <View
      ref={containerRef}
      onLayout={(_e: LayoutChangeEvent) => measureOrigin()}
      style={{ width: CONTAINER_W, height: CONTAINER_H, overflow: "visible" }}
    >
      {/* Behind cards: farthest first so the nearest sits just under the top card. */}
      {[3, 2, 1].map((idx) => {
        const it = items[idx];
        if (!it) return null;
        return <BehindCard key={it.id} item={it} cfg={BEHIND[idx - 1]} />;
      })}
      {top && (
        <DraggableCard
          key={top.id}
          item={top}
          mode={mode}
          onSort={onSort}
          dragStart={() => {
            measureOrigin();
            dragStart();
          }}
          dragMove={dragMove}
          dragResolve={dragResolve}
          getOrigin={() => origin.current}
        />
      )}
    </View>
  );
}
