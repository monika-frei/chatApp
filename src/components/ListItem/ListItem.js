import React from "react";
import { Button } from "react-native";

const ListItem = ({ item, navigation }) => {
  return (
    <Button
      title={item.name}
      onPress={() => navigation.navigate("Chat room", { title: item.name })}
    ></Button>
  );
};

export default ListItem;
