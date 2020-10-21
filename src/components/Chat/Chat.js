import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  GET_MESSAGES,
  SEND_MESSAGE,
  MESSAGES_SUBSCRIPTION,
} from "../../queries/index";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

const Chat = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { id },
  });
  const [sendMessage, { sendData }] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    const dataMessages = data ? data.room.messages : [];
    const array =
      dataMessages &&
      dataMessages.map((message) => {
        return {
          _id: message.id,
          text: message.body,
          createdAt: message.insertedAt,
          user: {
            _id: message.user.id,
            name: message.user.firstName,
          },
        };
      });
    setMessages(array);
  }, [data]);

  const onSend = useCallback((messages = []) => {
    sendMessage({
      variables: {
        text: messages[0].text,
        roomId: id,
      },
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: data.room.user.id,
      }}
    />
  );
};

export default Chat;
