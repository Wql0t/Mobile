import { useState } from 'react';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { CardsScreen } from './src/screens/CardsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ProfileDetailsScreen } from './src/screens/ProfileDetailsScreen';
import { SidebarDrawer } from './src/ui/SidebarDrawer';
import type { SidebarItemId } from './src/ui/SidebarDrawer';
import HomeScreen from './src/screens/index';
import { CreateQuestionnaireScreen } from './src/screens/CreateQuestionnaireScreen';

type Route = 'home' | 'login' | 'register' | 'main';
type MainView = 'cards' | 'profile' | 'profileDetails' | 'createQuestionnaire';
type RegisterBackRoute = 'home' | 'login';

export default function App() {
  const [route, setRoute] = useState<Route>('home');
  const [registerBackRoute, setRegisterBackRoute] = useState<RegisterBackRoute>('home');
  const [mainView, setMainView] = useState<MainView>('cards');

  function handleSidebarSelect(id: SidebarItemId) {
    if (id === 'profile') {
      setMainView('profile');
      return;
    }
    if (id === 'cards') {
      setMainView('cards');
      return;
    }
    if (id === 'create') {
      setMainView('createQuestionnaire');
      return;
    }
    console.log('sidebar select', id);
  }

  if (route === 'home') {
    return (
      <HomeScreen
        onLogin={() => setRoute('login')}
        onStart={() => {
          setRegisterBackRoute('home');
          setRoute('register');
        }}
      />
    );
  }

  if (route === 'register') {
    return (
      <RegisterScreen
        onBack={() => setRoute(registerBackRoute)}
        onSubmit={() => {
          setMainView('cards');
          setRoute('main');
        }}
      />
    );
  }

  if (route === 'main') {
    return (
      <SidebarDrawer enabled onSelect={handleSidebarSelect}>
        {mainView === 'profile' ? (
          <ProfileScreen onSettings={() => setMainView('profileDetails')} />
        ) : mainView === 'profileDetails' ? (
          <ProfileDetailsScreen onBack={() => setMainView('profile')} />
        ) : mainView === 'createQuestionnaire' ? (
          <CreateQuestionnaireScreen
            onBack={() => setMainView('cards')}
            onComplete={() => setMainView('cards')}
          />
        ) : (
          <CardsScreen onBack={() => setRoute('home')} />
        )}
      </SidebarDrawer>
    );
  }

  return (
    <LoginScreen
      onBack={() => {
        setRegisterBackRoute('login');
        setRoute('register');
      }}
      onSubmit={() => {
        setMainView('cards');
        setRoute('main');
      }}
    />
  );
}
