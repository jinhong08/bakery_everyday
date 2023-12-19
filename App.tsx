import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';

import 'react-native-gesture-handler';

import client from '@/client';

import Main from '@/Main';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar animated={true} style="dark" />
          <Main />
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
