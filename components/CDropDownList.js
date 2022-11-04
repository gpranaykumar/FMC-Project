import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Colors from '../constants/Colors'
const CDropDownList = ({items, setValue, setVisible, searchBar, location}) => {
    const [listItems, setListItems] = useState(items)
   
  return (
    <TouchableOpacity style={tw`flex-1 justify-center bg-black/20 p-2`} 
        activeOpacity={1} onPress={() => setVisible(false)}>
        <View style={tw`max-h-2/4  bg-gray-100 rounded border border-gray-300 py-1`}>
            
            {items.length === 0 && (
                <View style={tw`items-center p-2`}>
                    <Text style={tw` text-base font-normal p-1`}>
                        
                    </Text>
                </View>
            )}
             <TouchableOpacity     
                onPress={() => {
                    setVisible(false)
                    setValue("other")
                }}
                style={tw` p-2 rounded flex-row border-b border-black/25 `}
                >
                    <Text style={tw`w-full text-base font-normal`}>
                        Child Not in List
                    </Text>
                </TouchableOpacity>
            
                <ScrollView bounces={false} style={tw`rounded`}>
                        {listItems.map((item, idx) => {
                            return (
                                <TouchableOpacity 
                                    key={idx}    
                                    onPress={() => {
                                        setVisible(false)
                                        setValue(listItems[idx])
                                    }}
                                    style={tw` p-2 rounded flex-row ${idx !== listItems.length-1 ? 'border-b border-black/25': ''} `}
                                    >
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
                                        </View>
                                    </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>
        </View>
    </TouchableOpacity>
  )
}

export default CDropDownList