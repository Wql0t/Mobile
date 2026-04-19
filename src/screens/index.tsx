import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

const stories = [
  {
    id: '1',
    title: 'ДАНИИЛ И\nБУЛЬБОЧКА',
    text: 'Практический опыт показывает, что сложившаяся структура организации способствет развитию существующих финансовых и административных условий.',
    image: require('../../assets/story-1.png'),
  },
  {
    id: '2',
    title: 'МАША И\nСАЛАМАНДРА',
    text: 'Практический опыт показывает, что сложившаяся структура позволяет находить питомцев, которые подходят по характеру.',
    image: require('../../assets/story-2.png'),
  },
  {
    id: '3',
    title: 'СЕРГЕЙ И\nПУШУРА',
    text: 'История о любви, заботе и новом доме для животного, которое очень этого ждало.',
    image: require('../../assets/story-3.png'),
  },
  {
    id: '4',
    title: 'САМАРА И\nКРЯНОН',
    text: 'Ещё одна добрая история про хозяина и питомца, которые идеально подошли друг другу.',
    image: require('../../assets/story-4.png'),
  },
];

type HomeScreenProps = {
  onLogin?: () => void;
  onStart?: () => void;
};

const CREAM = '#eadfcf';
const OLIVE = '#7c7a4d';
const DARK = '#050505';
const RED = '#7e0f1f';
const TEXT_LIGHT = '#f2eee6';

