import { StyleSheet, View , Text, Platform } from "react-native";
import Colors from "./Colors";

export default function Title({children}){
    return(
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{children}</Text>
        </View>
    );
}
const styles =StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        
       borderWidth:2,
    
        borderColor:Colors.text,
        padding:20,
        marginHorizontal: 15,
        
    },
    titleText: {
        fontSize: 35,
        color:Colors.text,
    }

})