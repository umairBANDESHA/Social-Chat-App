import { View, StyleSheet } from "react-native";

import Colors from "./Colors";

export default function Card({children}) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
    card : {
        marginTop: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        // borderWidth:1,
        borderRadius: 20,
        backgroundColor:Colors.primary500,
        alignItems: "center",
      },
});