import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
const Home = () => {
    const navigation = useNavigation();
  return (
    <View style={tw`flex-1 items-center justify-between p-4 bg-white`}>
        <View style={tw`w-full   h-1/4  justify-center`}>
            <Text style={tw`text-xl  font-semibold text-[${Colors.primary}]`}>Welcome to </Text>
            <Text style={tw`text-4xl  uppercase font-semibold text-[${Colors.primary}]`}>
                Find Missing {"\n"}Child
            </Text>
        </View>
        <View style={tw`w-full flex-grow items-center justify-evenly`}>
            <Image source={require('../assets/img/home.png')} 
                style={tw`w-full h-1/2`} />
            <View style={tw`w-full`}>
                <TouchableOpacity style={tw`w-full bg-[${Colors.primary}] m-1 flex flex-row items-center justify-start p-4 rounded`}
                    onPress={() => navigation.navigate('Login')}>
                    <AntDesign name="login" size={24} color="white" />
                    <Text style={tw`px-2 text-xl font-medium text-white`}>
                        Raise a complaint
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`w-full bg-[${Colors.primary}] m-1 flex flex-row items-center justify-start p-4 rounded`}
                    onPress={() => navigation.navigate('ChildFounder')}>
                    <MaterialCommunityIcons name="human-male-girl" size={24} color="white" />
                    <Text style={tw`px-2 text-xl font-medium text-white `}>
                        As a Child Founder
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default Home