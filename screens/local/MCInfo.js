import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Header from '../../components/Header'
import useAuth from '../../hooks/useAuth'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

const MCInfo = () => {
  const {complaintsArr} = useAuth()
  const navigation = useNavigation();
  
  return (
    <View style={'flex-1 '}>
      <Header title={"Missing Children Info"} />
      <View style={tw`flex-grow`}>
        {carr?.length === 0 && (
           <Text style={tw`w-full p-5 text-center `}>
              No Complaints
            </Text>
        )}
        {carr ? (
              <FlatList 
                  data={carr} 
                  
                  style={tw` h-full mb-8`}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => 
                      (
                          <TouchableOpacity style={tw`bg-white rounded p-4 mb-2 flex-row items-center`}
                            onPress={() => navigation.navigate('Details', {item})}>
                            <Image source={{ uri: item.cImage}} style={tw`h-24 w-24 border border-[${Colors.primary}] bg-gray-200 rounded-full`} />
                              <View style={tw`px-4`}>
                                <Text style={tw`text-xs font-normal text-gray-500`}>
                                  Child Name
                                </Text>
                                <Text style={tw`text-base font-normal`}>
                                  {item.cName}
                                </Text>
                                <Text style={tw`text-xs font-normal text-gray-500`}>
                                  Child Age
                                </Text>
                                <Text style={tw`text-base font-normal`}>
                                  {item.cAge}
                                </Text>
                                {item?.timestamp && (
                                  <>
                                    <Text style={tw`text-xs font-normal text-gray-500`}>
                                      Posted On
                                    </Text>
                                    <Text style={tw`text-base font-normal`}>
                                      {toDateGPK(item.timestamp.toDate())}
                                    </Text>
                                  </>
                                )}
                              </View>
                          </TouchableOpacity> 
                      )}
                  />
          ): (
            <Text style={tw`w-full p-5 text-center `}>
              No Complaints
            </Text>
          )}
      </View>
    </View>
  )
}

export default MCInfo