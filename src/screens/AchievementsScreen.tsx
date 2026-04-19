import React from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  onBack?: () => void;
};

export function AchievementsScreen({ onBack }: Props) {
  return (
    <ImageBackground source={require('../../assets/paper.jpg')} style={s.root} resizeMode="cover">
      <SafeAreaView style={s.safe}>
        <View style={s.topRow}>
          <Pressable onPress={onBack} style={s.backBtn}>
            <Text style={s.backBtnText}>←</Text>
          </Pressable>
          <Text style={s.title}>Ачивки</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={s.content}>
          {['Первая анкета', '10 лайков', '50 свайпов', 'Любимец дня', 'Супер хозяин'].map((item) => (
            <View key={item} style={s.card}>
              <Text style={s.cardTitle}>{item}</Text>
              <Text style={s.cardText}>Описание ачивки в таком же визуальном стиле.</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  topRow: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontSize: 24,
    color: '#5f6843',
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4d4637',
  },
  content: {
    padding: 14,
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(250,245,235,0.95)',
    borderRadius: 18,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#5f6843',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#5a584a',
  },
});