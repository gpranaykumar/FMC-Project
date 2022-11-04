import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import tw from 'twrnc'
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where, addDoc } from 'firebase/firestore';
import { auth, db } from '../../database/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


const AddComplaint = () => {
    const navigation = useNavigation();
    const {profile} = useAuth()
    // console.log("Add Comp:", profile)
    const [loading, setLoading] = useState(false)
    const [cName, setCName] = useState('')
    const [cAge, setCAge] = useState('')
    const [image, setImage] = useState(null);
    const [gName, setGName] = useState('')
    const [gPno, setGPno] = useState('')
    const [relation, setRelation] = useState('')
    const [identMarks, setIdentMarks] = useState('')
    const [lstArea, setlstArea] = useState('')
    const inputStyle = tw`border border-2 border-gray-200 text-gray-900 text-base p-2  rounded`

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
        // console.log(result);
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    
  return (
    <View style={tw`flex-1 bg-white`}>
        <Header title={"Add Complaint"} />
        <KeyboardAwareScrollView style={tw`flex-1 p-5 pb-8`} bounces={false}  >
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
                        Child Name
                    </Text>
                    <TextInput 
                        style={inputStyle}
                        value={cName}
                        onChangeText={text => setCName(text)}
                        placeholder="Enter Child Name"
                        />
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Child Age
                    </Text>
                    <TextInput 
                        style={inputStyle}
                        value={cAge}
                        onChangeText={text => setCAge(text)}
                        placeholder="Enter Child Age"
                        />
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Guardian Name
                    </Text>
                    <TextInput 
                        style={inputStyle}
                        value={gName}
                        onChangeText={text => setGName(text)}
                        placeholder="Enter Guardian Name"
                        />
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2 `}>
                        Guardian Phone Number
                    </Text>
                    
                    <TextInput 
                    keyboardType="numeric"
                    maxLength={10}
                    style={inputStyle}
                    value={gPno}
                    onChangeText={text => setGPno(text)}
                    placeholder="Enter Guardian Phone Number"
                    autoCapitalize="none"
                    />
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Email Id
                    </Text>
                    <TextInput 
                        editable={false} selectTextOnFocus={false}
                        style={[inputStyle, tw`text-gray-400`]}
                        value={auth.currentUser.email}
                        placeholder="..."
                        />
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Relation with Child
                    </Text>
                    <TextInput 
                        style={inputStyle}
                        value={relation}
                        onChangeText={text => setRelation(text)}
                        placeholder="Enter Relation "
                        />
                </View>
                <View style={tw`w-full flex`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Identification Marks
                    </Text>
                    <TextInput 
                        style={inputStyle}
                        value={identMarks}
                        onChangeText={text => setIdentMarks(text)}
                        placeholder="Enter Identification Marks "
                        />
                </View>
                <View style={tw`w-full flex mb-4`}>
                    <Text style={tw`text-base font-medium text-gray-500 py-2`}>
                        Last Seen Area and Time
                    </Text>
                    <TextInput 
                        style={inputStyle}
                        value={lstArea}
                        onChangeText={text => setlstArea(text)}
                        placeholder="Enter Last Seen Area and Time "
                        />
                </View>
                
            
            <TouchableOpacity style={tw`w-full bg-[${Colors.primary}] p-2 rounded mb-8`}
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

export default AddComplaint