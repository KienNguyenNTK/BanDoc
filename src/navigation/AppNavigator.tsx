import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MembershipScreen from '../screens/MembershipScreen';
import NotesHighlightsScreen from '../screens/NotesHighlightsScreen';
import TranslatorStudioScreen from '../screens/TranslatorStudioScreen';
import TranslatorPreparingScreen from '../screens/TranslatorPreparingScreen';
import TranslatorProjectReadyScreen from '../screens/TranslatorProjectReadyScreen';
import TranslatorUploadStatusScreen from '../screens/TranslatorUploadStatusScreen';
import TranslatorChaptersScreen from '../screens/TranslatorChaptersScreen';
import TranslatorChapterSourceScreen from '../screens/TranslatorChapterSourceScreen';
import TranslatorChapterTranslationScreen from '../screens/TranslatorChapterTranslationScreen';
import TranslatorChapterGraphScreen from '../screens/TranslatorChapterGraphScreen';
import TranslatorCharacterChatScreen from '../screens/TranslatorCharacterChatScreen';
import ReadingStatsScreen from '../screens/ReadingStatsScreen';
import UploadManagementScreen from '../screens/UploadManagementScreen';
import TrendingNowScreen from '../screens/TrendingNowScreen';
import SearchScreen from '../screens/SearchScreen';
import CollectionDetailScreen from '../screens/CollectionDetailScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import InsightDetailScreen from '../screens/InsightDetailScreen';
import TopicDetailScreen from '../screens/TopicDetailScreen';
import AuthorDetailScreen from '../screens/AuthorDetailScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import AskAIScreen from '../screens/AskAIScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { uiColors } from '../theme/ui';

const ONBOARDING_DONE_KEY = 'app.onboarding.completed';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  Home: undefined;
  Library: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Membership: undefined;
  NotesHighlights: undefined;
  TranslatorStudio: undefined;
  TranslatorPreparing: undefined;
  TranslatorProjectReady: undefined;
  TranslatorUploadStatus: undefined;
  TranslatorChapters: undefined;
  TranslatorChapterSource: undefined;
  TranslatorChapterTranslation: undefined;
  TranslatorChapterGraph: undefined;
  TranslatorCharacterChat: undefined;
  ReadingStats: undefined;
  UploadManagement: undefined;
  Notifications: undefined;
  InsightDetail: {
    bookTitle?: string;
    author?: string;
    genre?: string;
    quote?: string;
    insightTitle?: string;
    savedOn?: string;
    personalNote?: string;
  };
  TrendingNow: undefined;
  CollectionDetail: {
    title: string;
  };
  Search: undefined;
  TopicDetail: {
    title: string;
    description?: string;
  };
  AuthorDetail: {
    authorName: string;
  };
  BookDetail: {
    title: string;
    author?: string;
  };
  AskAI: {
    initialPrompt?: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const loadOnboardingState = async () => {
      try {
        const flag = await AsyncStorage.getItem(ONBOARDING_DONE_KEY);
        setHasCompletedOnboarding(flag === 'true');
      } catch {
        setHasCompletedOnboarding(false);
      }
    };

    void loadOnboardingState();
  }, []);

  const initialRoute = useMemo<keyof RootStackParamList>(() => {
    if (hasCompletedOnboarding) {
      return 'Login';
    }

    return 'Onboarding';
  }, [hasCompletedOnboarding]);

  if (hasCompletedOnboarding === null) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C5CE7" />
      </SafeAreaView>
    );
  }

  return (
    <Stack.Navigator
      key={initialRoute}
      initialRouteName={initialRoute}
      screenOptions={{
        animationEnabled: true,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Membership"
        component={MembershipScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotesHighlights"
        component={NotesHighlightsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorStudio"
        component={TranslatorStudioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorPreparing"
        component={TranslatorPreparingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorProjectReady"
        component={TranslatorProjectReadyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorUploadStatus"
        component={TranslatorUploadStatusScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorChapters"
        component={TranslatorChaptersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorChapterSource"
        component={TranslatorChapterSourceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorChapterTranslation"
        component={TranslatorChapterTranslationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorChapterGraph"
        component={TranslatorChapterGraphScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TranslatorCharacterChat"
        component={TranslatorCharacterChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReadingStats"
        component={ReadingStatsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadManagement"
        component={UploadManagementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InsightDetail"
        component={InsightDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrendingNow"
        component={TrendingNowScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectionDetail"
        component={CollectionDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopicDetail"
        component={TopicDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthorDetail"
        component={AuthorDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AskAI"
        component={AskAIScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: uiColors.background,
  },
});
