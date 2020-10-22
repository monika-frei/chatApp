import React from "react";
import { Text } from "react-native";
import Chat from "../Chat/Chat";
import { GET_MESSAGES } from "../../queries/index";
import { useQuery } from "@apollo/client";

const ChatWithData = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { id: id },
  });
  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;
  return <Chat result={data} id={id} />;
};

export default ChatWithData;
