import {StyleSheet, Text, View} from 'react-native';
import CardComponent from "./CardComponent";
import {DataTable, IconButton} from "react-native-paper";
import TimePicker from "./TimePicker";
import Image from 'react-native-remote-svg'

const DeactivationScreen = () => {

    return (
        <View style={styles.container}>
            <CardComponent>
                <Text style={styles.cardTitle}>Períodos Definidos</Text>
                <DataTable style={{ borderWidth: 1, borderColor: '#ecebeb'}}>
                    <DataTable.Header>
                        <DataTable.Title>Início</DataTable.Title>
                        <DataTable.Title>Fim</DataTable.Title>
                        <DataTable.Title>Lâmpada</DataTable.Title>
                        <DataTable.Title>Remover</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>13:00</DataTable.Cell>
                        <DataTable.Cell>14:00</DataTable.Cell>
                        <DataTable.Cell>1</DataTable.Cell>
                        <DataTable.Cell>
                            <IconButton
                                icon={({ size, color }) => (
                                    <Image
                                        source={require('../assets/timerRemove.svg')}
                                        style={{ width: size, height: size, tintColor: color }}
                                    />
                                )}
                                size={20}
                                onPress={() => console.log('Pressed')}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row >
                        <DataTable.Cell>11:00</DataTable.Cell>
                        <DataTable.Cell>12:00</DataTable.Cell>
                        <DataTable.Cell>2</DataTable.Cell>
                        <DataTable.Cell>
                            <IconButton
                                icon={({ size, color }) => (
                                    <Image
                                        source={require('../assets/timerRemove.svg')}
                                        style={{ width: size, height: size, tintColor: color }}
                                    />
                                )}
                                size={20}
                                onPress={() => console.log('Pressed')}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </CardComponent>

            <CardComponent>
                <Text style={styles.cardTitle}>Definir Novo Período</Text>
                <TimePicker/>
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
export default DeactivationScreen;