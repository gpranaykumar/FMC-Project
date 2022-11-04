import React from 'react'
import useAuth from '../hooks/useAuth';
import UserNavigation from './UserNavigation';
import DefaultNavigation from './DefaultNavigation';
import { View, Text } from 'react-native'
import tw from 'twrnc'
import LoadingModal from '../components/LoadingModal';
const NavIndex = () => {
    const {user, loading} = useAuth();
    return (
     <View style={tw`relative flex-1`}>
        {loading===true && <LoadingModal />}
      {user? <UserNavigation/> : <DefaultNavigation/>}
     </View>
    )
}

export default NavIndex