import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ChildFounder from '../screens/local/ChildFounder';
import MCInfo from '../screens/local/MCInfo';
import UFCD from '../screens/local/UFCD';
import Details from '../screens/Details/Details';
const DefaultNavigation = () => {
    const HomeStack = createNativeStackNavigator();

    const HomeStackScreen = () => (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="DHome"
         >
            <HomeStack.Screen name="DHome" component={Home} />
             <HomeStack.Screen name="Login" component={Login} 
               options={{
                 title: 'Login', }}
               />
             <HomeStack.Screen name="Register" component={Register} />
             <HomeStack.Screen name="ChildFounder" component={ChildFounder} />
             <HomeStack.Screen name="mcinfo" component={MCInfo} />
             <HomeStack.Screen name="ufcd" component={UFCD} />
             <HomeStack.Screen name="Details" component={Details} />
           </HomeStack.Navigator> 
     )
  return (
    <HomeStackScreen/>
  )
}

export default DefaultNavigation