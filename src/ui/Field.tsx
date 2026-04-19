import type React from 'react';
import { TextInput, View } from 'react-native';
import { COLORS, styles } from './authStyles';

export function Field(props: React.ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.fieldWrap}>
      <TextInput
        placeholderTextColor={COLORS.placeholder}
        {...props}
        style={[styles.field, props.style]}
      />
    </View>
  );
}

