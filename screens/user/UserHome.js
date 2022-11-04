import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import useAuth from '../../hooks/useAuth'
import Colors from '../../constants/Colors'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../database/firebase'

const UserHome = () => {
    const {signOutfun, complaintsArr} = useAuth()

    const navigation = useNavigation();

    
  return (
    <View style={tw`flex-1 bg-white`}>
        <Text style={tw`w-full text-center text-xl font-bold text-[${Colors.primary}]`}>Home</Text>
      <View style={tw`p-4 `}>
        <TouchableOpacity onPress={() => navigation.navigate('AddComplaint')} 
            style={tw`w-full border-2 border-[${Colors.primary}] flex flex-row items-center justify-center p-4 rounded mb-2 `}>
            <Text style={tw`px-2 text-xl  font-medium  text-[${Colors.primary}]`}>
                Add Complaint
            </Text>
        </TouchableOpacity>

        {complaintsArr && (
            displayComplaints()
        )}

        <TouchableOpacity onPress={() => signOutfun()} 
            style={tw`p-4 bg-[${Colors.primary}] items-center rounded`}>
            <Text style={tw`text-white text-xl font-normal`}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserHome