import { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

type CardItem = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: any;
};

type Props = {
  onBack?: () => void;
  onSwipeLeft?: (card: CardItem) => void;
  onSwipeRight?: (card: CardItem) => void;
  onSwipeUp?: (card: CardItem) => void;
};

function stubSwipeLeft(card: CardItem) {
  console.log('swipe left не / нравится', card.id);
}
function stubSwipeRight(card: CardItem) {
  console.log('swipe right / нравится', card.id);
}
function stubSwipeUp(card: CardItem) {
  console.log('swipe up / Сохранить', card.id);
}

export function CardsScreen({ onBack, onSwipeLeft, onSwipeRight, onSwipeUp }: Props) {
  const { width: screenW, height: screenH } = useWindowDimensions();

  const isSmall = screenW < 360;
  const isTablet = screenW >= 768;

  const SWIPE_THRESHOLD = Math.min(140, screenW * 0.28);
  const SWIPE_UP_THRESHOLD = Math.min(140, screenH * 0.18);

  const ui = useMemo(() => {
    const horizontalPadding = isTablet ? 28 : 16;
    const cardMaxWidth = isTablet ? 520 : 420;
    const cardWidth = Math.min(screenW - horizontalPadding * 2, cardMaxWidth);
    const imageHeight = isTablet
      ? Math.min(360, Math.round(screenH * 0.34))
      : isSmall
      ? Math.min(220, Math.round(screenH * 0.27))
      : Math.min(280, Math.round(screenH * 0.32));

    return {
      horizontalPadding,
      topTitleSize: isTablet ? 24 : isSmall ? 16 : 18,
      backBtnSize: isTablet ? 52 : 44,
      backIconSize: isTablet ? 34 : 30,
      cardWidth,
      imageHeight,
      cardRadius: isTablet ? 24 : 18,
      cardPadding: isTablet ? 22 : isSmall ? 14 : 16,
      titleSize: isTablet ? 30 : isSmall ? 20 : 22,
      subtitleSize: isTablet ? 22 : isSmall ? 16 : 18,
      textSize: isTablet ? 18 : isSmall ? 14 : 15.5,
      textLineHeight: isTablet ? 26 : isSmall ? 20 : 21,
      hintSize: isTablet ? 15 : 13,
      topPadding: isTablet ? 12 : 6,
      bottomPadding: isTablet ? 24 : 18,
      stackOffset: isTablet ? 14 : 10,
    };
  }, [screenW, screenH, isSmall, isTablet]);

  const cards = useMemo<CardItem[]>(
    () => [
      {
        id: '1',
        title: 'Гречка',
        subtitle: '67 мес',
        description:
          'Практический опыт показывает, что сложившаяся структура организации способствует повышению актуальности существующих финансовых и административных условий.',
        image: require('../../assets/icon.png'),
      },
      {
        id: '2',
        title: 'Мурзик',
        subtitle: '24 мес',
        description:
          'Разнообразный и богатый опыт говорит о том, что новая модель организационной деятельности требует анализа дальнейших направлений развития.',
        image: require('../../assets/icon.png'),
      },
      {
        id: '3',
        title: 'Бобик',
        subtitle: '14 мес',
        description:
          'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности обеспечивает актуальность новых предложений.',
        image: require('../../assets/icon.png'),
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const current = cards[index];
  const next = cards[(index + 1) % cards.length];

  const handleLeft = onSwipeLeft ?? stubSwipeLeft;
  const handleRight = onSwipeRight ?? stubSwipeRight;
  const handleUp = onSwipeUp ?? stubSwipeUp;

  const rotate = position.x.interpolate({
    inputRange: [-screenW / 2, 0, screenW / 2],
    outputRange: ['-14deg', '0deg', '14deg'],
    extrapolate: 'clamp',
  });

  const currentCardStyle = {
    transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
  };

  const nextCardScale = position.x.interpolate({
    inputRange: [-screenW, 0, screenW],
    outputRange: [1, 0.96, 1],
    extrapolate: 'clamp',
  });

  const nextCardTranslateY = position.x.interpolate({
    inputRange: [-screenW, 0, screenW],
    outputRange: [0, ui.stackOffset, 0],
    extrapolate: 'clamp',
  });

  const nextCardTranslateYFromUp = position.y.interpolate({
    inputRange: [-screenH, 0],
    outputRange: [0, ui.stackOffset],
    extrapolate: 'clamp',
  });

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-screenW, 0, screenW],
    outputRange: [1, 0.88, 1],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD * 0.45, SWIPE_THRESHOLD],
    outputRange: [0, 0.55, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD * 0.45, 0],
    outputRange: [1, 0.55, 0],
    extrapolate: 'clamp',
  });

  const saveOpacity = position.y.interpolate({
    inputRange: [-SWIPE_UP_THRESHOLD, -SWIPE_UP_THRESHOLD * 0.5, 0],
    outputRange: [1, 0.55, 0],
    extrapolate: 'clamp',
  });

  const likeRotate = position.x.interpolate({
    inputRange: [0, screenW / 2],
    outputRange: ['0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const nopeRotate = position.x.interpolate({
    inputRange: [-screenW / 2, 0],
    outputRange: ['-10deg', '0deg'],
    extrapolate: 'clamp',
  });

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();
  };

  const finishSwipe = (dir: 'left' | 'right' | 'up') => {
    const toX = dir === 'right' ? screenW * 1.25 : dir === 'left' ? -screenW * 1.25 : 0;
    const toY = dir === 'up' ? -screenH * 1.1 : dir === 'left' || dir === 'right' ? 40 : 0;

    Animated.timing(position, {
      toValue: { x: toX, y: toY },
      duration: 240,
      useNativeDriver: true,
    }).start(() => {
      const swiped = cards[index];

      if (swiped) {
        if (dir === 'right') handleRight(swiped);
        else if (dir === 'left') handleLeft(swiped);
        else handleUp(swiped);
      }

      position.setValue({ x: 0, y: 0 });
      setIndex((v) => (v + 1) % cards.length);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 6 || Math.abs(g.dy) > 6,
      onPanResponderMove: (_, g) => {
        position.setValue({ x: g.dx, y: g.dy });
      },
      onPanResponderRelease: (_, g) => {
        if (!current) return;

        if (g.dy < -SWIPE_UP_THRESHOLD && Math.abs(g.dx) < SWIPE_THRESHOLD * 0.85) {
          finishSwipe('up');
          return;
        }

        if (g.dx > SWIPE_THRESHOLD) {
          finishSwipe('right');
          return;
        }

        if (g.dx < -SWIPE_THRESHOLD) {
          finishSwipe('left');
          return;
        }

        resetPosition();
      },
    })
  ).current;

  return (
    <ImageBackground source={require('../../assets/bg.jpg')} style={s.bg} resizeMode="cover">
      <SafeAreaView style={s.safe}>
        <View
          style={[
            s.topRow,
            {
              paddingHorizontal: ui.horizontalPadding,
              paddingTop: ui.topPadding,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Назад"
            onPress={() => onBack?.()}
            style={({ pressed }) => [
              s.backBtn,
              {
                width: ui.backBtnSize,
                height: ui.backBtnSize,
                borderRadius: isTablet ? 14 : 12,
              },
              pressed && s.pressed,
            ]}
          >
            <Text style={[s.backIcon, { fontSize: ui.backIconSize }]}>‹</Text>
          </Pressable>

          <Text style={[s.topTitle, { fontSize: ui.topTitleSize }]}>Свайпай!</Text>

          <View style={{ width: ui.backBtnSize }} />
        </View>

        <View style={[s.stage, { paddingHorizontal: ui.horizontalPadding }]}>
          <View style={[s.cardStack, { width: ui.cardWidth }]}>
            {next ? (
              <Animated.View
                pointerEvents="none"
                style={[
                  s.nextCardWrap,
                  {
                    width: ui.cardWidth,
                    transform: [
                      { translateY: Animated.add(nextCardTranslateY, nextCardTranslateYFromUp) },
                      { scale: nextCardScale },
                    ],
                    opacity: nextCardOpacity,
                  },
                ]}
              >
                <View
                  style={[
                    s.card,
                    s.nextCard,
                    {
                      borderRadius: ui.cardRadius,
                    },
                  ]}
                >
                  <Image
                    source={next.image}
                    style={[
                      s.cardImage,
                      {
                        height: ui.imageHeight,
                      },
                    ]}
                    resizeMode="cover"
                  />

                  <View
                    style={[
                      s.cardBody,
                      {
                        padding: ui.cardPadding,
                      },
                    ]}
                  >
                    <Text style={[s.cardTitle, { fontSize: ui.titleSize }]}>
                      {next.title}
                      {next.subtitle ? (
                        <Text style={[s.cardSubtitle, { fontSize: ui.subtitleSize }]}>
                          {'  '}
                          {next.subtitle}
                        </Text>
                      ) : null}
                    </Text>

                    <View style={s.divider} />

                    <Text
                      style={[
                        s.cardText,
                        {
                          fontSize: ui.textSize,
                          lineHeight: ui.textLineHeight,
                        },
                      ]}
                    >
                      {next.description}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            ) : null}

            {current ? (
              <Animated.View
                style={[s.cardWrap, currentCardStyle, { width: ui.cardWidth }]}
                {...panResponder.panHandlers}
              >
                <View
                  style={[
                    s.card,
                    {
                      borderRadius: ui.cardRadius,
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      s.badge,
                      s.badgeRight,
                      {
                        opacity: likeOpacity,
                        transform: [{ rotate: likeRotate }],
                      },
                    ]}
                  >
                    <Text style={s.badgeText}>LIKE</Text>
                  </Animated.View>

                  <Animated.View
                    style={[
                      s.badge,
                      s.badgeLeft,
                      {
                        opacity: nopeOpacity,
                        transform: [{ rotate: nopeRotate }],
                      },
                    ]}
                  >
                    <Text style={s.badgeText}>NOPE</Text>
                  </Animated.View>

                  <Animated.View
                    style={[
                      s.badge,
                      s.badgeTop,
                      {
                        opacity: saveOpacity,
                      },
                    ]}
                  >
                    <Text style={s.badgeText}>SAVE</Text>
                  </Animated.View>

                  <Image
                    source={current.image}
                    style={[
                      s.cardImage,
                      {
                        height: ui.imageHeight,
                      },
                    ]}
                    resizeMode="cover"
                  />

                  <View
                    style={[
                      s.cardBody,
                      {
                        padding: ui.cardPadding,
                      },
                    ]}
                  >
                    <Text style={[s.cardTitle, { fontSize: ui.titleSize }]}>
                      {current.title}
                      {current.subtitle ? (
                        <Text style={[s.cardSubtitle, { fontSize: ui.subtitleSize }]}>
                          {'  '}
                          {current.subtitle}
                        </Text>
                      ) : null}
                    </Text>

                    <View style={s.divider} />

                    <Text
                      style={[
                        s.cardText,
                        {
                          fontSize: ui.textSize,
                          lineHeight: ui.textLineHeight,
                        },
                      ]}
                    >
                      {current.description}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            ) : null}
          </View>
        </View>

        <View
          style={[
            s.hintRow,
            {
              paddingHorizontal: ui.horizontalPadding,
              paddingBottom: ui.bottomPadding,
            },
          ]}
        >
          <Text style={[s.hintText, { fontSize: ui.hintSize }]}>
            Свайп: влево/вправо или вверх (сохранить)
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  topRow: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  topTitle: {
    color: '#FFFFFF',
    letterSpacing: 0.2,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },

  backBtn: {
    backgroundColor: 'rgba(0,0,0,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    color: '#fff',
    marginTop: -2,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardStack: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextCardWrap: {
    position: 'absolute',
    zIndex: 1,
  },

  cardWrap: {
    width: '100%',
    zIndex: 2,
  },

  card: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  nextCard: {
    opacity: 0.98,
  },

  cardImage: {
    width: '100%',
    backgroundColor: '#D7DCE3',
  },

  cardBody: {},

  cardTitle: {
    color: '#3D3B2F',
    fontWeight: '800',
  },

  cardSubtitle: {
    color: '#6B6756',
    fontWeight: '700',
  },

  divider: {
    height: 2,
    backgroundColor: 'rgba(61,59,47,0.35)',
    marginTop: 10,
    marginBottom: 10,
  },

  cardText: {
    color: '#5A574A',
  },

  hintRow: {
    alignItems: 'center',
  },

  hintText: {
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },

  badge: {
    position: 'absolute',
    zIndex: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.88)',
  },

  badgeLeft: {
    top: 22,
    left: 18,
    borderColor: '#d45b5b',
  },

  badgeRight: {
    top: 22,
    right: 18,
    borderColor: '#68b36b',
  },

  badgeTop: {
    top: 20,
    alignSelf: 'center',
    borderColor: '#6a8fd8',
  },

  badgeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3D3B2F',
    letterSpacing: 1,
  },
});