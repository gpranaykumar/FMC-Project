import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth';
import tw from 'twrnc'
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Foundation } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AdminHome = () => {
    const {users, complaintsArr, foundChildArr, signOutfun} = useAuth()
    const navigation = useNavigation();
    const closedCount = complaintsArr?.filter((item) => item.status === 'found').length || 0
    const foundCount = foundChildArr?.filter((item) => item.status !== 'found').length || 0
    const foundReviewCount = foundChildArr?.filter((item) => item.status === 'review').length || 0
    const complaintsCount = complaintsArr?.filter((item) => item.status !== 'found').length || 0
  return (
    <View style={tw`flex-1 bg-white`}>
        <Text style={tw`w-full text-center text-xl font-bold text-[${Colors.primary}]`}>Home</Text>
        <View style={tw`flex-grow justify-center items-center`}>
            <View style={tw`w-3/4 flex-row pt-5`}>
                <View style={tw`w-1/2 bg-[${Colors.primary}] m-1 rounded p-4 flex items-center justify-center `}>
                    <Text style={tw`text-3xl font-medium uppercase text-white`}>
                        {complaintsCount? complaintsCount : '0'}
                    </Text>
                    <Text style={tw`text-base text-center font-medium uppercase text-white`}>
                        Complaints
                    </Text>
                </View>
                <View style={tw`w-1/2 bg-[${Colors.primary}] m-1 rounded p-4 flex items-center justify-center `}>
                    <Text style={tw`text-3xl font-medium uppercase text-white`}>
                        {foundReviewCount? foundReviewCount: '0'}
                    </Text>
                    <Text style={tw`text-base font-medium uppercase text-white`}>
                        Under Review
                    </Text>
                </View>
            </View>
            <View style={tw`w-3/4 flex-row `}>
                <View style={tw`w-1/2 bg-[${Colors.primary}] m-1 rounded p-4 flex items-center justify-center `}>
                    <Text style={tw`text-3xl font-medium uppercase text-white`}>
                        {foundCount? foundCount : '0'}
                    </Text>
                    <Text style={tw`text-base text-center font-medium uppercase text-white`}>
                        Found
                    </Text>
                </View>
                <View style={tw`w-1/2 bg-[${Colors.primary}] m-1 rounded p-4 flex items-center justify-center `}>
                    <Text style={tw`text-3xl font-medium uppercase text-white`}>
                        {closedCount? closedCount : '0'}
                    </Text>
                    <Text style={tw`text-base text-center font-medium uppercase text-white`}>
                        Closed 
                    </Text>
                </View>
            </View>
            {/* menu */}
            <ScrollView style={tw`flex w-full p-4`}>
                <TouchableOpacity style={tw`w-full border-2 border-[${Colors.primary}] flex flex-row items-center justify-center p-4 rounded mb-2 `}
                        onPress={() => navigation.navigate('ActiveComplaints')}>
                    <>
                        <Octicons name="dot" size={24} color={Colors.primary}  />
                        <Text style={tw`px-2 text-xl font-medium  text-[${Colors.primary}]`}>
                            Active Complaints
                        </Text>
                    </>
                </TouchableOpacity>
                <TouchableOpacity style={tw`w-full border-2 border-[${Colors.primary}] flex flex-row items-center justify-center p-4 rounded mb-2 `}
                        onPress={() => navigation.navigate('FoundChild')}>
                    <>
                        {/* <Foundation name="page-add" size={24} color={Colors.primary} /> */}
                        <MaterialCommunityIcons name="car-child-seat" size={24} color={Colors.primary} />
                        <Text style={tw`px-2 text-xl font-medium  text-[${Colors.primary}]`}>
                            Found Children
                        </Text>
                    </>
                </TouchableOpacity>
                <TouchableOpacity style={tw`w-full border-2 border-[${Colors.primary}] flex flex-row items-center justify-center p-4 rounded mb-2 `}
                        onPress={() => navigation.navigate('FoundChildReview')}>
                    <>
                        <MaterialCommunityIcons name="human-male-child" size={24} color={Colors.primary}/>
                        <Text style={tw`px-2 text-xl font-medium  text-[${Colors.primary}]`}>
                            Found Children Review
                        </Text>
                    </>
                </TouchableOpacity>
                <TouchableOpacity style={tw`w-full border-2 border-[${Colors.primary}] flex flex-row items-center justify-center p-4 rounded mb-2 `}
                        onPress={() => navigation.navigate('ClosedComplaints')}>
                    <>
                        <MaterialCommunityIcons name="human-male-female-child" size={24} color={Colors.primary} />
                        <Text style={tw`px-2 text-xl font-medium  text-[${Colors.primary}]`}>
                            Closed Complaints
                        </Text>
                    </>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signOutfun()} 
                    style={tw`p-4 bg-[${Colors.primary}] items-center rounded`}>
                    <Text style={tw`text-white text-xl font-normal`}>Log out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    
    </View>
  )
}

export default AdminHome