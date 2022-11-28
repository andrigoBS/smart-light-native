import {StyleSheet, Text, View} from 'react-native';
import {DataTable, IconButton} from "react-native-paper";
import CardComponent from "./CardComponent";
import TimePicker from "./TimePicker";
import Image from 'react-native-remote-svg'
import PeriodScreen from "./PeriodScreen";

const ActivationScreen = () => {

    return (
        <PeriodScreen typeOfTime={"on"}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    button: {
        marginVertical : 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#ff7f50',
    }
});
export default ActivationScreen;