export default function HomeScreen({ onLogin, onStart }: HomeScreenProps) {
  const { width, height } = useWindowDimensions();

  const isSmall = width < 360;
  const isTablet = width >= 768;

  const metrics = useMemo(() => {
    const horizontalPadding = isTablet ? 36 : 16;
    const heroTitleSize = isTablet ? 44 : isSmall ? 24 : 30;
    const heroLineHeight = isTablet ? 52 : isSmall ? 30 : 36;
    const heroDescSize = isTablet ? 18 : isSmall ? 13 : 15;
    const buttonTextSize = isTablet ? 30 : isSmall ? 22 : 26;
    const loginTextSize = isTablet ? 20 : 18;

    const cardWidth = isTablet
      ? Math.min(width * 0.58, 520)
      : Math.min(width * 0.86, 360);

    const storyImageWidth = isTablet ? 190 : width < 390 ? 120 : 142;

    const topSectionMinHeight = Math.max(560, Math.min(height * 0.92, 760));
    const paperSectionMinHeight = isTablet ? 560 : width < 390 ? 300 : 420;
    const glassCardMinHeight = isTablet ? 460 : width < 390 ? 340 : 380;

    const bigCatWidth = isTablet ? width * 0.62 : width * 1.15;
    const bigCatHeight = isTablet ? bigCatWidth * 1.2 : bigCatWidth * 1.22;

    return {
      horizontalPadding,
      heroTitleSize,
      heroLineHeight,
      heroDescSize,
      buttonTextSize,
      loginTextSize,
      cardWidth,
      storyImageWidth,
      topSectionMinHeight,
      paperSectionMinHeight,
      glassCardMinHeight,
      bigCatWidth,
      bigCatHeight,
      stripeLeft: width * 0.28,
      topRatWidth: isTablet ? 220 : width < 390 ? 120 : 150,
      topRatHeight: isTablet ? 92 : width < 390 ? 52 : 64,
      startButtonMinWidth: isTablet ? 320 : Math.min(width * 0.72, 250),
      footerTitleSize: isTablet ? 18 : 16,
      footerLinkSize: isTablet ? 14 : 12,
      footerSmallSize: isTablet ? 12 : 10,
      vexaSize: isTablet ? 52 : 38,
      socialIconSize: isTablet ? 34 : 28,
      profileSize: isTablet ? 52 : 44,
      loginMinWidth: isTablet ? 130 : 110,
      glassRadius: isTablet ? 46 : 38,

      // новое
      topContentOffset: isTablet ? 70 : isSmall ? 48 : 58,
    };
  }, [width, height, isSmall, isTablet]);

  const player = useVideoPlayer(require('../../assets/video-1.mp4'), (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.page}>
        <View style={[styles.videoTopSection, { minHeight: metrics.topSectionMinHeight }]}>
          <VideoView
            player={player}
            style={styles.videoTopBackground}
            contentFit="cover"
            nativeControls={false}
          />

          <View style={styles.videoTopOverlay} />

          <View
            style={[
              styles.topRedStripeWide,
              {
                left: metrics.stripeLeft,
                height: isTablet ? 120 : 96,
                width: isTablet ? 40 : 34,
              },
            ]}
          />
          <View
            style={[
              styles.topRedStripeThin,
              {
                left: metrics.stripeLeft + (isTablet ? 46 : 38),
                height: isTablet ? 120 : 96,
              },
            ]}
          />

          <Image
            source={require('../../assets/top-rat.png')}
            style={[
              styles.topRat,
              {
                width: metrics.topRatWidth,
                height: metrics.topRatHeight,
                top: isTablet ? 16 : 10,
                right: isTablet ? 20 : 10,
              },
            ]}
            contentFit="contain"
          />

          {/* ВЕСЬ верхний контент опущен ниже */}
          <View
            style={[
              styles.topContent,
              {
                paddingTop: metrics.topContentOffset,
              },
            ]}
          >
            <View
              style={[
                styles.headerRow,
                {
                  paddingHorizontal: metrics.horizontalPadding,
                },
              ]}
            >
              <View style={styles.headerLeftGroup}>
                <Pressable
                  style={[
                    styles.profileCircle,
                    {
                      width: metrics.profileSize,
                      height: metrics.profileSize,
                    },
                  ]}
                  onPress={onLogin}
                >
                  <Image
                    source={require('../../assets/profile-icon.png')}
                    style={{
                      width: metrics.profileSize * 0.62,
                      height: metrics.profileSize * 0.62,
                    }}
                    contentFit="contain"
                  />
                </Pressable>

                <Pressable
                  style={[
                    styles.loginButton,
                    {
                      minWidth: metrics.loginMinWidth,
                      paddingHorizontal: isTablet ? 28 : 24,
                      paddingVertical: isTablet ? 12 : 10,
                    },
                  ]}
                  onPress={onLogin}
                >
                  <Text
                    style={[
                      styles.loginButtonText,
                      {
                        fontSize: metrics.loginTextSize,
                      },
                    ]}
                  >
                    Войти.
                  </Text>
                </Pressable>
              </View>
            </View>

            <View
              style={[
                styles.glassCardWrap,
                {
                  marginTop: isTablet ? 40 : 28,
                  marginHorizontal: metrics.horizontalPadding,
                },
              ]}
            >
              <View
                style={[
                  styles.glassLeftStripe,
                  {
                    top: isTablet ? 34 : 28,
                    bottom: isTablet ? 34 : 28,
                  },
                ]}
              />

              <View
                style={[
                  styles.glassCard,
                  {
                    minHeight: metrics.glassCardMinHeight,
                    borderRadius: metrics.glassRadius,
                  },
                ]}
              >
                <View style={styles.glassOverlay} />

                <View
                  style={[
                    styles.glassInner,
                    {
                      paddingHorizontal: isTablet ? 34 : 24,
                      paddingTop: isTablet ? 42 : 34,
                      paddingBottom: isTablet ? 34 : 28,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.heroTitle,
                      {
                        fontSize: metrics.heroTitleSize,
                        lineHeight: metrics.heroLineHeight,
                        maxWidth: isTablet ? 680 : 340,
                        alignSelf: 'center',
                      },
                    ]}
                  >
                    НАЙДИТЕ <Text style={styles.heroAccent}>своего</Text> ПИТОМЦА.
                  </Text>

                  <View style={styles.heroTextLines}>
                    <View style={styles.redLineTop} />
                    <View style={styles.redLineBottom} />
                  </View>

                  <Text
                    style={[
                      styles.heroDescription,
                      {
                        fontSize: metrics.heroDescSize,
                        lineHeight: metrics.heroDescSize * 1.55,
                        maxWidth: isTablet ? 560 : 270,
                      },
                    ]}
                  >
                    Подарите дом тому, кто подходит вам. Мультиплатформа для людей, кто хочет
                    завести питомца или стать хозяином
                  </Text>

                  <View style={styles.startWrap}>
                    <Pressable
                      style={[
                        styles.startButton,
                        {
                          minWidth: metrics.startButtonMinWidth,
                          paddingLeft: isTablet ? 48 : 42,
                          paddingRight: isTablet ? 100 : 86,
                          paddingVertical: isTablet ? 18 : 16,
                        },
                      ]}
                      onPress={onStart}
                    >
                      <Text
                        style={[
                          styles.startButtonText,
                          {
                            fontSize: metrics.buttonTextSize,
                          },
                        ]}
                      >
                        Начать.
                      </Text>

                      <Image
                        source={require('../../assets/top-cat.png')}
                        style={[
                          styles.startCat,
                          {
                            width: isTablet ? 115 : 98,
                            height: isTablet ? 76 : 62,
                            right: isTablet ? 10 : 7,
                            transform: [{ translateY: isTablet ? -28 : -26 }],
                          },
                        ]}
                        contentFit="contain"
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.middleRedStripe} />

        <View
          style={[
            styles.paperCatSection,
            {
              minHeight: metrics.paperSectionMinHeight,
            },
          ]}
        >
          <Image
            source={require('../../assets/paper.jpg')}
            style={styles.paperSectionBg}
            contentFit="cover"
          />

          <View
            style={[
              styles.paperDecorStripe,
              {
                top: isTablet ? 320 : width < 390 ? 180 : 250,
                width: isTablet ? 220 : 150,
                height: isTablet ? 64 : 54,
              },
            ]}
          />
          <View
            style={[
              styles.paperDecorStripeThin,
              {
                top: isTablet ? 320 : width < 390 ? 180 : 250,
                left: isTablet ? 100 : 60,
                width: isTablet ? 260 : 178,
              },
            ]}
          />

          <Image
            source={require('../../assets/big-cat-center.png')}
            style={[
              styles.bigCat,
              {
                width: metrics.bigCatWidth,
                height: metrics.bigCatHeight,
                marginTop: isTablet ? -40 : width < 390 ? -10 : -36,
                marginRight: isTablet ? width * 0.28 : width * 0.42,
              },
            ]}
            contentFit="contain"
          />
        </View>

        <View style={styles.bottomRedStripe} />

        <View style={styles.cardsSection}>
          <Image
            source={require('../../assets/paper.jpg')}
            style={styles.middlePaperBg}
            contentFit="cover"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.cardsRow,
              {
                paddingHorizontal: metrics.horizontalPadding,
              },
            ]}
            bounces={false}
            alwaysBounceHorizontal={false}
            overScrollMode="never"
            snapToInterval={metrics.cardWidth + 18}
            decelerationRate="fast"
            snapToAlignment="start"
          >
            {stories.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.storyCard,
                  {
                    width: metrics.cardWidth,
                    minHeight: isTablet ? 220 : 178,
                    marginRight: index === stories.length - 1 ? 0 : 18,
                  },
                ]}
              >
                <View
                  style={[
                    styles.storyTextColumn,
                    {
                      paddingHorizontal: isTablet ? 14 : 8,
                      paddingTop: isTablet ? 14 : 8,
                      paddingBottom: isTablet ? 16 : 12,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.storyTitle,
                      {
                        fontSize: isTablet ? 20 : 16,
                        lineHeight: isTablet ? 23 : 18,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={[
                      styles.storyBody,
                      {
                        fontSize: isTablet ? 14 : 12,
                        lineHeight: isTablet ? 19 : 16,
                      },
                    ]}
                  >
                    {item.text}
                  </Text>

                  <Pressable
                    style={[
                      styles.readButton,
                      {
                        paddingHorizontal: isTablet ? 26 : 22,
                        paddingVertical: isTablet ? 10 : 8,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.readButtonText,
                        {
                          fontSize: isTablet ? 16 : 14,
                        },
                      ]}
                    >
                      Читать.
                    </Text>
                  </Pressable>
                </View>

                <Image
                  source={item.image}
                  style={[
                    styles.storyImage,
                    {
                      width: metrics.storyImageWidth,
                    },
                  ]}
                  contentFit="cover"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View
          style={[
            styles.footer,
            {
              paddingHorizontal: metrics.horizontalPadding,
              paddingTop: isTablet ? 20 : 14,
              paddingBottom: isTablet ? 28 : 22,
            },
          ]}
        >
          <View
            style={[
              styles.footerTop,
              {
                flexDirection: isTablet ? 'row' : 'column',
                gap: isTablet ? 20 : 24,
              },
            ]}
          >
            <View
              style={[
                styles.footerColumnLeft,
                {
                  width: isTablet ? '58%' : '100%',
                },
              ]}
            >
              <Text style={[styles.footerTitle, { fontSize: metrics.footerTitleSize }]}>
                ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ
              </Text>
              <Text style={[styles.footerLink, { fontSize: metrics.footerLinkSize }]}>
                КОНФИДЕНЦИАЛЬНОСТЬ
              </Text>
              <Text style={[styles.footerLink, { fontSize: metrics.footerLinkSize }]}>
                ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
              </Text>
              <Text style={[styles.footerLink, { fontSize: metrics.footerLinkSize }]}>
                УСЛОВИЯ
              </Text>
              <Text style={[styles.footerLink, { fontSize: metrics.footerLinkSize }]}>О НАС</Text>
              <Text style={[styles.footerLink, { fontSize: metrics.footerLinkSize }]}>
                КОНТАКТЫ
              </Text>

              <Text
                style={[
                  styles.footerTitleSpacing,
                  {
                    fontSize: metrics.footerTitleSize,
                  },
                ]}
              >
                ЧАСТЫЕ ВОПРОСЫ
              </Text>
              <Text style={[styles.footerSmallLink, { fontSize: metrics.footerSmallSize }]}>
                ТРАЛАЛА ДЕЛО?
              </Text>
              <Text style={[styles.footerSmallLink, { fontSize: metrics.footerSmallSize }]}>
                ШИМИШАНШИНИ БАНАНИНИ ИЗИ ПУПИ?
              </Text>
              <Text style={[styles.footerSmallLink, { fontSize: metrics.footerSmallSize }]}>
                НЕГРО СТЕФАНО?
              </Text>
              <Text style={[styles.footerSmallLink, { fontSize: metrics.footerSmallSize }]}>
                ТРАЛАЛА ДЕЛО?
              </Text>
              <Text style={[styles.footerSmallLink, { fontSize: metrics.footerSmallSize }]}>
                ШИМИШАНШИНИ
              </Text>
              <Text style={[styles.footerSmallLink, { fontSize: metrics.footerSmallSize }]}>
                НИГРОНЕНАШВЕДОВУИИЕ?
              </Text>
            </View>

            <View
              style={[
                styles.footerColumnRight,
                {
                  width: isTablet ? '34%' : '100%',
                },
              ]}
            >
              <Text style={[styles.footerTitle, { fontSize: metrics.footerTitleSize }]}>
                СОЦИАЛЬНЫЕ СЕТИ
              </Text>

              <View style={styles.socialsRow}>
                <Text style={[styles.socialIcon, { fontSize: metrics.socialIconSize }]}>◎</Text>
                <Text style={[styles.socialIcon, { fontSize: metrics.socialIconSize }]}>f</Text>
                <Text style={[styles.socialIcon, { fontSize: metrics.socialIconSize }]}>𝕏</Text>
                <Text style={[styles.socialIcon, { fontSize: metrics.socialIconSize }]}>▶</Text>
                <Text style={[styles.socialIcon, { fontSize: metrics.socialIconSize }]}>✈</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerBottomLine} />

          <View
            style={[
              styles.footerBrandRow,
              {
                marginTop: isTablet ? 20 : 16,
              },
            ]}
          >
            <Text style={[styles.vexaText, { fontSize: metrics.vexaSize }]}>VEXA</Text>

            <View style={styles.footerMiniCenterBlock}>
              <Image
                source={require('../../assets/big-cat.png')}
                style={{
                  width: isTablet ? 160 : 132,
                  height: isTablet ? 160 : 132,
                }}
                contentFit="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#d9d3c5',
  },

  content: {
    flexGrow: 1,
  },

  page: {
    minHeight: '100%',
    backgroundColor: '#d9d3c5',
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: 0,
  },

  videoTopSection: {
    position: 'relative',
    overflow: 'hidden',
  },

  videoTopBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  videoTopOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(172, 182, 171, 0.28)',
  },

  topRedStripeWide: {
    position: 'absolute',
    top: 0,
    backgroundColor: RED,
    zIndex: 1,
  },

  topRedStripeThin: {
    position: 'absolute',
    top: 0,
    width: 4,
    backgroundColor: CREAM,
    zIndex: 1,
  },

  topRat: {
    position: 'absolute',
    height: 50,
  },


  topContent: {
    flex: 1,
    justifyContent: 'flex-start',
    zIndex: 4,
  },

  headerRow: {
    zIndex: 4,
  },

  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  profileCircle: {
    borderRadius: 999,
    backgroundColor: CREAM,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  loginButton: {
    backgroundColor: CREAM,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    color: OLIVE,
    fontWeight: '900',
  },

  glassCardWrap: {
    position: 'relative',
    zIndex: 3,
  },

  glassLeftStripe: {
    position: 'absolute',
    left: -10,
    width: 10,
    backgroundColor: RED,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 4,
  },

  glassCard: {
    overflow: 'hidden',
    borderWidth: 10,
    borderColor: CREAM,
    backgroundColor: 'rgba(230, 234, 228, 0.22)',
    zIndex: 3,
  },

  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(225, 231, 226, 0.30)',
  },

  glassInner: {
    flex: 1,
    justifyContent: 'space-between',
  },

  heroTitle: {
    color: '#f1eee7',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },

  heroAccent: {
    color: '#b11f22',
    fontStyle: 'italic',
  },

  heroTextLines: {
    alignItems: 'center',
    marginBottom: 8,
  },

  redLineTop: {
    width: 76,
    height: 2,
    backgroundColor: '#a34545',
    marginBottom: 14,
  },

  redLineBottom: {
    width: 52,
    height: 2,
    backgroundColor: '#a34545',
  },

  heroDescription: {
    color: TEXT_LIGHT,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },

  startWrap: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 18,
    justifyContent: 'center',
  },

  startButton: {
    backgroundColor: '#e4d4bd',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  startCat: {
    position: 'absolute',
    top: '-60%',
    zIndex: 2,
  },

  startButtonText: {
    color: OLIVE,
    fontWeight: '900',
    alignSelf: 'flex-start',
  },

  middleRedStripe: {
    height: 14,
    backgroundColor: RED,
    zIndex: 3,
  },

  paperCatSection: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#e7dece',
  },

  paperSectionBg: {
    ...StyleSheet.absoluteFillObject,
  },

  paperDecorStripe: {
    position: 'absolute',
    right: 0,
    backgroundColor: RED,
    zIndex: 1,
  },

  paperDecorStripeThin: {
    position: 'absolute',
    height: 6,
    backgroundColor: CREAM,
    zIndex: 2,
  },

  bigCat: {
    alignSelf: 'center',
    zIndex: 3,
  },

  bottomRedStripe: {
    height: 14,
    backgroundColor: RED,
    zIndex: 3,
  },

  cardsSection: {
    backgroundColor: '#e7dece',
    paddingTop: 18,
    paddingBottom: 14,
    position: 'relative',
  },

  middlePaperBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },

  cardsRow: {},

  storyCard: {
    backgroundColor: '#d9cfb8',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  storyTextColumn: {
    flex: 1,
  },

  storyTitle: {
    color: OLIVE,
    fontWeight: '900',
    marginBottom: 8,
  },

  storyBody: {
    color: '#8b8c6f',
    marginBottom: 18,
  },

  storyImage: {
    height: '100%',
  },

  readButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#e2d6c4',
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  readButtonText: {
    color: OLIVE,
    fontWeight: '900',
  },

  footer: {
    backgroundColor: DARK,
    minHeight: 340,
    position: 'relative',
    overflow: 'hidden',
  },

  footerTop: {
    justifyContent: 'space-between',
    zIndex: 2,
  },

  footerColumnLeft: {},

  footerColumnRight: {},

  footerTitle: {
    color: '#ffffff',
    fontWeight: '900',
    marginBottom: 8,
  },

  footerTitleSpacing: {
    color: '#ffffff',
    fontWeight: '900',
    marginTop: 18,
    marginBottom: 6,
  },

  footerLink: {
    color: '#f4f4f4',
    marginBottom: 6,
  },

  footerSmallLink: {
    color: '#f4f4f4',
    marginBottom: 2,
  },

  socialsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },

  socialIcon: {
    color: '#ffffff',
    fontWeight: '800',
  },

  footerBottomLine: {
    marginTop: 16,
    height: 2,
    backgroundColor: '#d7d2ca',
    zIndex: 2,
  },

  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },

  vexaText: {
    color: '#ffffff',
    fontWeight: '900',
    letterSpacing: 1,
  },

  footerMiniCenterBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});