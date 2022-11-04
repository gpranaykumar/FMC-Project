import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import useAuth from '../../hooks/useAuth'
import tw from 'twrnc'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
const ActiveComplaints = () => {
    const {users, complaintsArr, foundChildArr} = useAuth()
    const navigation = useNavigation();

    const toDateGPK = (d) => {
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const withSlashes = [day, month, year].join('/');
        return withSlashes
      }

    const displayComplaints = () => {
        const carr = complaintsArr.filter((item) => item.status === 'active')
        if(carr.length === 0){
            return (
                <Text style={tw`w-full text-center pt-5`}>
                    No Active Complaints
                </Text>
            )
        }
        return (
            <FlatList 
            data={carr} 
            style={tw` mb-4 `}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
                (
                    <TouchableOpacity style={tw`bg-white rounded p-4 mb-2 flex-row items-center `}
                      onPress={() => navigation.navigate('Details', {item})}>
                      <Image source={{ uri: item.cImage}} style={tw`h-24 w-24 border border-[${Colors.primary}] bg-gray-200 rounded-full`} />
                        <View style={tw`flex-grow px-4 relative`}>
                            <View style={tw`absolute capitalize -top-2 -right-2 ${item.status === 'active' ?' bg-green-200 ' : 'bg-red-200 '} p-1 rounded`}>
                                <Text style={tw``}>
                                    {item.status}
                                </Text>
                            </View>
                          <Text style={tw`pt-4 text-xs font-normal text-gray-500`}>
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
        )
    }
  return (
    <View style={tw`flex-1 `}>
        <Header title={"Active Complaints"} />
        <View style={tw`flex-grow`}>
            {displayComplaints()}
        </View>
    </View>
  )
}

export default ActiveComplaints