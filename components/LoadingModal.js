import { View, Text, Modal } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import LottieView from 'lottie-react-native';

const LoadingModal = ({text}) => {
  return (
    <Modal animationType='fade' 
        transparent={true}
        visible={true}
        >
        <View style={tw`flex-1 z-50 bg-black/50 flex-1 items-center justify-center`}>
            <Text style={tw`text-white font-medium text-2xl`}>{text? text: "Loading..."}</Text>
        </View>
    </Modal>
  )
}

export default LoadingModal