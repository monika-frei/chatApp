import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ListItem from "../ListItem/ListItem";
import { GET_ROOMS } from "../../queries/index";
import { useQuery } from "@apollo/client";

const RoomsList = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ROOMS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <View>
      <FlatList
        data={data.usersRooms.rooms}
        renderItem={({ item }) => {
          return <ListItem key={item.id} navigation={navigation} item={item} />;
        }}
      ></FlatList>
    </View>
  );
};

export default RoomsList;
