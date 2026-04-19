import { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FONTS } from '../ui/authStyles';

type CardPage = {
  title: string;
  subtitle: string;
  description: string;
  image: number;
};

type Props = {
  name?: string;
  email?: string;
  location?: string;
  onSettings?: () => void;
  onSavedPress?: () => void;
};

export function ProfileScreen({
  name = 'Иван Иванов',
  email = 'ivan@example.com',
  location = 'Тула, Россия',
  onSettings,
  onSavedPress,
}: Props) {
  const { width, height } = useWindowDimensions();

  const isSmall = width < 360;
  const isTablet = width >= 768;
  const isShort = height < 700;

  const ui = useMemo(() => {
    const HEADER_H = isTablet
      ? Math.min(280, Math.round(height * 0.24))
      : Math.min(220, Math.round(height * 0.26));

    const AVATAR = isTablet ? 128 : isSmall ? 84 : 100;
    const AVATAR_IN_HEADER = AVATAR * 0.5;

    const CARD_MAX_W = isTablet
      ? Math.min(width * 0.54, 380)
      : Math.min(width * 0.78, 300);

    const cardImageH = isTablet
      ? Math.min(240, Math.round(height * 0.22))
      : Math.min(isSmall ? 170 : 200, Math.round(height * 0.22));

    const bookSectionMinH = isTablet
      ? Math.min(height * 0.52, 560)
      : Math.min(height * 0.56, 500);

    const bookClipMinH = isTablet
      ? Math.min(height * 0.48, 520)
      : Math.min(height * 0.52, 460);

    return {
      HEADER_H,
      AVATAR,
      AVATAR_IN_HEADER,
      CARD_MAX_W,
      cardImageH,
      bookSectionMinH,
      bookClipMinH,

      screenMinHeight: height - HEADER_H + AVATAR_IN_HEADER,

      horizontalPad: isTablet ? 24 : 16,
      headerTopPad: isTablet ? 12 : 8,
      headerSidePad: isTablet ? 20 : 14,

      settingsBtnSize: isTablet ? 44 : 38,
      settingsIconSize: isTablet ? 24 : 22,

      identityPad: isTablet ? 14 : 10,
      identityRadius: isTablet ? 26 : 22,
      identityGap: isTablet ? 18 : 14,

      profileNameSize: isTablet ? 28 : isSmall ? 18 : 21,
      profileNameLineHeight: isTablet ? 34 : isSmall ? 22 : 26,

      metaLabelSize: isTablet ? 11 : 10,
      emailSize: isTablet ? 15 : 13,
      locationSize: isTablet ? 16 : 14,

      savedMarginTop: isTablet ? 20 : 16,
      savedPadY: isTablet ? 10 : 8,
      savedPadX: isTablet ? 26 : 22,
      savedTextSize: isTablet ? 16 : 14,

      bookMarginTop: isTablet ? 24 : 18,
      bookSidePad: isTablet ? 20 : 8,
      bookForegroundPadX: isTablet ? 22 : 12,
      bookForegroundPadTop: isTablet ? 28 : 22,
      bookForegroundPadBottom: isTablet ? 24 : 18,

      cardRadius: isTablet ? 18 : 14,
      cardBodyPad: isTablet ? 16 : 12,
      cardTitleSize: isTablet ? 22 : 18,
      cardSubtitleSize: isTablet ? 17 : 15,
      cardTextSize: isTablet ? 15 : 13.5,
      cardTextLineHeight: isTablet ? 21 : 19,

      pageArrowSize: isTablet ? 48 : 42,
      pageArrowRight: isTablet ? -8 : -4,
      pageArrowFontSize: isTablet ? 22 : 20,

      savedChevronSize: isTablet ? 17 : 15,
      bodyBottomPad: isTablet ? 40 : 32,
    };
  }, [width, height, isTablet, isSmall, isShort]);

  const [bookPage, setBookPage] = useState<0 | 1>(0);

  const cards = useMemo<CardPage[]>(
    () => [
      {
        title: 'Гречка',
        subtitle: '67 мес',
        description:
          'Практический опыт показывает, что сложившаяся структура организации способствует повышению актуальности существующих финансовых и административных условий.',
        image: require('../../assets/icon.png'),
      },
      {
        title: 'Мурзик',
        subtitle: '24 мес',
        description:
          'Разнообразный и богатый опыт говорит о том, что новая модель организационной деятельности требует анализа дальнейших направлений развития.',
        image: require('../../assets/icon.png'),
      },
    ],
    []
  );

  const currentCard = cards[bookPage];
  const bookAsset =
    bookPage === 0 ? require('../../assets/book1.png') : require('../../assets/book2.png');

  function flipBook() {
    setBookPage((p) => (p === 0 ? 1 : 0));
  }

  return (
    <View style={s.root}>
      <StatusBar style="dark" />
      <SafeAreaView style={s.safe}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[s.headerShell, { height: ui.HEADER_H }]}>
            <ImageBackground
              source={require('../../assets/bg.png')}
              style={s.headerBg}
              imageStyle={s.headerBgImage}
              resizeMode="cover"
            >
              <View
                style={[
                  s.headerTopRow,
                  {
                    paddingTop: ui.headerTopPad,
                    paddingHorizontal: ui.headerSidePad,
                  },
                ]}
              >
                <View style={s.headerSpacer} />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Настройки"
                  onPress={() => onSettings?.()}
                  style={({ pressed }) => [
                    s.settingsBtn,
                    {
                      width: ui.settingsBtnSize,
                      height: ui.settingsBtnSize,
                      borderRadius: ui.settingsBtnSize / 2,
                    },
                    pressed && s.pressed,
                  ]}
                >
                  <Image
                    source={require('../../assets/setting.png')}
                    style={{
                      width: ui.settingsIconSize,
                      height: ui.settingsIconSize,
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            </ImageBackground>
          </View>

          <ImageBackground
            source={require('../../assets/bgg.jpg')}
            style={[s.bodyBg, { minHeight: ui.screenMinHeight, paddingBottom: ui.bodyBottomPad }]}
            imageStyle={s.bodyBgImage}
            resizeMode="cover"
          >
            <View
              style={[
                s.identityBlock,
                {
                  marginTop: -ui.AVATAR_IN_HEADER,
                  paddingHorizontal: ui.horizontalPad,
                },
              ]}
            >
              <View
                style={[
                  s.identityCard,
                  {
                    borderRadius: ui.identityRadius,
                    padding: ui.identityPad,
                  },
                ]}
              >
                <View style={[s.identityRow, { gap: ui.identityGap }]}>
                  <View
                    style={[
                      s.avatarWrap,
                      {
                        width: ui.AVATAR,
                        height: ui.AVATAR,
                      },
                    ]}
                  >
                    <Image
                      source={require('../../assets/ava.png')}
                      style={[
                        s.avatar,
                        {
                          width: ui.AVATAR,
                          height: ui.AVATAR,
                          borderRadius: ui.AVATAR / 2,
                        },
                      ]}
                      resizeMode="cover"
                    />
                  </View>

                  <View
                    style={[
                      s.textPanel,
                      {
                        paddingVertical: isTablet ? 10 : 8,
                        paddingHorizontal: isTablet ? 12 : 10,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        s.profileName,
                        {
                          fontSize: ui.profileNameSize,
                          lineHeight: ui.profileNameLineHeight,
                          marginBottom: isTablet ? 12 : 10,
                        },
                      ]}
                      numberOfLines={2}
                    >
                      {name}
                    </Text>

                    <View style={s.metaLine}>
                      <Text
                        style={[
                          s.metaLabel,
                          {
                            fontSize: ui.metaLabelSize,
                          },
                        ]}
                      >
                        email
                      </Text>
                      <Text
                        style={[
                          s.profileEmail,
                          {
                            fontSize: ui.emailSize,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {email}
                      </Text>
                    </View>

                    <View style={s.metaLine}>
                      <Text
                        style={[
                          s.metaLabel,
                          {
                            fontSize: ui.metaLabelSize,
                          },
                        ]}
                      >
                        город
                      </Text>
                      <Text
                        style={[
                          s.profileLocation,
                          {
                            fontSize: ui.locationSize,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {location}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <Pressable
              onPress={() => onSavedPress?.()}
              style={({ pressed }) => [
                s.savedPill,
                {
                  marginTop: ui.savedMarginTop,
                  paddingVertical: ui.savedPadY,
                  paddingHorizontal: ui.savedPadX,
                },
                pressed && s.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Сохранённые"
            >
              <Text
                style={[
                  s.savedPillText,
                  {
                    fontSize: ui.savedTextSize,
                  },
                ]}
              >
                Сохранённые
              </Text>
              <Text
                style={[
                  s.savedChevron,
                  {
                    fontSize: ui.savedChevronSize,
                  },
                ]}
              >
                {'\u2304'}
              </Text>
            </Pressable>

            <View
              style={[
                s.bookSection,
                {
                  marginTop: ui.bookMarginTop,
                  paddingHorizontal: ui.bookSidePad,
                  minHeight: ui.bookSectionMinH,
                },
              ]}
            >
              <View style={[s.bookClip, { minHeight: ui.bookClipMinH }]}>
                <ImageBackground
                  source={bookAsset}
                  style={s.bookBg}
                  imageStyle={s.bookBgImage}
                  resizeMode="cover"
                />

                <View
                  style={[
                    s.bookForeground,
                    {
                      paddingHorizontal: ui.bookForegroundPadX,
                      paddingTop: ui.bookForegroundPadTop,
                      paddingBottom: ui.bookForegroundPadBottom,
                    },
                  ]}
                >
                  <View
                    style={[
                      s.cardShell,
                      {
                        maxWidth: ui.CARD_MAX_W,
                      },
                    ]}
                  >
                    <View
                      style={[
                        s.card,
                        {
                          borderRadius: ui.cardRadius,
                        },
                      ]}
                    >
                      <Image
                        source={currentCard.image}
                        style={[s.cardImage, { height: ui.cardImageH }]}
                        resizeMode="cover"
                      />
                      <View style={[s.cardBody, { padding: ui.cardBodyPad }]}>
                        <Text
                          style={[
                            s.cardTitle,
                            {
                              fontSize: ui.cardTitleSize,
                            },
                          ]}
                        >
                          {currentCard.title}
                          <Text
                            style={[
                              s.cardSubtitle,
                              {
                                fontSize: ui.cardSubtitleSize,
                              },
                            ]}
                          >
                            {' '}
                            {currentCard.subtitle}
                          </Text>
                        </Text>

                        <View style={s.divider} />

                        <Text
                          style={[
                            s.cardText,
                            {
                              fontSize: ui.cardTextSize,
                              lineHeight: ui.cardTextLineHeight,
                            },
                          ]}
                        >
                          {currentCard.description}
                        </Text>
                      </View>
                    </View>

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Следующая страница"
                      onPress={flipBook}
                      style={({ pressed }) => [
                        s.pageArrow,
                        {
                          right: ui.pageArrowRight,
                          width: ui.pageArrowSize,
                          height: ui.pageArrowSize,
                          borderRadius: ui.pageArrowSize / 2,
                        },
                        pressed && s.pressed,
                      ]}
                    >
                      <Text
                        style={[
                          s.pageArrowText,
                          {
                            fontSize: ui.pageArrowFontSize,
                          },
                        ]}
                      >
                        →
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#2a2820',
  },

  safe: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  headerShell: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#1a1a14',
    zIndex: 0,
  },

  headerBg: {
    width: '100%',
    height: '100%',
  },

  headerBgImage: {
    width: '100%',
    height: '100%',
  },

  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  headerSpacer: {
    flex: 1,
  },

  settingsBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.26)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  bodyBg: {
    width: '100%',
  },

  bodyBgImage: {
    opacity: 1,
  },

  identityBlock: {
    paddingBottom: 6,
    zIndex: 2,
  },

  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.46)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 28px rgba(0,0,0,0.10)',
      },
      default: {},
    }),
  },

  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatarWrap: {
    marginTop: 2,
  },

  avatar: {
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.95)',
    backgroundColor: '#c8c4bc',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  textPanel: {
    flex: 1,
    minWidth: 0,
  },

  profileName: {
    fontFamily: FONTS.title,
    fontWeight: '700',
    color: '#1a1914',
    letterSpacing: 0.2,
  },

  metaLine: {
    marginTop: 6,
  },

  metaLabel: {
    fontWeight: '700',
    color: '#6F7A50',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 2,
    fontFamily: FONTS.ui,
  },

  profileEmail: {
    color: '#33322c',
    fontFamily: FONTS.ui,
  },

  profileLocation: {
    fontWeight: '600',
    color: '#2a2820',
    fontFamily: FONTS.ui,
  },

  pressed: {
    opacity: 0.88,
  },

  savedPill: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: 'rgba(85, 96, 59, 0.75)',
    backgroundColor: 'rgba(255,255,255,0.45)',
  },

  savedPillText: {
    color: '#3d4528',
    fontWeight: '800',
  },

  savedChevron: {
    color: '#3d4528',
    fontWeight: '800',
  },

  bookSection: {
    flex: 1,
  },

  bookClip: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },

  bookBg: {
    ...StyleSheet.absoluteFillObject,
  },

  bookBgImage: {
    width: '100%',
    height: '100%',
  },

  bookForeground: {
    position: 'relative',
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
  },

  cardShell: {
    position: 'relative',
    width: '100%',
    alignSelf: 'center',
  },

  card: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
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
    backgroundColor: 'rgba(61,59,47,0.28)',
    marginTop: 6,
    marginBottom: 6,
  },

  cardText: {
    color: '#5A574A',
  },

  pageArrow: {
    position: 'absolute',
    bottom: '30%',
    backgroundColor: 'rgba(111, 122, 80, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },

  pageArrowText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 2,
  },
});