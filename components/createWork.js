import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MapView, { Marker } from "react-native-maps";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onValue, ref, update } from "firebase/database";
import { db } from "../firebaseconfig";
import { ContextData } from "./context";
export const Creatework = () => {
  const [showLocationMap, setshowLocationMap] = useState(false);
  const [icerik, seticerik] = useState("");
  const [koordinat, setkoordinat] = useState({ enlem: 0, boylam: 0 });
  const [name, setname] = useState("");
  const [odeme, setodeme] = useState("");
  const [isMoving, setisMoving] = useState(false);
  const {
    enlemList,
    setenlemList,
    boylamlist,
    setboylamlist,
    iceriklist,
    seticeriklist,
  } = useContext(ContextData);
  const customMapStyle = [
    {
      elementType: "geometry",
      stylers: [{ color: "#212121" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#212121" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#373737" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
  ];
  const getasyncVals = async () => {
    AsyncStorage.getItem("name").then((data) => {
      setname(data);
    });
  };
  useEffect(() => {
    getasyncVals();
  }, []);
  const handlepresscreate = () => {
    enlemList.push(koordinat.enlem);
    boylamlist.push(koordinat.boylam);
    iceriklist.push(icerik);
    if (koordinat.boylam != 0 && koordinat.enlem != 0 && icerik.trim()) {
      update(ref(db, `DATA/${name}/Works/` + icerik), {
        icerik: icerik,
        locationEN: koordinat.enlem,
        locationBO: koordinat.boylam,
        ucret: odeme,
      });
     
    
          update(ref(db, `PublicWorks/${icerik}/`), {
            icerik: icerik,
            locationEN: koordinat.enlem,
            locationBO: koordinat.boylam,
            ucret: odeme,
            yayınlayan: name,
          });
        
    

      seticerik("");
      setodeme("");
      setkoordinat({ enlem: 0, boylam: 0 });
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {showLocationMap ? (
            <>
              <MapView
                onPress={(e) => {
                  setkoordinat({
                    enlem: e.nativeEvent.coordinate.latitude,
                    boylam: e.nativeEvent.coordinate.longitude,
                  });
                }}
                onPanDrag={(e) => {
                  setkoordinat({
                    enlem: e.nativeEvent.coordinate.latitude,
                    boylam: e.nativeEvent.coordinate.longitude,
                  });
                }}
                customMapStyle={customMapStyle}
                style={{
                  width: "90%",
                  height: 300,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: koordinat.enlem,
                    longitude: koordinat.boylam,
                  }}
                  anchor={{ x: 0, y: 0 }}
                >
                  <Entypo name="location-pin" size={24} color="red" />
                </Marker>
              </MapView>
            </>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              height: 40,
              alignItems: "center",
            }}
          >
            <Text>İşin İçeriği: </Text>
            <TextInput
              style={{
                width: "80%",
                height: "100%",
                backgroundColor: "lightgray",
                borderRadius: 20,
                paddingLeft: 20,
              }}
              value={icerik}
              onChangeText={(text) => {
                seticerik(text);
              }}
              placeholder="içerik"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              height: 40,
              alignItems: "center",
            }}
          >
            <Text>İşin Konumu: </Text>
            <TouchableOpacity
              onPress={() => {
                setshowLocationMap(!showLocationMap);
              }}
            >
              <EvilIcons name="location" size={26} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              height: 40,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text>İş Ücreti:</Text>
            <TextInput
              style={{
                width: "80%",
                height: "100%",
                backgroundColor: "lightgray",
                borderRadius: 20,
                paddingLeft: 20,
                marginLeft: 5,
              }}
              value={odeme}
              onChangeText={(text) => {
                setodeme(text);
              }}
              placeholder="USD bazındadır"
              inputMode="numeric"
            />
          </View>
          <TouchableOpacity onPress={handlepresscreate}>
            <View
              style={{
                width: (Dimensions.get("screen").width * 60) / 100,
                height: 40,
                backgroundColor: "rgba(3, 26, 107,1)",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Oluştur
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});
