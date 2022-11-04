import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import useAuth from '../../hooks/useAuth'
import tw from 'twrnc'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
const ClosedComplaints = () => {
    const {users, complaintsArr, foundChildArr} = useAuth()
    const navigation = useNavigation();

    const toDateGPK = (d) => {
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const withSlashes = [day, month, year].join('/');
        return withSlashes
      }
      const getCmpById = (id)=>{
        return complaintsArr.filter(ite => ite.id === id )[0]
    }
    const displayClosedComplaints = () => {
        const carr = foundChildArr.filter((item) => item.status === 'found')
        if(carr.length === 0){
            return (
                <Text style={tw`w-full text-center pt-5`}>
                    Empty
                </Text>
            )
        }
        return (
            <FlatList 
            data={carr} 
            style={tw` mb-4 `}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              console.log("gpkID: ", item)
                let cmpDetails = getCmpById(item.complaintID)
                console.log(cmpDetails)
                return (
                    <TouchableOpacity style={tw`bg-white rounded p-4 mb-2 flex-row items-center `}
                    onPress={() => navigation.navigate('FoundCRDetails', {item})}>
                        <Image source={{ uri: cmpDetails?.cImage}} style={tw`h-24 w-24 mr-2 border border-[${Colors.primary}] bg-gray-200 rounded-full`} />
                        <Image source={{ uri: item.cImage}} style={tw`h-24 w-24 border border-[${Colors.primary}] bg-gray-200 rounded-full`} />
                        <View style={tw`flex-grow px-4 relative`}>
                            <View style={tw`absolute capitalize -top-2 -right-2  bg-[${Colors.primary}] p-1 rounded`}>
                                <Text style={tw` capitalize  text-white `}>
                                    {item.status}
                                </Text>
                            </View>
                          <Text style={tw`text-xs font-normal text-gray-500`}>
                            Name
                          </Text>
                          <Text style={tw`text-base font-normal`}>
                            {cmpDetails?.cName}
                          </Text>
                          {cmpDetails?.timestamp && (
                            <>
                              <Text style={tw`text-xs font-normal text-gray-500`}>
                                Posted On
                              </Text>
                              <Text style={tw`text-base font-normal`}>
                                {toDateGPK(cmpDetails?.timestamp.toDate())}
                              </Text>
                            </>
                          )}
                          {item?.closedOn && (
                            <>
                              <Text style={tw`text-xs font-normal text-gray-500`}>
                                Closed On
                              </Text>
                              <Text style={tw`text-base font-normal`}>
                                {toDateGPK(item.closedOn.toDate())}
                              </Text>
                            </>
                          )}
                        </View>
                    </TouchableOpacity> 
                )}}
            />
        )
    }
  return (
    <View style={tw`flex-1 `}>
        <Header title={"Closed Complaints"} />
        <View style={tw`flex-grow`}>
            {displayClosedComplaints()}
        </View>
    </View>
  )
}

export default ClosedComplaints