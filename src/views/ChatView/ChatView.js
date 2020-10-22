import React from "react";
import { View } from "react-native";
import ChatWithData from "../../components/ChatWithData/ChatWithData";

const ChatView = ({ route }) => {
  const { id } = route.params;
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ChatWithData id={id} />
    </View>
  );
};

export default ChatView;
