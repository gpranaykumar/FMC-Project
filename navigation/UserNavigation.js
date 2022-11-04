import { View, Text } from 'react-native'
import React from 'react'
import UserHome from '../screens/user/UserHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddComplaint from '../screens/user/AddComplaint';
import Details from '../screens/Details/Details';
import useAuth from '../hooks/useAuth';
import AdminHome from '../screens/admin/AdminHome';
import ActiveComplaints from '../screens/admin/ActiveComplaints';
import FoundChild from '../screens/admin/FoundChild';
import FoundChildDetails from '../screens/admin/FoundChildDetails';
import FoundChildReview from '../screens/admin/FoundChildReview';
import FoundCRDetails from '../screens/admin/FoundCRDetails';
import ClosedComplaints from '../screens/admin/ClosedComplaints';

const UserNavigation = () => {
  const {profile} = useAuth()
  const UserStack = createNativeStackNavigator();

  const UserStackScreen = () => (
      <UserStack.Navigator
          screenOptions={{
              headerShown: false
          }}
          initialRouteName="Home"
       >
        
        <UserStack.Screen name="Home" component={ profile? (profile.iam === 'admin' ? AdminHome:UserHome):UserHome} />
        {profile?.iam === 'admin' && (
          <>
            <UserStack.Screen name="ActiveComplaints" component={ActiveComplaints} />
            <UserStack.Screen name="FoundChild" component={FoundChild} />
            <UserStack.Screen name="FoundChildReview" component={FoundChildReview} />
            <UserStack.Screen name="FoundChildDetails" component={FoundChildDetails} />
            <UserStack.Screen name="FoundCRDetails" component={FoundCRDetails} />
            <UserStack.Screen name="ClosedComplaints" component={ClosedComplaints} />
          </>
        )}
          <UserStack.Screen name="AddComplaint" component={AddComplaint} />
          <UserStack.Screen name="Details" component={Details} />
           
         </UserStack.Navigator> 
   )
return (
  <UserStackScreen/>
)
}

export default UserNavigation