import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
const ChildFounder = () => {
    const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white`}>
        <Header title={"Child Founder"} />
        <View style={tw`flex-grow w-full p-4 `}>
            <TouchableOpacity style={tw`w-full border-2 border-[${Colors.primary}] flex flex-row items-center justify-start p-4 rounded mb-2 `}
                    onPress={() => navigation.navigate('mcinfo')}>
                <Ionicons name="search" size={24} color={Colors.primary} />
                <Text style={tw`px-2 text-xl font-medium text-[${Colors.primary}]`}>
                    Missing Child Details
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`w-full border-2 border-[${Colors.primary}] flex flex-row items-center justify-start p-4 rounded mb-2 `}
                    onPress={() => navigation.navigate('ufcd')}>
                {/* <MaterialIcons name="post-add" size={24} color="black" /> */}
                <Foundation name="page-add" size={24} color={Colors.primary} />
                <Text style={tw`px-2 text-xl font-medium  text-[${Colors.primary}]`}>
                    Upload Found Child Details
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ChildFounder