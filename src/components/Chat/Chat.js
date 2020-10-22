import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SEND_MESSAGE } from "../../queries/index";
import { useMutation } from "@apollo/client";

const Chat = ({ id, subscribeToNewMessage, ...result }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [sendMessage, { sendData }] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    subscribeToNewMessage();
    const data = result.data;
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
    data && setUser(result.data.room.user.id);
  }, [result.data]);

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
