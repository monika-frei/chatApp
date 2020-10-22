import React, { useState, useCallback, useEffect } from "react";
import Chat from "../Chat/Chat";
import { GET_MESSAGES, MESSAGES_SUBSCRIPTION } from "../../queries/index";
import { useQuery } from "@apollo/client";

const ChatWithData = ({ id }) => {
  const { subscribeToMore, ...result } = useQuery(GET_MESSAGES, {
    variables: { id: id },
  });

  return (
    <Chat
      {...result}
      id={id}
      subscribeToNewMessage={() =>
        subscribeToMore({
          document: MESSAGES_SUBSCRIPTION,
          variables: { roomId: id },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newFeedItem = subscriptionData.data.messageAdded;
            return Object.assign({}, prev, {
              room: { messages: [newFeedItem, ...prev.room.messages] },
            });
          },
        })
      }
    />
  );
};

export default ChatWithData;
