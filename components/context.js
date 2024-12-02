import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
export const ContextData = createContext();
export const Context = ({ children }) => {
  const [ihaveaccount, setihaveaccount] = useState(false);
  const [idonthaveacc, setidonthaveacc] = useState(false);
  const [works, setworks] = useState(false);
  const [createWork, setcreateWork] = useState(false);
  const [myworks, setmyworks] = useState(false);
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const [enlemList, setenlemList] = useState([]);
  const [boylamlist, setboylamlist] = useState([]);
  const [iceriklist, seticeriklist] = useState([]);
 
  return (
    <ContextData.Provider
      value={{
        ihaveaccount,
        setihaveaccount,
        idonthaveacc,
        setidonthaveacc,
        name,
        setname,
        enlemList,
        setenlemList,
        boylamlist,
        setboylamlist,
        iceriklist,
        seticeriklist,
        loading,
        setloading,
     
      }}
    >
      {children}
    </ContextData.Provider>
  );
};

const styles = StyleSheet.create({});
