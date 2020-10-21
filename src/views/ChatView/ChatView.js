import React from "react";
import { View } from "react-native";
import Chat from "../../components/Chat/Chat";

const ChatView = ({ route }) => {
  const { id } = route.params;
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Chat id={id} />
    </View>
  );
};

export default ChatView;
