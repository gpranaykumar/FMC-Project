import { View, Text, Image, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import tw from 'twrnc'
import Colors from '../../constants/Colors'
import useAuth from '../../hooks/useAuth'
import CDropDownList1 from '../../components/CDropDownList1'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../database/firebase'

const Details = ({navigation: { goBack}, route}) => {
    const {item: card} = route.params
    // console.log("Card: ", card)
    const navigation = useNavigation();

    const {user, profile, foundChildArr} = useAuth()
    const [foundID, setFoundID] = useState('')
    const [foundOpen, setFoundOpen] = useState(false)
    const [foundList, setFoundList] = useState([...foundChildArr.filter((item) => item.status !== 'found')])
    const inputStyle = tw`border border-2 border-gray-200 text-gray-900 text-base p-2  rounded`

    
  return (
    <View style={tw`flex-1 bg-white `}>
        <Header title={"Details"} />
        <KeyboardAwareScrollView style={tw`flex-grow  `}>
            <Image source={{ uri: card.cImage}} style={tw`w-full h-72 bg-gray-200`} />
            <View style={tw`flex-grow p-4 relative`} >
                <View style={tw`absolute top-0 right-0 ${card.status === 'active' ?' bg-green-200 ' : `bg-[${Colors.primary}] `} p-1 rounded`}>
                    <Text style={tw`capitalize ${card.status === 'active' ? '' : `text-white`} `}>
                        {card.status}
                    </Text>
                </View>
                <Text style={tw`text-xs font-normal text-gray-500`}>
                    Child Name
                </Text>
                <Text style={tw`text-xl font-normal`}>
                    {card.cName}
                </Text>
                <View style={tw`flex-row pt-2`}>
                    <View style={tw`flex pr-5`}>
                        <Text style={tw`text-xs font-normal text-gray-500`}>
                            Child Age
                        </Text>
                        <Text style={tw`text-xl font-normal`}>
                            {card.cAge}
                        </Text>
                    </View>
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
                {user && (
                    <View style={tw`pt-4`}>
                        <View style={tw`flex-row items-center`}>
                            <View style={tw``}>
                                <Text style={tw`text-xs font-normal text-gray-500`}>
                                    Guardian Name
                                </Text>
                                <Text style={tw`text-xl font-normal`}>
                                    {card.gName}
                                </Text>
                            </View>
                            <View style={tw``}>
                                <Text style={tw`text-xs font-normal text-gray-500`}>
                                    Aadhar Number
                                </Text>
                                <Text style={tw`text-xl font-normal`}>
                                    {card?.aNo}
                                </Text>
                            </View>
                            <View style={tw`pl-2`}>
                                <Text style={tw`capitalize text-xs font-normal text-gray-500`}>
                                relation
                                </Text>
                                <Text style={tw`capitalize text-xl font-normal`}>
                                    {card.relation}
                                </Text>
                            </View>
                        </View>
                        <Text style={tw`text-xs pt-1 font-normal text-gray-500`}>
                        Guardian Phone Number
                        </Text>
                        <Text style={tw`text-xl font-normal`}>
                            {card.gPno}
                        </Text>
                        
                        <Text style={tw`capitalize text-xs pt-1 font-normal text-gray-500`}>
                            Identification Marks
                        </Text>
                        <Text style={tw` capitalize text-xl font-normal`}>
                            {card.identMarks}
                        </Text>
                        <Text style={tw`capitalize text-xs pt-1 font-normal text-gray-500`}>
                            Last Seen Area and Time
                        </Text>
                        <Text style={tw`text-xl font-normal`}>
                            {card.lstArea}
                        </Text>
                    </View>
                )}
                {profile?.iam ==='admin' && (
                    <View style={tw`pt-2`}>
                        <Text style={tw`capitalize text-base pt-1 font-normal text-gray-500`}>
                            Matched with
                        </Text>
                        <TouchableOpacity onPress={() => setFoundOpen(true)}
                            style={tw`flex-row border p-2 rounded border-gray-200 items-center`}>
                            {foundID&& foundID !== 'other' && (<Image source={{ uri: foundID.cImage}} style={tw`h-16 w-16 border border-[${Colors.primary}] bg-gray-200 rounded-full`} />) }
                        <Text style={tw`pl-2 `}>
                            {!foundID && ("Select from List")}
                            {foundID && (foundID === 'other' ? 'Child Not in List': `Address: ${foundID.address} ` )}
                        </Text>
                        </TouchableOpacity>
                        <Modal 
                        transparent={true}
                        animationType="fade"
                        visible={foundOpen}
                        onRequestClose={() => setFoundOpen(false)}
                        >
                            <CDropDownList1 setVisible={setFoundOpen} 
                            setValue={setFoundID}
                            items={foundList} 
                            searchBar
                            />
                        </Modal>
                        <TouchableOpacity  onPress={() => matchedBtn()}
                            style={tw`my-2 p-2 bg-[${Colors.primary}] items-center rounded mb-2`}>
                            <Text style={tw`text-white text-xl font-normal`}>Matched Close Complaint</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={tw`p-5`}>

                </View>
            </View>
        </KeyboardAwareScrollView>
    </View>
  )
}

export default Details