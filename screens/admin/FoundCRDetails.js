import { View, Text, Image, ScrollView, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import tw from 'twrnc'
import Colors from '../../constants/Colors'
import useAuth from '../../hooks/useAuth'
import { Ionicons } from '@expo/vector-icons';
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../database/firebase'
import { useNavigation } from '@react-navigation/native'

const FoundCRDetails = ({navigation: { goBack}, route}) => {

 const {item: card} = route.params
 const navigation = useNavigation();


    // console.log("Card: ", card)
    const {user,users, complaintsArr} = useAuth()
    const [view1Details, setView1Details] = useState(false)
    const [view2Details, setView2Details] = useState(false)
    const latitude =  card?.location?.coords?.latitude
    const longitude =  card?.location?.coords?.longitude
    const getCmpById = (id)=>{
        return complaintsArr.filter(ite => ite.id === id )[0]
    }
    const card1 = getCmpById(card.complaintID)
    // console.log("card1",card1)
    // const label = "GPK"

    // const url = Platform.select({
    //     ios: "maps:" + latitude + "," + longitude,//+ "?q=" + label,
    //     android: "geo:" + latitude + "," + longitude //+ "?q=" + label
    // });
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&dir_action=navigate`
    // Linking.openURL(url);
    
    const toDateGPK = (d) => {
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const withSlashes = [day, month, year].join('/');
        return withSlashes
      }
    
  return (
    <View style={tw`flex-1 bg-white `}>
        <Header title={"Details"} />
        <ScrollView style={tw`flex-grow `}>
            {card.status === 'found' && (
                <View style={tw`flex items-center justify-center p-5 bg-gray-100`}>
                    <Text style={tw`text-xs font-normal text-gray-500`}>
                        Complaint Closed By
                    </Text>
                    <Text style={tw`text-xl font-normal`}>
                        {getUserById(card.closedBy).name}
                    </Text>
                    <Text style={tw`text-xs font-normal`}>
                        {getUserById(card.closedBy).email}
                    </Text>
                    <Text style={tw`text-xs font-normal`}>
                        Closed On: {toDateGPK(card.closedOn.toDate())}
                    </Text>
                </View>
            )}
            <Text style={tw`w-full text-center text-xl font-medium text-[${Colors.primary}] p-2`}>
                Found Child Details
            </Text>
            <View style={tw`w-full relative`}>
                <TouchableOpacity style={tw`absolute z-40 top-0 right-0 bg-[${Colors.primary}] rounded-l p-2`} 
                    onPress={() => setView1Details(!view1Details)}>
                        <Ionicons name="information-circle-outline" size={24} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: card.cImage}} style={tw`w-full h-72 bg-gray-200`} />                
            </View>
            {view1Details && (
                <ScrollView style={tw`p-4 relative`}>
                    <Text style={tw` text-xs font-normal text-gray-500`}>
                        Name
                    </Text>
                    <Text style={tw`text-base font-normal`}>
                        {card.name}
                    </Text>
                    <Text style={tw`text-xs font-normal text-gray-500 pt-2`}>
                        Phone Number
                    </Text>
                    <Text style={tw`text-base font-normal`}>
                        {card.pno}
                    </Text>
                    <Text style={tw`text-xs font-normal text-gray-500 pt-2`}>
                        Address
                    </Text>
                    <Text style={tw`text-base font-normal`}>
                        {card.address}
                    </Text>
                    <View style={tw`flex-row pt-2`}>
                        {card?.timestamp && (
                            <View style={tw`flex`}>
                                <Text style={tw`text-xs font-normal text-gray-500`}>
                                    Posted On
                                </Text>
                                <Text style={tw`text-xl font-normal`}>
                                    {toDateGPK(card.timestamp.toDate())}
                                </Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity style={tw`bg-[${Colors.primary}] mt-4 p-2 rounded`}
                        onPress={() =>  Linking.openURL(url)}>
                            <Text style={tw`text-white text-center text-xl font-normal`}>
                                View On Map
                            </Text>
                    </TouchableOpacity>
                </ScrollView>
            )}


            {/* Complaint Details  */}
            <Text style={tw`w-full text-center text-xl font-medium text-[${Colors.primary}] p-2 border border-b border-[${Colors.primary}]`}>
                Complaint Details
            </Text>
            <View style={tw`w-full relative`}>
                <TouchableOpacity style={tw`absolute z-40 top-0 right-0 bg-[${Colors.primary}] rounded-l  p-2`} 
                    onPress={() => setView2Details(!view2Details)}>
                        <Ionicons name="information-circle-outline" size={24} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: card1?.cImage}} style={tw`w-full h-72 bg-gray-200`} />                
            </View>
            {view2Details && (
                <ScrollView style={tw`p-4 relative`}>
                    <Text style={tw`text-xs font-normal text-gray-500`}>
                    Child Name
                </Text>
                <Text style={tw`text-xl font-normal`}>
                    {card1?.cName}
                </Text>
                <View style={tw`flex-row pt-2`}>
                    <View style={tw`flex pr-5`}>
                        <Text style={tw`text-xs font-normal text-gray-500`}>
                            Child Age
                        </Text>
                        <Text style={tw`text-xl font-normal`}>
                            {card1?.cAge}
                        </Text>
                    </View>
                    {card1?.timestamp && (
                        <View style={tw`flex`}>
                            <Text style={tw`text-xs font-normal text-gray-500`}>
                                Posted On
                            </Text>
                            <Text style={tw`text-xl font-normal`}>
                                {toDateGPK(card1?.timestamp.toDate())}
                            </Text>
                        </View>
                    )}
                </View>
                    <View style={tw`pt-4`}>
                        <Text style={tw`text-xs font-normal text-gray-500`}>
                        Guardian Name
                        </Text>
                        <Text style={tw`text-xl font-normal`}>
                            {card1?.gName}
                        </Text>
                        <Text style={tw`text-xs pt-1 font-normal text-gray-500`}>
                            Aadhar Number
                        </Text>
                        <Text style={tw`text-xl font-normal`}>
                            {card1?.aNo}
                        </Text>
                        <Text style={tw`text-xs pt-1 font-normal text-gray-500`}>
                        Guardian Phone Number
                        </Text>
                        <Text style={tw`text-xl font-normal`}>
                            {card1?.gPno}
                        </Text>
                        <Text style={tw`capitalize text-xs pt-1 font-normal text-gray-500`}>
                        relation
                        </Text>
                        <Text style={tw`capitalize text-xl font-normal`}>
                            {card1?.relation}
                        </Text>
                        <Text style={tw`capitalize text-xs pt-1 font-normal text-gray-500`}>
                            Identification Marks
                        </Text>
                        <Text style={tw` capitalize text-xl font-normal`}>
                            {card1?.identMarks}
                        </Text>
                        <Text style={tw`capitalize text-xs pt-1 font-normal text-gray-500`}>
                            Last Seen Area and Time
                        </Text>
                        <Text style={tw`text-xl font-normal`}>
                            {card1?.lstArea}
                        </Text>
                    </View>
                
                </ScrollView>
            )}
            <View style={tw`p-4 `}>
            {
                card.status === 'review' && (
                    <>
                        <TouchableOpacity  onPress={() => matchedBtn()}
                            style={tw`p-2 bg-[${Colors.primary}] items-center rounded mb-2`}>
                            <Text style={tw`text-white text-xl font-normal`}>Matched Close Complaint</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => notMatchBtn()}
                            style={tw`p-2 bg-red-600 items-center rounded mb-2`}>
                            <Text style={tw`text-white text-xl font-normal`}>Not Matched</Text>
                        </TouchableOpacity>
                    </>
                ) 
            }
            </View>
        </ScrollView>
    </View>
  )
}

export default FoundCRDetails