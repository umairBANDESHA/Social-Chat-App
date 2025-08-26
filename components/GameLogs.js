import { StyleSheet , View , Text , useWindowDimensions } from "react-native";
import Colors from "./Colors";

export default function GameLogs({ roundNumber , guess }){

    const {width , height } = useWindowDimensions();

    const  maxWidth = height <400 ? "45%" : "100%";
    return(
        <View style={styles.containers}>
        <View style={[styles.container, {width: maxWidth}]}>
            <Text># {roundNumber}</Text>
            <Text>   Opponent's guess was: {guess}</Text>
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    containers:{
        marginVertical:8,
    },
    container: {
        borderColor:Colors.primary700,
        borderWidth:2,
        borderRadius:10,
        flexDirection: "row",
        padding:8,
        justifyContent: "space-between",
        backgroundColor: Colors.acent500,
    },
    text: {}
});