import { View , Text ,StyleSheet,  useWindowDimensions } from "react-native";
import Colors from "./Colors";

 function GuessNbr({ children}){
    const {width , height} = useWindowDimensions();

    const fontSize = height < 400 ? 28 : 68;

    return(
        <View style = {[style.container ]}>
            <Text style= {[style.text , {fontSize: fontSize,}]}>{children}</Text>
        </View>
    );
}

export default GuessNbr;

const style = StyleSheet.create({
    container: {
        paddingHorizontal:24,
        paddingVertical:10,
        margin:20,
        borderWidth:4,
        borderRadius:10,
        borderColor:Colors.acent500,
        // maxWidth:"80%",
    },
    text:{
        
        // fontSize: 68,
        color: Colors.acent500,
        textAlign: 'center',
    }
})