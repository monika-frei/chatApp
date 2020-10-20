import React from "react";
import { Button } from "react-native";

const ListItem = ({ item, navigation }) => {
  return (
    <Button
      title={item.title}
      onPress={() => navigation.navigate("Chat room", { title: item.title })}
    ></Button>
  );
};

export default ListItem;
