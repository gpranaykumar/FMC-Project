import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
const Header = ({title}) => {
    const navigation = useNavigation();

  return (
    <View style={tw`w-full bg-[${Colors.primary}] flex-row items-center py-3`}>
        <TouchableOpacity style={tw`pl-4 pr-2 py-2`} onPress={() => navigation.goBack()} >
            <Ionicons name="ios-chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>
      <Text style={tw`text-xl font-medium text-white `}>
        {title}
      </Text>
    </View>
  )
}

export default Header