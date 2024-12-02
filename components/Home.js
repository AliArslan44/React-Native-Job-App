import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { MapMarker, Marker } from "react-native-maps";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as imagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { get, onValue, ref, set, update } from "firebase/database";
import { db } from "../firebaseconfig";
import * as Location from "expo-location";
export const Home = () => {
  const [USD, setUSD] = useState(0);
  const [showprofileCont, setshowprofileCont] = useState(false);
  const [selectedIMG, setselectedIMG] = useState("");
  const [name, setname] = useState("");
  const [delta, setdelta] = useState(70);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [showINfOAboutWork, setshowINfOAboutWork] = useState(false);
  const [coordints, setcoordints] = useState({ latitude: 0, longitude: 0 });
  const [Data, setData] = useState([]);

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
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = coords;
    console.log(coords);

    setcoordints({ latitude: latitude, longitude: longitude });
  };
  const handlePressAccept = () => {
    set(
      ref(
        db,
        `DATA/${Data[selectedIndex].yayınlayan}/Works/${Data[selectedIndex].icerik}/Elemanlar/`
      ),
      {
        eleman: name,
      }
    );
    update(ref(db, `DATA/${name}/Acceptworks/${Data[selectedIndex].icerik}/`), {
      icerik: Data[selectedIndex].icerik,
      ucret: Data[selectedIndex].ucret,
      yayınlayan: Data[selectedIndex].yayınlayan,
    });
  };

  const handlePressProfile = () => {
    setshowprofileCont(true);
  };
  const handlepressCancel = () => {
    setshowprofileCont(false);
    setshowINfOAboutWork(false);
  };
  const handlepresschoose = async () => {
    const result = await imagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (result) {
      setselectedIMG(result.assets[0].uri);
    }
  };
  const asyncValues = async () => {
    await AsyncStorage.getItem("name").then((data) => {
      setname(data);
    });
  };
  const handlePressWork = (index) => {
    setshowINfOAboutWork(true);
    setselectedIndex(index);
    console.log(Data[index].icerik);
  };
  useEffect(() => {
    if (Data.length > 0) {
      console.log(Data[0].locationEN);
    }
  }, [Data]);
  useEffect(() => {
    asyncValues();
    getLocation();
    onValue(ref(db, "PublicWorks/"), (snapshot) => {
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        {showprofileCont ? (
          <View
            style={{
              position: "absolute",
              zIndex: 1000,
              height: Dimensions.get("screen").height,
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "75%",
                height: 250,
                backgroundColor: "white",
                borderRadius: 30,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ position: "absolute", right: 20, top: 20 }}>
                <TouchableOpacity onPress={handlepressCancel}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handlepresschoose}>
                <Text>Resim Seçin</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View style={{ flex: 1,justifyContent:'center' }}>
          <BlurView
            intensity={30}
            tint="light"
            style={{
              width: "100%",
              height: 65,
              position: "absolute",
              top: 0,
              zIndex: 100,
              justifyContent: "center",
              paddingLeft: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={handlePressProfile}>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={{
                    uri: !selectedIMG.trim()
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAA1BMVEUAAACnej3aAAAAPUlEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvgyZwAABCrx9CgAAAABJRU5ErkJggg=="
                      : selectedIMG,
                  }}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "column", marginLeft: 20 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20 / PixelRatio.getFontScale(),
                    fontWeight: "bold",
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 17 / PixelRatio.getFontScale(),
                  }}
                >
                  {USD}$
                </Text>
              </View>
            </View>
          </BlurView>
          {showINfOAboutWork ? (
            <View
              style={{
                position: "absolute",
                width: (Dimensions.get("screen").width * 70) / 100,
                height: 250,
                backgroundColor: "white",
                borderRadius: 25,
                left:
                  (Dimensions.get("screen").width * 50) / 100 -
                  (Dimensions.get("screen").width * 70) / 100 / 2,
                top: (Dimensions.get("screen").height * 50) / 100 - 125,
                zIndex: 1,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  {Data[selectedIndex].icerik}
                </Text>
                <Text>Yayınlayan:{Data[selectedIndex].yayınlayan}</Text>
                <Text>Ücret:{Data[selectedIndex].ucret}$</Text>
                <TouchableOpacity onPress={handlePressAccept}>
                  <View
                    style={{
                      width:
                        (((Dimensions.get("screen").width * 70) / 100) * 80) /
                        100,
                      height: 50,
                      backgroundColor: "#32a836",
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      İşe Katıl
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ position: "absolute", right: 15, top: 15 }}>
                  <TouchableOpacity onPress={handlepressCancel}>
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}
          {coordints.longitude != 0 ? (
            <MapView
              customMapStyle={customMapStyle}
              onRegionChangeComplete={(reg) => {
                setdelta(Math.round(reg.latitudeDelta));
              }}
              initialRegion={{
                latitude: coordints.latitude != 0 ? coordints.latitude : 0,
                longitude: coordints.longitude != 0 ? coordints.longitude : 0,
                longitudeDelta: 1,
                latitudeDelta: 1,
              }}
              style={{ width: "100%", height: "100%", display: "flex" }}
            >
              {Data.length > 0 && delta < 14
                ? Array.from({ length: Data.length - 1 }, (_, i) => (
                    <Marker
                      onPress={() => {
                        handlePressWork(i);
                      }}
                      key={i}
                      coordinate={{
                        latitude: Data[i].locationEN,
                        longitude: Data[i].locationBO,
                      }}
                      anchor={{ x: 0, y: 0 }}
                      zIndex={1}
                    >
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: "red",
                          borderRadius: 8,
                        }}
                      ></View>
                    </Marker>
                  ))
                : null}
            </MapView>
          ) :<Text style={{color:'white',textAlign:'center'}}>Konum hizmeti kapalı ise uygulama çalışmaz</Text>}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});
