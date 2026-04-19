import { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  PanResponder,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type SidebarItemId = 'profile' | 'cards' | 'create' | 'acv';

export type SidebarItem = {
  id: SidebarItemId;
  label: string;
  icon: any;
};

type Props = {
  enabled?: boolean;
  items?: SidebarItem[];
  onSelect?: (id: SidebarItemId) => void;
  children: React.ReactNode;
};

const { width: SCREEN_W } = Dimensions.get('window');
const EDGE_W = 50;
const DRAWER_W = Math.min(320, Math.round(SCREEN_W * 0.58));
const OPEN_THRESHOLD = 38;
const CLOSE_THRESHOLD = 28;

export function SidebarDrawer({ enabled = true, items, onSelect, children }: Props) {
  const defaultItems = useMemo<SidebarItem[]>(
    () => [
      { id: 'profile', label: 'Мой профиль', icon: require('../../assets/profile.png') },
      { id: 'cards', label: 'Анкеты', icon: require('../../assets/Ancets.png') },
      { id: 'create', label: 'Создать анкету', icon: require('../../assets/createAncet.png') },
      { id: 'acv', label: 'Ачивки', icon: require('../../assets/acv.png')},
    ],
    []
  );

  const menuItems = items ?? defaultItems;
  const [open, setOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-DRAWER_W)).current;

  function animateTo(isOpen: boolean) {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -DRAWER_W,
      duration: 220,
      useNativeDriver: true,
    }).start();
    setOpen(isOpen);
  }

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, g) => {
        if (!enabled) return false;
        if (Math.abs(g.dy) > 18) return false;
        if (Math.abs(g.dx) < 6) return false;

        const x = evt.nativeEvent.pageX ?? 9999;
        if (open) return true;
        return x <= EDGE_W && g.dx > 0;
      },
      onPanResponderMove: (_, g) => {
        if (!enabled) return;
        const base = open ? 0 : -DRAWER_W;
        const next = Math.max(-DRAWER_W, Math.min(0, base + g.dx));
        translateX.setValue(next);
      },
      onPanResponderRelease: (_, g) => {
        if (!enabled) return;
        if (!open) {
          if (g.dx > OPEN_THRESHOLD) animateTo(true);
          else animateTo(false);
          return;
        }
        if (g.dx < -CLOSE_THRESHOLD) animateTo(false);
        else animateTo(true);
      },
    })
  ).current;

  const overlayOpacity = translateX.interpolate({
    inputRange: [-DRAWER_W, 0],
    outputRange: [0, 0.45],
    extrapolate: 'clamp',
  });

  if (!enabled) return <>{children}</>;

  return (
    <View style={s.root}>
      {children}

      {!open ? <View style={s.edge} {...pan.panHandlers} /> : null}

      {open ? (
        <Animated.View style={[s.overlay, { opacity: overlayOpacity }]} pointerEvents="auto">
          <Pressable style={s.overlayPress} onPress={() => animateTo(false)} />
        </Animated.View>
      ) : null}

      <Animated.View
        style={[s.drawer, { width: DRAWER_W, transform: [{ translateX }] }]}
        pointerEvents="auto"
        {...pan.panHandlers}
      >
        <ImageBackground
          source={require('../../assets/sidebar.png')}
          resizeMode="cover"
          style={s.drawerBg}
        >
          <SafeAreaView style={s.safe}>
            <View style={s.header}>
              <Text style={s.headerTitle}>Меню</Text>
            </View>

            <View style={s.items}>
              {menuItems.map((it) => (
                <Pressable
                  key={it.id}
                  onPress={() => {
                    onSelect?.(it.id);
                    animateTo(false);
                  }}
                  style={({ pressed }) => [s.item, pressed && s.itemPressed]}
                >
                  <Image source={it.icon} style={s.icon} resizeMode="contain" />
                  <Text style={s.itemText}>{it.label}</Text>
                </Pressable>
              ))}
            </View>
          </SafeAreaView>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  edge: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: EDGE_W,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  overlayPress: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#0B0F0D',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 22,
    shadowOffset: { width: 8, height: 0 },
    elevation: 12,
  },
  drawerBg: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 16, paddingTop: 6, paddingBottom: 18 },
  header: { paddingVertical: 10 },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  items: { gap: 10, marginTop: 8 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  itemPressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  icon: { width: 26, height: 26 },
  itemText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 16,
    fontWeight: '700',
  },
});

