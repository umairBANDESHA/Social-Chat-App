import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "./Colors";

export default function PrimaryButtons({ children ,onPress }) {

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressAble}
        android_ripple={{ color: Colors.primary500 }}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    backgroundColor: Colors.primary700,
    borderRadius: 20,
    margin: 12,
  },
  pressAble: {
    padding: 10,
    paddingHorizontal: 25,
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    color:Colors.text,
  },
});
