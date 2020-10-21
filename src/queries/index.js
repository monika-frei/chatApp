import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  {
    usersRooms {
      user {
        email
        firstName
        lastName
        id
        role
      }
      rooms {
        id
        name
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query room($id: String!) {
    room(id: $id) {
      id
      messages {
        body
        id
        insertedAt
        user {
          email
          firstName
          lastName
          id
          role
        }
      }
      name
      user {
        email
        firstName
        lastName
        id
        role
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation Message($text: String!, $roomId: String!) {
    sendMessage(body: $text, roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        lastName
        id
        role
      }
    }
  }
`;
const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        lastName
        id
        role
      }
    }
  }
`;
