import {StyleSheet, Text, View} from 'react-native';
import {DataTable, IconButton} from "react-native-paper";

import Image from 'react-native-remote-svg'

const TableComponent = ({typeOfPeriod}) => {
    const data = [["13:00","23:00","2"],["13:05","00:00","1"]]

    const removeItem = (item) => {
        console.log("aaa", item)
    }
    return (
        <DataTable style={styles.table}>
            <DataTable.Header>
                <DataTable.Title>Início</DataTable.Title>
                <DataTable.Title>Fim</DataTable.Title>
                <DataTable.Title>Lâmpada</DataTable.Title>
                <DataTable.Title>Remover</DataTable.Title>
            </DataTable.Header>

            { data.map((row, index) => (
                <DataTable.Row key={index}>
                    {
                        row.map((item) => (
                            <DataTable.Cell>
                                {item}
                            </DataTable.Cell>
                        ))
                    }
                    <DataTable.Cell>
                        <IconButton
                            icon={({ size, color }) => (
                                <Image
                                    source={require('../assets/timerRemove.svg')}
                                    style={{ width: size, height: size, tintColor: color }}
                                />
                            )}
                            size={20}
                            onPress={() => removeItem(row)}
                        />
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
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
    },
    table: {
        borderWidth: 1,
        borderColor: '#ecebeb'
    }
});
export default TableComponent;