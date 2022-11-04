import { View, Text, TextInput,TouchableOpacity, Image } from 'react-native'
import React, {useCallback, useState} from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {auth, db} from '../../database/firebase'
import {fetchSignInMethodsForEmail, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, getMetadata, getStorage, ref, updateMetadata, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';

import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import LoadingModal from '../../components/LoadingModal';

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('')
  const [aNo, setANo] = useState('')
  const [cno, setCno] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [cnfpassword, setCnfPassword] = useState('')
  const inputStyle = tw`border border-2 border-gray-200 text-gray-900 text-base p-2  rounded`
  const [showPassword, setShowPassword] = useState(true)
  
  

  function validateEmail(email) {
    var re = /^\S+@\S+\.\S+/;
    return re.test(email);
  }
  return (
    <View style={tw`h-screen flex-1 bg-white p-5 relative`}>
      {loading && <LoadingModal text={"Creating Account..."}/>}
    <KeyboardAwareScrollView style={tw`flex-1 `} bounces={false}  >
          <View style={tw`w-full`}>
            <View style={tw`w-full pb-8`}>
              <TouchableOpacity style={tw`flex-row items-center`} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={tw`text-sm font-semibold`}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-col pb-5 justify-center `}>
              <Text style={tw`text-3xl font-bold`}>
                Sign Up 
              </Text>
            </View>
            <View style={tw`w-full `}>
              <View style={tw`w-full flex`}>
                <Text style={tw`text-base font-medium text-gray-500 py-2`}>Name</Text>
                <TextInput 
                    style={inputStyle}
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder="Enter Name"
                    />
              </View>
              <View style={tw`w-full  flex`}>
                <Text style={tw`text-base font-medium text-gray-500 py-2`}>Aadhar Number</Text>
                <TextInput 
                    keyboardType="numeric"
                    style={inputStyle}
                    value={aNo}
                    maxLength={12}
                    onChangeText={text => setANo(text)}
                    placeholder="Enter Aadhar Number"
                    />
              </View>
              <View style={tw`w-full  flex`}>
                <Text style={tw`text-base font-medium text-gray-500 py-2`}>Ph. No</Text>
                <TextInput 
                    keyboardType="numeric"
                    style={inputStyle}
                    value={cno}
                    maxLength={10}
                    onChangeText={text => setCno(text)}
                    placeholder="Enter Contact Number"
                    />
              </View>
              <View style={tw`w-full  flex`}>
                <Text style={tw` text-base font-medium text-gray-500 py-2`}>Email</Text>
                <TextInput 
                    style={inputStyle}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    />
              </View>
              <View style={tw`w-full flex`}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw` text-base font-medium text-gray-500 py-2`}>Password</Text>
                  <TouchableOpacity style={tw`opacity-50`} onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name="eye-off" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                  <TextInput 
                  secureTextEntry={showPassword}
                  style={inputStyle}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholder="Enter Password"
                  autoCapitalize="none"
                  />
                  
              </View>
              <Text style={tw`text-xs font-light pb-1`}>
                  Your password must be 8 or more characters long 
                  {/* & contain a mix of upper & lower case letters, numbers & symbols. */}
              </Text>
              <View style={tw`w-full mb-4 flex`}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw` text-base font-medium text-gray-500 py-2`}>Confirm Password</Text>
                  <TouchableOpacity style={tw`opacity-50`} onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name="eye-off" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                  <TextInput 
                  secureTextEntry={showPassword}
                  style={inputStyle}
                  value={cnfpassword}
                  onChangeText={text => setCnfPassword(text)}
                  placeholder="Enter Confirm Password"
                  autoCapitalize="none"
                  />
              </View>
              <TouchableOpacity style={tw`w-full bg-[${Colors.primary}] py-2 rounded `}
                    onPress={() => {
                        setLoading(true)
                        onRegister()
                      }
                      }>
                    <Text style={tw`text-center text-base font-medium text-white`}>
                        Create an account
                    </Text>
              </TouchableOpacity>

              <View style={tw`flex-wrap flex-row  justify-center items-center p-5 `}>
                    <Text style={tw`opacity-50`}>
                        By signing up, you're agree to our
                    </Text>
                    <TouchableOpacity onPress={() => alert("Terms of Use")} >
                        <Text style={tw`pl-1 font-semibold`}>
                        Terms of Use
                        </Text>
                    </TouchableOpacity>
                    <Text style={tw`pl-1 opacity-50`}>
                        and
                    </Text>
                    <TouchableOpacity onPress={() => alert("Privacy Policy.")} >
                        <Text style={tw`pl-1 font-semibold`}>
                        Privacy Policy.
                        </Text>
                    </TouchableOpacity>
                </View>
          </View>
          </View>
    </KeyboardAwareScrollView>
    </View>
  )
}

export default Register