import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'twrnc';
import NavIndex from './navigation/navIndex';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <StatusBar style="auto" />
          <NavIndex />
      </SafeAreaView>
    </NavigationContainer>
  );
}


