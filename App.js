import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import MainView from "./src/views/MainView/MainView";
import ChatView from "./src/views/ChatView/ChatView";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MDU1MjE4NjMsImlhdCI6MTYwMzEwMjY2MywiaXNzIjoiY2hhdGx5IiwianRpIjoiNGZiNjI4ZWMtNTYxNC00ZTQ0LWI5NTQtM2ZkYWVjMTI3YmVhIiwibmJmIjoxNjAzMTAyNjYyLCJzdWIiOiJjNGFiMmUyNS0zNzFjLTQyMzctYjU0ZC01Y2FiNWZhN2E2Y2QiLCJ0eXAiOiJhY2Nlc3MifQ.rl3mL-Uu9aqYfKB-QzwIoSPBnpiwd0h3jVyEsdwh8Q5BGW8AP7k7CsWMM4pxBQzEisGZkvUPBz6g5lw3w160kw";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={MainView}
            options={{ title: "Chatly rooms" }}
          />
          <Stack.Screen
            name="Chat room"
            component={ChatView}
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
