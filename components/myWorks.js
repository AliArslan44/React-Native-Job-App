import {
  Dimensions,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextData } from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PagerView from "react-native-pager-view";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseconfig";
import *as Location from 'expo-location'
export const Myworks = () => {
  const [name, setname] = useState("");
  const pageref = useRef(null);
  const [enabled, setenabled] = useState(false);
  const [shareWorks, setshareWorks] = useState([]);
  const [joinWorks, setjoinWorks] = useState([]);
 
  const asyncValues = async () => {
    await AsyncStorage.getItem("name").then((data) => {
      onValue(ref(db, `DATA/${data}/Acceptworks/`), (snapshot) => {
        if (snapshot.exists()) {
          setjoinWorks(Object.values(snapshot.val()));
        }
      });
      onValue(ref(db, `DATA/${data}/Works/`), (snapshot) => {
        if (snapshot.exists()) {
          setshareWorks(Object.values(snapshot.val()));
        }
      });
      setname(data);
      console.log(data);
    });
  };

  useEffect(() => {
 
    asyncValues();
 
  }, []);

  return (
    <>
      <View
        style={{
          flex: 0.5,
          alignItems: "center",
          backgroundColor: "rgba(0,0,255,0.5)",
        }}
      >
        <View style={{ flex: 1, width: "100%" }}>
          <Text
            style={{
              fontSize: 25,
              color: "white",
              textAlign: "left",
              width: "90%",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Paylaştığınız veya Katıldığınız işleri buradan görüntüleyin
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              flex: 1,
              borderBottomWidth: enabled ? 3 : 0,
              borderBlockColor: "blue",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                pageref.current.setPage(0);
                setenabled(true);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                Katıldığım İşler
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: enabled ? 0 : 3,
              borderBlockColor: "blue",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                pageref.current.setPage(1);
                setenabled(false);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                Yayınladığım işler
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <PagerView style={{ flex: 1, width: "100%" }} ref={pageref}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {joinWorks.length > 0
                ? Array.from({ length: joinWorks.length }, (_, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        padding: 10,
                        justifyContent: "space-between",
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 20/PixelRatio.getFontScale(), fontWeight: "bold" }}>
                          İş:{" "}
                        </Text>
                        <Text style={{ fontSize: 17/PixelRatio.getFontScale() }}>
                          {joinWorks[index].icerik}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 20/PixelRatio.getFontScale(), fontWeight: "bold" }}>
                          Yayınlayan:{" "}
                        </Text>
                        <Text style={{ fontSize: 17/PixelRatio.getFontScale() }}>
                          {joinWorks[index].yayınlayan}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 20/PixelRatio.getFontScale(), fontWeight: "bold" }}>
                          Ücret:{" "}
                        </Text>
                        <Text style={{ fontSize: 17/PixelRatio.getFontScale() }}>
                          {joinWorks[index].ucret}$
                        </Text>
                      </View>
                    </View>
                  ))
                : null}
            </ScrollView>
          </View>
          <View style={{ flex: 1 }}>
            {shareWorks.length > 0
              ? Array.from({ length: shareWorks.length }, (_, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      padding: 10,
                      justifyContent: "space-between",
                      borderBottomWidth:1,
                      borderBottomColor:'black'
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 20/PixelRatio.getFontScale(), fontWeight: "bold" }}>
                        İş:{" "}
                      </Text>
                      <Text style={{ fontSize: 17/PixelRatio.getFontScale() }}>
                        {shareWorks[index].icerik}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 20/PixelRatio.getFontScale(), fontWeight: "bold" }}>
                        Ücret:{" "}
                      </Text>
                      <Text style={{ fontSize: 17/PixelRatio.getFontScale() }}>
                        {shareWorks[index].ucret}$
                      </Text>
                    </View>
                  </View>
                ))
              : null}
          </View>
        </PagerView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
