import { View, Text, TextInput,TouchableOpacity, Image, Platform, Linking, Modal } from 'react-native'
import React, {useEffect, useState} from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useAuth from '../../hooks/useAuth';
import Header from '../../components/Header';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where, addDoc } from 'firebase/firestore';
import { auth, db } from '../../database/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import CDropDownList from '../../components/CDropDownList';
const UFCD = () => {
    const navigation = useNavigation();
    const {complaintsArr} = useAuth()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [pno, setPno] = useState('')
    const [location, setLocation] = useState(null)
    const [address, setAddress] = useState('')

    const [complaintID, setComplaintID] = useState('')
    const [complaintOpen, setComplaintOpen] = useState(false)
    const [complaintList, setComplaintList] = useState([...complaintsArr.filter((item) => item.status !== 'found')])

    const [image, setImage] = useState(null);
    
    const inputStyle = tw`border border-2 border-gray-200 text-gray-900 text-base p-2  rounded`
    // latitude: location.coords.latitude,
    // longitude: location.coords.longitude,

    // const latitude = "40.7127753";
    // const longitude = "-74.0059728";
    // const label = "New York, NY, USA";

    // const url = Platform.select({
    //     ios: "maps:" + latitude + "," + longitude + "?q=" + label,
    //     android: "geo:" + latitude + "," + longitude + "?q=" + label
    // });
    // Linking.openURL(url)

    
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      
    
    return (
      <View style={tw` flex-1 bg-white`}>
        <Header title={"Upload Found Child Details"} />
        <KeyboardAwareScrollView style={tw`flex-1 p-5`} bounces={false}  >
            <View style={tw`w-full `}>
                <View style={tw`w-full flex items-center`}>   
                    <TouchableOpacity style={tw``} onPress={pickImage}>
                        {image ? (<Image source={{ uri: image}} style={tw`h-42 w-42 border border-[${Colors.primary}] bg-red-100 rounded-full`} />): (
                            <View  style={tw`h-42 w-42 border border-[${Colors.primary}] bg-gray-100 rounded-full items-center justify-center`} >
                                <Text style={tw`text-5xl font-bold text-[${Colors.primary}]`}>+</Text>
                            </View>
                        )   }                
                    </TouchableOpacity>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Upload Child Photo
                    </Text>
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Location
                    </Text>
                    <TextInput 
                        style={inputStyle}
                        value={address}
                        onChangeText={text => setAddress(text)}
                        placeholder="Enter Address"
                        />
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Your Name
                    </Text>
                    <TextInput 
                        style={inputStyle}
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder="Enter Name"
                        />
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2 `}>
                        Your Mobile Number
                    </Text>
                    
                    <TextInput 
                    keyboardType="numeric"
                    maxLength={10}
                    style={inputStyle}
                    value={pno}
                    onChangeText={text => setPno(text)}
                    placeholder="Enter Mobile Number"
                    autoCapitalize="none"
                    />
                </View>
                <View style={tw`w-full mb-4  flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Matched With Complaint
                    </Text>
                    <TouchableOpacity onPress={() => setComplaintOpen(true)}>
                      <Text 
                      style={[inputStyle, tw`p-3`]} >
                        {complaintID && complaintID === 'other' ? 'Child Not in List': complaintID.cName}
                      </Text>
                    </TouchableOpacity>
                    <Modal 
                    transparent={true}
                    animationType="fade"
                    visible={complaintOpen}
                    onRequestClose={() => setComplaintOpen(false)}
                    >
                        <CDropDownList setVisible={setComplaintOpen} 
                        setValue={setComplaintID}
                        items={complaintList} 
                        searchBar
                        />
                    </Modal>
                </View>
            
            <TouchableOpacity style={tw`w-full bg-[${Colors.primary}] p-2 rounded `}
                    onPress={() => UploadFun()}>
                    <Text style={tw`text-center text-base font-medium text-white`}>
                        Submit
                    </Text>
            </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      </View>
    )
}

export default UFCD