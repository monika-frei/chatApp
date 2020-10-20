import React from "react";
import { View } from "react-native";
import ListItem from "../ListItem/ListItem";

const RoomsList = ({ roomsList, navigation }) => {
  return (
    <View>
      {roomsList.map((item) => {
        return <ListItem key={item.id} navigation={navigation} item={item} />;
      })}
    </View>
  );
};

export default RoomsList;
