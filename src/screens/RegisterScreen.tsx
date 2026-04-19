import { useMemo, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  useWindowDimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import { AuthScaffold } from '../ui/AuthScaffold';
import { Field } from '../ui/Field';
import { styles } from '../ui/authStyles';

type Props = {
  onBack?: () => void;
  onSubmit?: (params: { name: string; email: string; city: string; password: string }) => void;
};

export function RegisterScreen({ onBack, onSubmit }: Props) {
  const { width, height } = useWindowDimensions();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = useMemo(
    () => Boolean(name.trim() && email.trim() && city.trim() && password.trim()),
    [name, email, city, password]
  );

  const isSmall = width < 360;
  const isTablet = width >= 768;
  const isShort = height < 700;

  const ui = useMemo(() => {
    return {
      titleFontSize: isTablet ? 40 : isSmall ? 24 : 30,
      titleLineHeight: isTablet ? 46 : isSmall ? 28 : 34,

      formGap: isTablet ? 18 : isSmall ? 10 : 14,
      formMarginTop: isTablet ? 32 : isShort ? 18 : 24,
      formWidth: isTablet ? Math.min(width * 0.62, 520) : Math.min(width * 0.88, 380),

      buttonWidth: isTablet ? 320 : Math.min(width * 0.78, 300),
      buttonPaddingVertical: isTablet ? 18 : isSmall ? 12 : 15,

      footerMarginTop: isTablet ? 26 : isSmall ? 16 : 20,
      footerFontSize: isTablet ? 16 : isSmall ? 13 : 14,
      linkFontSize: isTablet ? 16 : isSmall ? 13 : 14,

      fieldMinHeight: isTablet ? 58 : isSmall ? 46 : 52,
      horizontalPadding: isTablet ? 24 : 16,

      backCircleSize: isTablet ? 58 : 50,
      backBottom: isTablet ? 34 : 24,
      backLeft: isTablet ? 28 : 18,
      backArrowSize: isTablet ? 28 : 24,
    };
  }, [isTablet, isSmall, isShort, width]);

  return (
    <AuthScaffold videoSource={require('../../assets/vid.mp4')}>
      <Text
        style={[
          styles.title,
          {
            fontSize: ui.titleFontSize,
            lineHeight: ui.titleLineHeight,
            paddingHorizontal: ui.horizontalPadding,
            textAlign: 'center',
          },
        ]}
      >
        ДАВАЙТЕ{'\n'}ЗНАКОМИТЬСЯ!
      </Text>

      <View
        style={[
          styles.form,
          {
            marginTop: ui.formMarginTop,
            width: ui.formWidth,
            alignSelf: 'center',
            gap: ui.formGap,
          },
        ]}
      >
        <Field
          style={{ minHeight: ui.fieldMinHeight }}
          placeholder="ВАШЕ ИМЯ"
          placeholderTextColor="#ffffff"
          value={name}
          onChangeText={setName}
          textContentType="name"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Field
          style={{ minHeight: ui.fieldMinHeight }}
          placeholder="ВАШ EMAIL"
          placeholderTextColor="#ffffff"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Field
          style={{ minHeight: ui.fieldMinHeight }}
          placeholder="ВАШ ГОРОД"
          placeholderTextColor="#ffffff"
          value={city}
          onChangeText={setCity}
          textContentType="addressCity"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Field
          style={{ minHeight: ui.fieldMinHeight }}
          placeholder="ПРИДУМАЙТЕ ПАРОЛЬ"
          placeholderTextColor="#ffffff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType={Platform.OS === 'ios' ? 'newPassword' : 'password'}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.submitRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Регистрация"
          style={({ pressed }) => [
            styles.submit,
            {
              width: ui.buttonWidth,
              minHeight: ui.fieldMinHeight,
              paddingVertical: ui.buttonPaddingVertical,
              alignSelf: 'center',
            },
            !canSubmit && styles.submitDisabled,
            pressed && styles.pressed,
          ]}
          disabled={!canSubmit}
          onPress={() => onSubmit?.({ name, email, city, password })}
        >
          <Text
            style={[
              styles.submitText,
              {
                fontSize: isTablet ? 18 : isSmall ? 14 : 16,
              },
            ]}
          >
            РЕГИСТРАЦИЯ
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.authFooter,
          {
            marginTop: ui.footerMarginTop,
            paddingHorizontal: ui.horizontalPadding,
          },
        ]}
      >
        <View
          style={[
            styles.authFooterRow,
            {
              flexWrap: 'wrap',
              justifyContent: 'center',
              rowGap: 6,
            },
          ]}
        >
          <Text
            style={[
              styles.authFooterMuted,
              {
                fontSize: ui.footerFontSize,
                textAlign: 'center',
              },
            ]}
          >
            Уже есть аккаунт?
          </Text>

          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Войти"
            onPress={onBack}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text
              style={[
                styles.authFooterLink,
                {
                  fontSize: ui.linkFontSize,
                  textAlign: 'center',
                },
              ]}
            >
              Войти
            </Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Назад на главную"
        onPress={onBack}
        style={({ pressed }) => [
          localStyles.backCircle,
          {
            width: ui.backCircleSize,
            height: ui.backCircleSize,
            borderRadius: ui.backCircleSize / 2,
            left: ui.backLeft,
            bottom: ui.backBottom,
          },
          pressed && localStyles.backCirclePressed,
        ]}
      >
        <Text
          style={[
            localStyles.backArrow,
            {
              fontSize: ui.backArrowSize,
            },
          ]}
        >
          ←
        </Text>
      </Pressable>
    </AuthScaffold>
  );
}

const localStyles = StyleSheet.create({
  backCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.95)',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  backCirclePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  backArrow: {
    color: '#5f6843',
    fontWeight: '700',
    marginLeft: -2,
  },
});