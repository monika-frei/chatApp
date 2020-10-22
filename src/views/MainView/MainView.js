import React from "react";
import { StyleSheet, View } from "react-native";
import RoomsList from "../../components/RoomsList/RoomsList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

const MainView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <RoomsList navigation={navigation} />
    </View>
  );
};

export default MainView;
