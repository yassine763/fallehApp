import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';

import { colors } from './src/theme/colors';
import { AppButton } from './src/components/AppButton';
import { AppCard } from './src/components/AppCard';
import { AppChip } from './src/components/AppChip';
import { AppInput } from './src/components/AppInput';
import { BottomTabs } from './src/components/BottomTabs';
import { Drawer } from './src/components/Drawer';
import { SectionHeader } from './src/components/SectionHeader';
import { screens } from './src/data/screens';

const App = () => {
  const [stage, setStage] = useState('splash');
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStage('onboarding'), 1200);
    return () => clearTimeout(timer);
  }, []);

  const onboardingSlide = screens.onboarding[onboardingIndex];

  const screenMap = useMemo(
    () => ({
      home: screens.home,
      diagnosis: screens.diagnosis,
      market: screens.market,
      irrigation: screens.irrigation,
      journal: screens.journal,
      alerts: screens.alerts,
      profile: screens.profile,
      pro: screens.pro,
    }),
    []
  );

  const activeScreen = screenMap[currentTab] ?? screens.home;

  if (stage === 'splash') {
    return (
      <SafeAreaView style={styles.splash}>
        <StatusBar barStyle="light-content" />
        <View style={styles.splashBadge}>
          <Text style={styles.splashTitle}>الفلاّح الذكي</Text>
          {/* FR: Le Fellah Intelligent */}
          <Text style={styles.splashSubtitle}>AgriTech تونسية للحقول</Text>
          {/* FR: AgriTech tunisienne pour les champs */}
        </View>
        <Text style={styles.splashTagline}>حلول ذكية لفلاّح اليوم</Text>
        {/* FR: Solutions intelligentes pour le fellah d’aujourd’hui */}
      </SafeAreaView>
    );
  }

  if (stage === 'onboarding') {
    return (
      <SafeAreaView style={styles.onboarding}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.onboardingCard}>
          <Image source={{ uri: onboardingSlide.image }} style={styles.onboardingImage} />
          <Text style={styles.onboardingTitle}>{onboardingSlide.title}</Text>
          {/* FR: {onboardingSlide.titleFr} */}
          <Text style={styles.onboardingBody}>{onboardingSlide.body}</Text>
          {/* FR: {onboardingSlide.bodyFr} */}
        </View>
        <View style={styles.onboardingDots}>
          {screens.onboarding.map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                styles.dot,
                index === onboardingIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
        <View style={styles.onboardingActions}>
          <AppButton
            label={onboardingIndex === screens.onboarding.length - 1 ? 'إبدأ' : 'التالي'}
            onPress={() => {
              if (onboardingIndex < screens.onboarding.length - 1) {
                setOnboardingIndex(onboardingIndex + 1);
              } else {
                setStage('auth');
              }
            }}
          />
          <Pressable onPress={() => setStage('auth')}>
            <Text style={styles.skip}>تخطّى</Text>
            {/* FR: Passer */}
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (stage === 'auth') {
    return (
      <SafeAreaView style={styles.auth}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.authHeader}>
          <Text style={styles.authTitle}>مرحبا بيك</Text>
          {/* FR: Bienvenue */}
          <Text style={styles.authSubtitle}>إدخل رقمك باش نبداو</Text>
          {/* FR: Entrez votre numéro pour commencer */}
        </View>
        <AppInput label="رقم الهاتف" placeholder="+216 55 123 456" />
        <AppInput label="رمز التفعيل" placeholder="****" helper="باش يوصلك في SMS" />
        {/* FR: Code reçu par SMS */}
        <AppButton label="متابعة" onPress={() => setStage('app')} />
        <Text style={styles.authHint}>تسجيلك موافق على الشروط</Text>
        {/* FR: En continuant vous acceptez les conditions */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(key) => {
          setCurrentTab(key);
          setDrawerOpen(false);
        }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Pressable onPress={() => setDrawerOpen(true)}>
            <View style={styles.menuIcon} />
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>الفلاّح الذكي</Text>
            {/* FR: Le Fellah Intelligent */}
            <Text style={styles.headerSubtitle}>نهارك زين، سامي!</Text>
            {/* FR: Bonne journée, Sami ! */}
          </View>
          <View style={styles.profileChip}>
            <Text style={styles.profileChipText}>Pro</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View>
            <Text style={styles.heroTitle}>طقس اليوم في القيروان</Text>
            {/* FR: Météo du jour à Kairouan */}
            <Text style={styles.heroTemp}>28° • شمس خفيفة</Text>
            {/* FR: 28° • Soleil léger */}
            <View style={styles.heroRow}>
              <AppChip label="رطوبة 42%" />
              <AppChip label="رياح 10 كم/س" />
            </View>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>تنبيه</Text>
            {/* FR: Alerte */}
            <Text style={styles.heroBadgeSub}>سقي خفيف في الصباح</Text>
            {/* FR: Irrigation légère le matin */}
          </View>
        </View>

        <SectionHeader
          title="الخدمات السريعة"
          subtitle="كله في بلاصة وحدة"
          /* FR: Services rapides / Tout en un */
        />
        <View style={styles.quickGrid}>
          {screens.quickActions.map((action) => (
            <AppCard key={action.title} style={styles.quickCard}>
              <Text style={styles.quickTitle}>{action.title}</Text>
              {/* FR: {action.titleFr} */}
              <Text style={styles.quickBody}>{action.body}</Text>
              {/* FR: {action.bodyFr} */}
              <AppButton label="إبدأ" size="sm" />
            </AppCard>
          ))}
        </View>

        <SectionHeader
          title={activeScreen.sectionTitle}
          subtitle={activeScreen.sectionSubtitle}
          /* FR: {activeScreen.sectionTitleFr} */
        />
        {activeScreen.key === 'diagnosis' ? (
          <View>
            <AppCard style={styles.cameraCard}>
              <Text style={styles.cameraTitle}>خذ صورة المرض</Text>
              {/* FR: Prendre une photo de la maladie */}
              <View style={styles.cameraPreview}>
                <Text style={styles.cameraHint}>كاميرا مباشرة</Text>
                {/* FR: Aperçu caméra */}
              </View>
              <View style={styles.cameraActions}>
                <AppButton label="تصوير" variant="secondary" />
                <AppButton label="حلّل" />
              </View>
            </AppCard>

            <AppCard>
              <Text style={styles.resultTitle}>نتيجة التشخيص</Text>
              {/* FR: Résultat du diagnostic */}
              <Text style={styles.resultSubtitle}>العفن الورقي - درجة متوسطة</Text>
              {/* FR: Mildiou - gravité متوسط */}
              <View style={styles.resultTags}>
                <AppChip label="خطر 45%" tone="warning" />
                <AppChip label="سقي أقل اليوم" tone="info" />
              </View>
              <Text style={styles.resultBody}>
                عالجها بمبيد نحاسي كل 7 أيام، نقص السقي في الليل، وإبعد الأوراق المصابة.
              </Text>
              {/* FR: Traiter avec un fongicide cuivre... */}
              <View style={styles.previewRow}>
                <View style={styles.previewBox}>
                  <Text style={styles.previewLabel}>قبل</Text>
                </View>
                <View style={styles.previewBox}>
                  <Text style={styles.previewLabel}>بعد</Text>
                </View>
              </View>
              <AppButton label="شارك النتيجة مع المهندس" variant="ghost" />
            </AppCard>
          </View>
        ) : (
          <View style={styles.screenBody}>
            <Text style={styles.screenTitle}>{activeScreen.title}</Text>
            {/* FR: {activeScreen.titleFr} */}
            <Text style={styles.screenText}>{activeScreen.body}</Text>
            {/* FR: {activeScreen.bodyFr} */}
            <AppCard style={styles.screenCard}>
              <Text style={styles.screenCardTitle}>{activeScreen.cardTitle}</Text>
              {/* FR: {activeScreen.cardTitleFr} */}
              <Text style={styles.screenCardText}>{activeScreen.cardBody}</Text>
              {/* FR: {activeScreen.cardBodyFr} */}
              <AppButton label="جرّب الآن" />
            </AppCard>
          </View>
        )}

        <SectionHeader
          title="مزايا فلاح برو"
          subtitle="اشتراك 15 د/شهر"
          /* FR: Avantages Fellah Pro / 15 TND par mois */
        />
        <AppCard style={styles.proCard}>
          <Text style={styles.proTitle}>فلاح برو</Text>
          {/* FR: Fellah Pro */}
          <Text style={styles.proBody}>تحليلات معمّقة، دعم فوري، وخرائط ذكية.</Text>
          {/* FR: Analyses avancées, support, cartes intelligentes */}
          <View style={styles.proList}>
            {screens.proBenefits.map((benefit) => (
              <Text key={benefit} style={styles.proItem}>
                • {benefit}
              </Text>
            ))}
          </View>
          <AppButton label="جرّب مجانًا" variant="secondary" />
        </AppCard>

        <View style={styles.footerNote}>
          <Text style={styles.footerText}>الوضع دون أنترنت متوفر للأساسيات</Text>
          {/* FR: Mode hors-ligne disponible pour l’essentiel */}
        </View>
      </ScrollView>

      <BottomTabs
        current={currentTab}
        onChange={setCurrentTab}
        onOpenDrawer={() => setDrawerOpen(true)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand,
  },
  scroll: {
    padding: 20,
    paddingBottom: 120,
  },
  splash: {
    flex: 1,
    backgroundColor: colors.deepGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashBadge: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.sand,
  },
  splashSubtitle: {
    fontSize: 16,
    color: colors.sun,
    marginTop: 8,
  },
  splashTagline: {
    marginTop: 24,
    color: colors.sand,
    fontSize: 16,
  },
  onboarding: {
    flex: 1,
    backgroundColor: colors.sand,
    padding: 20,
  },
  onboardingCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  onboardingImage: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    marginBottom: 16,
  },
  onboardingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.deepGreen,
    textAlign: 'center',
  },
  onboardingBody: {
    fontSize: 16,
    color: colors.ink,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 24,
  },
  onboardingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: colors.terra,
  },
  dotInactive: {
    backgroundColor: 'rgba(224,122,0,0.2)',
  },
  onboardingActions: {
    marginTop: 24,
    alignItems: 'center',
    gap: 12,
  },
  skip: {
    color: colors.deepGreen,
    fontWeight: '600',
  },
  auth: {
    flex: 1,
    backgroundColor: colors.sand,
    padding: 20,
    gap: 16,
  },
  authHeader: {
    marginTop: 20,
    marginBottom: 8,
  },
  authTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.deepGreen,
  },
  authSubtitle: {
    fontSize: 16,
    color: colors.ink,
    marginTop: 4,
  },
  authHint: {
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(10,61,43,0.08)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.deepGreen,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.muted,
  },
  profileChip: {
    backgroundColor: colors.sun,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  profileChipText: {
    fontWeight: '700',
    color: colors.deepGreen,
  },
  hero: {
    marginTop: 20,
    backgroundColor: colors.deepGreen,
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  heroTitle: {
    color: colors.sand,
    fontSize: 16,
    fontWeight: '600',
  },
  heroTemp: {
    color: colors.sun,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 6,
  },
  heroRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  heroBadge: {
    backgroundColor: colors.terra,
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
  },
  heroBadgeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  heroBadgeSub: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickCard: {
    width: '48%',
    gap: 10,
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.deepGreen,
  },
  quickBody: {
    fontSize: 12,
    color: colors.muted,
  },
  cameraCard: {
    gap: 12,
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.deepGreen,
  },
  cameraPreview: {
    backgroundColor: 'rgba(10,61,43,0.08)',
    borderRadius: 18,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraHint: {
    color: colors.muted,
    fontSize: 14,
  },
  cameraActions: {
    flexDirection: 'row',
    gap: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.deepGreen,
  },
  resultSubtitle: {
    fontSize: 14,
    color: colors.terra,
    marginTop: 4,
  },
  resultTags: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  resultBody: {
    marginTop: 10,
    fontSize: 14,
    color: colors.ink,
    lineHeight: 22,
  },
  previewRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  previewBox: {
    flex: 1,
    height: 90,
    borderRadius: 14,
    backgroundColor: colors.sand,
    borderWidth: 1,
    borderColor: 'rgba(10,61,43,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewLabel: {
    color: colors.muted,
    fontSize: 12,
  },
  screenBody: {
    gap: 14,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.deepGreen,
  },
  screenText: {
    fontSize: 14,
    color: colors.ink,
    lineHeight: 22,
  },
  screenCard: {
    gap: 10,
  },
  screenCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.deepGreen,
  },
  screenCardText: {
    fontSize: 13,
    color: colors.muted,
  },
  proCard: {
    gap: 12,
    backgroundColor: colors.deepGreen,
  },
  proTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.sun,
  },
  proBody: {
    fontSize: 14,
    color: colors.sand,
  },
  proList: {
    gap: 6,
  },
  proItem: {
    color: colors.sand,
    fontSize: 13,
  },
  footerNote: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.muted,
  },
});

export default App;
