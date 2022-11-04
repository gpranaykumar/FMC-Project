import { View, Text, TextInput,TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const {login} = useAuth()

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputStyle = tw`border border-2 border-gray-200 text-gray-900 text-base p-2  rounded`
  const [showPassword, setShowPassword] = useState(true)

  function validateEmail(email) {
    var re = /^\S+@\S+\.\S+/;
    return re.test(email);
  }

  const onLogin = () => {
    setLoading(true)
    try{
      if( !email || !password ){
        alert("Fill all Details")
      }else{
        if(!validateEmail(email)){
          alert("Enter Valid Email Address")
        }else{
          login(email, password)
        }
      }
    }catch(err){
      console.log("onLogin Error: ", err)
    }finally{
      setLoading(false)
    }
  }
  return (
    <View style={tw`flex-1 bg-white p-5 `}>
    <KeyboardAwareScrollView style={tw`flex-grow py-5 z-30`} bounces={false}  >
          <View style={tw`flex-grow w-full  py-2 `}>
            <View style={tw`w-full pb-8`}>
              <TouchableOpacity style={tw`flex-row items-center`} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={tw`text-sm font-normal`}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-col pb-5 justify-center `}>
              <Text style={tw`text-3xl font-bold`}>
               Login
              </Text>
              <Text style={tw`text-base font-normal `}>
                
              </Text>
            </View>
            <View style={tw`w-full `}>
              <View style={tw`w-full flex`}>
                <Text style={tw`w-22 text-base font-medium text-gray-500 py-2`}>Email</Text>
                <TextInput 
                    style={inputStyle}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    />
              </View>
              <View style={tw`w-full mb-4 flex`}>
                <View style={tw`flex-row items-center `}>
                  <Text style={tw`w-22 text-base font-medium text-gray-500 py-2 `}>
                    Password
                  </Text>
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
              
              <TouchableOpacity style={tw`w-full bg-[${Colors.primary}] p-2 rounded `}
                    onPress={() => onLogin()}>
                    <Text style={tw`text-center text-base font-medium text-white`}>
                        Submit
                    </Text>
              </TouchableOpacity>

              <View style={tw`flex z-30 flex-row justify-center items-center p-5 `}>
                    <Text style={tw``}>
                        Don't have an account? 
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                        <Text style={tw`pl-1 underline`}>
                        Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
          </View>
          </View>
      <Image source={require('../../assets/img/login.png')} 
                  style={tw`z-0 w-full h-32 `} />
    </KeyboardAwareScrollView>
    </View>
  )
}

export default Login