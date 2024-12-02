import { StatusBar } from "expo-status-bar";
import { PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Sign } from "./components/Sign";
import { Login } from "./components/Login";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./components/Home";
import { Context, ContextData } from "./components/context";
import { useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Creatework } from "./components/createWork";
import { Myworks } from "./components/myWorks";

const Stack = createStackNavigator();
export default function App() {
  const [logged, setlogged] = useState('')

  const loggedControl=async()=>{
   
    await AsyncStorage.getItem('logged').then((data)=>{
      setlogged(data)
    })
  }
  useEffect(()=>{
    //AsyncStorage.clear();
    loggedControl()},[])
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="register"
            component={logged==null?RegisterScreen:HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="main"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}
const RegisterScreen = () => {
  const pageref=useRef(null)
  const { ihaveaccount, setihaveaccount, idonthaveacc, setidonthaveacc } =
  useContext(ContextData);
  useEffect(()=>{
    if(ihaveaccount){
      pageref.current.setPage(1);
      setihaveaccount(false);
    }
  },[ihaveaccount])
  useEffect(()=>{
    if(idonthaveacc){
      pageref.current.setPage(0);
      setidonthaveacc(false);
    }
  },[idonthaveacc])
  return (
    <PagerView style={{ flex: 1 }} ref={pageref}>
      <View style={styles.container}>
        <Sign />
      </View>
      <View style={styles.container}>
        <Login />
      </View>
    </PagerView>
  );
};
const HomeScreen = () => {
  const pageref=useRef(null)
  return (<>
    <PagerView style={{flex:1}} ref={pageref}>
      <View style={styles.container}>
        <Home />
      </View>
      <View style={styles.container}>
        <Creatework />
      </View>
      <View style={styles.container}>
        <Myworks />
      </View>
    </PagerView>
    <View
            style={{
              width: "100%",
              height: 60,
              position: "absolute",
              bottom: 0,
              backgroundColor: "rgba(3, 26, 107,0.7)",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={()=>{pageref.current.setPage(0)}}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  name="newspaper-o"
                  size={22 / PixelRatio.getFontScale()}
                  color="white"
                />
                <Text style={{ color: "white" }}>Mevcut İşler</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{pageref.current.setPage(1)}}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
              <MaterialCommunityIcons name="newspaper-plus" size={24/PixelRatio.getFontScale()} color="white" />
                <Text style={{ color: "white" }}>İş Oluştur</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{pageref.current.setPage(2)}}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
              <AntDesign name="filetext1" size={24} color="white" />
                <Text style={{ color: "white" }}>İşlerim</Text>
              </View>
            </TouchableOpacity>
          </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
