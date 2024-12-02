import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useContext, useState } from "react";
  import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
  import { useNavigation } from "@react-navigation/native";
  import { ContextData } from "./context";
  import { onValue, ref, update } from "firebase/database";
  import { db } from "../firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigation = useNavigation();
    const { ihaveaccount, setihaveaccount, idonthaveacc, setidonthaveacc,name,setname } =
      useContext(ContextData);
    const handlePress = () => {
      if(username.trim()&&password.trim()){
        onValue(ref(db,'DATA/'+username),(snapshot)=>{
            if(snapshot.child('/password').val()==password){
                AsyncStorage.setItem('name',username)
                AsyncStorage.setItem('logged','true')
                setname(username)
                console.log('basarili giris');
                navigation.navigate("main");
            }
        })
         
      }
   
    };
    const handlePressSig = () => {
      setidonthaveacc(true);
    };
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Giriş Yap</Text>
            <Text style={{ color: "gray", textAlign: "center" }}>
              Bir iş bulun Yada kendi işinizi yaptırın
            </Text>
            <View
              style={{
                width: "75%",
                height: 40,
                backgroundColor: "lightgray",
                borderRadius: 20,
                marginTop: 20,
              }}
            >
              <TextInput
                placeholder="Kullanıcı Adı"
                maxLength={20}
                onChangeText={(text) => {
                  setusername(text);
                }}
                style={{
                  width: "100%",
                  height: 40,
                  paddingLeft: 20,
                  fontSize: 16,
                }}
              />
            </View>
            <View
              style={{
                width: "75%",
                height: 40,
                backgroundColor: "lightgray",
                borderRadius: 20,
                marginTop: 20,
              }}
            >
              <TextInput
                placeholder="Şifre"
                maxLength={8}
                onChangeText={(text) => {
                  setpassword(text);
                }}
                secureTextEntry
                style={{
                  width: "100%",
                  height: 40,
                  paddingLeft: 20,
                  fontSize: 16,
                }}
              />
            </View>
            
            <TouchableOpacity
              style={{ width: "60%", marginTop: 20 }}
              onPress={handlePress}
            >
              <View
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "#031A6B",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Giriş Yap
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Hesabım yok,</Text>
              <TouchableOpacity onPress={handlePressSig}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#031A6B",
                    fontSize: 16,
                    marginLeft: 5,
                  }}
                >
                    Kayıt Olun
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    )
}



const styles = StyleSheet.create({})