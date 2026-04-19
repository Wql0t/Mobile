import { Platform, StyleSheet } from 'react-native';

export const COLORS = {
  olive: '#6F7A50',
  oliveDark: '#55603B',
  bg: '#0D1A10',
  input: 'rgba(237, 228, 212, 0.12)', 
  placeholder: '#7E8663',
  text: '#EDEBD8',
} as const;

export const FONTS = {
  title: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }),
  ui: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }),
} as const;

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  bgVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  bgTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 26, 16, 0.48)',
  },
  linesWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(111, 122, 80, 0.55)',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 34,
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleScrim2: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: 74,
    height: 95,
    borderRadius: 26,
    backgroundColor: 'rgba(13, 26, 16, 0.48)',
  },
  titleScrim: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: 72,
    height: 60,
    borderRadius: 26,
    backgroundColor: 'rgba(13, 26, 16, 0.48)',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(229, 216, 186, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(237, 228, 212, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
      }
    })
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 28,
    marginTop: -2,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 44,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    marginTop: 100,
    marginBottom: 6,
    fontFamily: FONTS.title,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  authFooter: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  authFooterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  authFooterMuted: {
    color: 'rgba(237, 235, 216, 0.88)',
    fontSize: 14,
    fontFamily: FONTS.ui,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  authFooterLink: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.ui,
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(255,255,255,0.55)',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  card: {
    marginTop: 6,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(237, 228, 212, 0.18)',
    backgroundColor: 'rgba(13, 26, 16, 0.30)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px) saturate(160%)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    })
  },
  form: {
    gap: 14,
    color: '#ffffff',
    marginTop: 2,
  },
  fieldWrap: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(15px)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      }
    })
  },
  field: {
    height: 46,
    paddingHorizontal: 18,
    color: '#ffffff',
    fontSize: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: FONTS.ui,
    backgroundColor: 'transparent', 
  },
  submitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: '100%',
    marginTop: 14,
  },
  submit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    alignSelf: 'stretch',
    width: '100%',
    minHeight: 52,
    paddingHorizontal: 28,
    paddingVertical: 14,
    backgroundColor: 'rgba(111, 122, 80, 0.6)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }
    })
  },
  submitDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: FONTS.ui,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(230, 221, 204, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: COLORS.text,
    fontSize: 18,
    marginTop: -1,
    fontFamily: FONTS.ui,
  },
  pressed: {
    ...Platform.select({
      web: {
        transform: 'scale(0.98)',
        opacity: 0.85,
      },
      default: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
      }
    })
  },
});