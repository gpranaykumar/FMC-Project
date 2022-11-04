import { View, Text, Image, ScrollView, TouchableOpacity, Platform, Linking } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import tw from 'twrnc'
import Colors from '../../constants/Colors'
import useAuth from '../../hooks/useAuth'

const FoundChildDetails = ({navigation: { goBack}, route}) => {
    const {item: card} = route.params
    // console.log("Card: ", card)
    const {user} = useAuth()
    const latitude =  card?.location?.coords?.latitude
    const longitude =  card?.location?.coords?.longitude
    // const label = "GPK"

    // const url = Platform.select({
    //     ios: "maps:" + latitude + "," + longitude,//+ "?q=" + label,
    //     android: "geo:" + latitude + "," + longitude //+ "?q=" + label
    // });
    
    
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
        <View style={tw`flex  `}>
            <Image source={{ uri: card.cImage}} style={tw`w-full h-72 bg-gray-200`} />
            <ScrollView style={tw`p-4 relative`}>
                <View style={tw`absolute top-0 right-0 ${card.status === 'active' ?' bg-green-200 ' : 'bg-red-200 '} p-1 rounded`}>
                    <Text style={tw`capitalize`}>
                        {card.status}
                    </Text>
                </View>
                <Text style={tw`pt-4 text-xs font-normal text-gray-500`}>
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
        </View>
    </View>
  )
}

export default FoundChildDetails