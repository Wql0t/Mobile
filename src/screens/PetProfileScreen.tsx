import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

type PetCard = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: any;
};

type Props = {
  pet: PetCard | null;
  onBack?: () => void;
  onAchievementsPress?: () => void;
};

export function PetProfileScreen({ pet, onBack, onAchievementsPress }: Props) {
  const { width, height } = useWindowDimensions();
  const [tabOpen, setTabOpen] = useState(false);

  const isTablet = width >= 768;
  const isSmall = width < 360;

  const ui = useMemo(() => {
    return {
      headerHeight: isTablet ? 250 : 170,
      profileCardTop: isTablet ? -36 : -26,
      profileAvatar: isTablet ? 92 : 72,
      pageWidth: isTablet ? Math.min(width * 0.82, 620) : width - 22,
      cardWidth: isTablet ? Math.min(width * 0.56, 360) : Math.min(width * 0.7, 250),
      cardImageHeight: isTablet ? 300 : 200,
      petNameSize: isTablet ? 26 : 18,
      petSubSize: isTablet ? 18 : 14,
      descSize: isTablet ? 15 : 12,
      floatingBtnSize: isTablet ? 54 : 44,
      tabWidth: isTablet ? 180 : 132,
    };
  }, [width, isTablet]);

  const petData = pet ?? {
    id: 'stub',
    title: 'Жучка',
    subtitle: '7 мес',
    description:
      'Практический опыт показывает, что сложившаяся структура организации способствует повышению актуальности существующих финансовых и административных условий.',
    image: require('../../assets/icon.png'),
  };

  return (
    <ImageBackground source={require('../../assets/bgg.jpg')} style={s.root} resizeMode="cover">
      <SafeAreaView style={s.safe}>
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          <View style={[s.header, { height: ui.headerHeight }]}>
            <ImageBackground
              source={require('../../assets/bg.png')}
              style={s.headerBg}
              resizeMode="cover"
            >
              <View style={s.headerTopRow}>
                <Pressable onPress={onBack} style={s.backBtn}>
                  <Text style={s.backBtnText}>←</Text>
                </Pressable>

                <Pressable style={s.settingsBtn}>
                  <Image
                    source={require('../../assets/setting.png')}
                    style={s.settingsIcon}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            </ImageBackground>
          </View>

          <View style={[s.profileBlock, { marginTop: ui.profileCardTop }]}>
            <View style={s.profileCard}>
              <View style={[s.avatarWrap, { width: ui.profileAvatar, height: ui.profileAvatar }]}>
                <Image
                  source={require('../../assets/ava.png')}
                  style={[
                    s.avatar,
                    {
                      width: ui.profileAvatar,
                      height: ui.profileAvatar,
                      borderRadius: ui.profileAvatar / 2,
                    },
                  ]}
                />
              </View>

              <View style={s.profileText}>
                <Text style={s.profileName}>Иван Иванов</Text>
                <Text style={s.profileMeta}>nikikudooo@gmail.com</Text>
                <Text style={s.profileMeta}>Тула, Россия</Text>
              </View>

              <Image
                source={require('../../assets/star.png')}
                style={s.profileStar}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={s.bookArea}>
            <View style={[s.bookWrap, { width: ui.pageWidth }]}>
              <ImageBackground
                source={require('../../assets/book1.png')}
                style={s.bookBg}
                resizeMode="stretch"
              >
                <View style={s.bookInner}>
                  <View style={[s.petCard, { width: ui.cardWidth }]}>
                    <Image
                      source={petData.image}
                      style={[s.petImage, { height: ui.cardImageHeight }]}
                      resizeMode="cover"
                    />

                    <View style={s.petCardBody}>
                      <Text style={[s.petName, { fontSize: ui.petNameSize }]}>
                        {petData.title}
                        {!!petData.subtitle && (
                          <Text style={[s.petSubtitle, { fontSize: ui.petSubSize }]}>
                            {`, ${petData.subtitle}`}
                          </Text>
                        )}
                      </Text>

                      <View style={s.petDivider} />

                      <Text
                        style={[
                          s.petDescription,
                          {
                            fontSize: ui.descSize,
                            lineHeight: ui.descSize * 1.45,
                          },
                        ]}
                      >
                        {petData.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>

              <Pressable
                onPress={() => setTabOpen((v) => !v)}
                style={[
                  s.sideTab,
                  {
                    width: ui.tabWidth,
                    right: tabOpen ? 0 : -(ui.tabWidth - 34),
                  },
                ]}
              >
                <Text style={s.sideTabText}>Ачивки</Text>
              </Pressable>

              {tabOpen ? (
                <View style={s.sideTabPanel}>
                  <Pressable onPress={onAchievementsPress} style={s.achievementItem}>
                    <Text style={s.achievementText}>Открыть ачивки</Text>
                  </Pressable>
                  <View style={s.achievementItem}>
                    <Text style={s.achievementText}>Первая анкета</Text>
                  </View>
                  <View style={s.achievementItem}>
                    <Text style={s.achievementText}>10 лайков</Text>
                  </View>
                  <View style={s.achievementItem}>
                    <Text style={s.achievementText}>Любимец дня</Text>
                  </View>
                </View>
              ) : null}

              <Pressable style={[s.floatAction, { width: ui.floatingBtnSize, height: ui.floatingBtnSize }]}>
                <Text style={s.floatActionText}>▶</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  content: { paddingBottom: 24 },

  header: {
    width: '100%',
    overflow: 'hidden',
  },
  headerBg: {
    flex: 1,
  },
  headerTopRow: {
    paddingHorizontal: 14,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 22,
    height: 22,
  },

  profileBlock: {
    paddingHorizontal: 12,
    zIndex: 5,
  },
  profileCard: {
    minHeight: 92,
    borderRadius: 18,
    backgroundColor: 'rgba(245, 240, 228, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  avatarWrap: {
    overflow: 'hidden',
    marginRight: 10,
  },
  avatar: {
    backgroundColor: '#ddd',
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#463d2a',
  },
  profileMeta: {
    fontSize: 12,
    color: '#746b57',
  },
  profileStar: {
    position: 'absolute',
    right: 10,
    top: 8,
    width: 42,
    height: 42,
  },

  bookArea: {
    paddingHorizontal: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  bookWrap: {
    position: 'relative',
    minHeight: 470,
  },
  bookBg: {
    width: '100%',
    minHeight: 470,
    overflow: 'hidden',
  },
  bookInner: {
    paddingTop: 54,
    paddingBottom: 40,
    alignItems: 'center',
  },

  petCard: {
    borderRadius: 34,
    overflow: 'hidden',
    backgroundColor: '#7e8b4e',
    padding: 12,
  },
  petImage: {
    width: '100%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#ddd',
  },
  petCardBody: {
    backgroundColor: '#f3f1ea',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  petName: {
    color: '#6f7747',
    fontWeight: '400',
  },
  petSubtitle: {
    color: '#6f7747',
  },
  petDivider: {
    height: 2,
    backgroundColor: '#85905b',
    marginVertical: 6,
  },
  petDescription: {
    color: '#6a6d55',
  },

  sideTab: {
    position: 'absolute',
    top: 100,
    height: 54,
    backgroundColor: '#b9ab88',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    justifyContent: 'center',
    paddingLeft: 16,
    zIndex: 20,
  },
  sideTabText: {
    color: '#3d3526',
    fontWeight: '800',
  },
  sideTabPanel: {
    position: 'absolute',
    top: 154,
    right: 0,
    width: 180,
    backgroundColor: 'rgba(243, 239, 228, 0.98)',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    padding: 10,
    gap: 8,
    zIndex: 19,
  },
  achievementItem: {
    backgroundColor: '#d8d1bf',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  achievementText: {
    color: '#4c4534',
    fontWeight: '700',
  },

  floatAction: {
    position: 'absolute',
    right: 8,
    top: '48%',
    borderRadius: 999,
    backgroundColor: 'rgba(207, 202, 182, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatActionText: {
    fontSize: 22,
    color: '#7d8456',
    marginLeft: 2,
  },
});