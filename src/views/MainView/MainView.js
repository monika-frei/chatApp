import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RoomsList from "../../components/RoomsList/RoomsList";

export const roomsList = [
  { id: 1, title: "The one with the Phoebe's recruitment task" },
  { id: 2, title: "The one with article for Phoebe" },
  { id: 3, title: "The one with some links for Phoebe" },
];

const MainView = ({ navigation }) => {
  return (
    <View>
      <RoomsList roomsList={roomsList} navigation={navigation} />
    </View>
  );
};

export default MainView;
