import { View, Text, Modal } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
        <View style={tw`flex-1 bg-white/75 items-center justify-center`}>

        <LottieView
            style={{
            width: 200,
            height: 200,
            }}
            autoPlay loop source={require('../assets/img/chatSplashLogo.json')}
        />
        </View>
  )
}

export default SplashScreen