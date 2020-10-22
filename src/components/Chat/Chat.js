import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SEND_MESSAGE, MESSAGES_SUBSCRIPTION } from "../../queries/index";
import { useMutation, useSubscription } from "@apollo/client";

const Chat = ({ id, result }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [sendMessage, { sendData }] = useMutation(SEND_MESSAGE);

  // something went wrong -->

  // const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
  //   variables: { roomId: id },
  // });

  useEffect(() => {
    const dataMessages = result ? result.room.messages : [];
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
    result && setUser(result.room.user.id);
  }, [result]);

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

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user,
      }}
    />
  );
};

export default Chat;
