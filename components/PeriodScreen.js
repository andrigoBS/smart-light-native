import {StyleSheet, Text, View} from 'react-native';

import CardComponent from "./CardComponent";
import TimePicker from "./TimePicker";

import TableComponent from "./TableComponent";

const PeriodScreen = ({typeOfPeriod}) => {

    return (
        <View style={styles.container}>
            <CardComponent>
                <Text style={styles.cardTitle}>Períodos Definidos</Text>
                <TableComponent typeOfPeriod={typeOfPeriod}/>
            </CardComponent>

            <CardComponent>
                <Text style={styles.cardTitle}>Definir Novo Período</Text>
                <TimePicker typeOfPeriod={typeOfPeriod}/>
            </CardComponent>
        </View>
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
export default PeriodScreen;