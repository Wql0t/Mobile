import { StatusBar } from 'expo-status-bar';
import { ResizeMode, Video } from 'expo-av';
import type { AVPlaybackSource } from 'expo-av';
import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './authStyles';

type Props = PropsWithChildren<{
  videoSource: AVPlaybackSource;
}>;

export function AuthScaffold({ videoSource, children }: Props) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />

      <Video
        isLooping
        isMuted
        shouldPlay
        resizeMode={ResizeMode.COVER}
        source={videoSource}
        style={styles.bgVideo}
      />
      <View pointerEvents="none" style={styles.bgTint} />

      <View pointerEvents="none" style={styles.linesWrap}>
        <View style={[styles.line, { top: 118 }]} />
        <View style={[styles.line, { top: 194 }]} />
        <View style={[styles.line, { top: 270 }]} />
        <View style={[styles.line, { top: 346 }]} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

