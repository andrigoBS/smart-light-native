import {StyleSheet, Text, View} from 'react-native';
import {DataTable, IconButton} from "react-native-paper";

import Image from 'react-native-remote-svg'
import {useEffect, useState} from "react";
import {deleteOffTime, deleteOnTime, getOffTime, getOnTime} from "../api/Routes";
import DataTableCell from "react-native-paper/src/components/DataTable/DataTableCell";

const TableComponent = ({typeOfPeriod}) => {
    const [data, setData] = useState(null);

    const removeItem = (lightIndex, index) => {
        let obj = {
            lightIndex: lightIndex,
            timeIndex: index
        }

        if(typeOfPeriod === "off"){
            deleteOffTime(JSON.stringify(obj)).then(r =>
                getOffTime().then(result => {
                    console.log("aaa delete", result)
                    setData(result);
                })
            );
        }else {
            deleteOnTime(JSON.stringify(obj)).then(r =>
                getOnTime().then(result => {
                    console.log("bbb delete", result)
                    setData(result);
                })
            );
        }
    }

    useEffect(() => {
        if(typeOfPeriod === "off"){
            getOffTime().then(result => {
                console.log("aaa", result)
                setData(result);
            });
        }else{
            getOnTime().then(result => {
                console.log("bbb", result)
                setData(result);
            });
        }
    }, []);

    const formattedHours = (hours) => {
        return hours < 10 ? `0${hours}` : hours;
    }

    const formattedMinutes = (minutes) => {
        return minutes < 10 ? `0${minutes}` : minutes;
    }
    const updateTable = () => {
        if(typeOfPeriod === "off"){
            getOffTime().then(result => {
                setData(result);
            });
        }else{
            getOnTime().then(result => {
                setData(result);
            });
        }
    }

    return (
        <DataTable style={styles.table}>
            <DataTable.Header>
                <DataTable.Title>Início</DataTable.Title>
                <DataTable.Title>Fim</DataTable.Title>
                <DataTable.Title>Lâmpada</DataTable.Title>
                <DataTable.Title>Remover</DataTable.Title>
                <DataTable.Title>
                    <IconButton
                        icon={({ size, color }) => (
                            <Image
                                source={require('../assets/reload.svg')}
                                style={{ width: size, height: size, tintColor: color }}
                            />
                        )}
                        size={15}
                        onPress={() => updateTable()}
                    />
                </DataTable.Title>
            </DataTable.Header>

            { data !== null && data.map((row, index) => (
                <DataTable.Row key={index}>
                    <DataTable.Cell>
                        {formattedHours(row.hoursStart)} : {formattedMinutes(row.minutesStart)}
                    </DataTable.Cell>

                    <DataTable.Cell>
                        {formattedHours(row.hoursEnd)} : {formattedMinutes(row.minutesEnd)}
                    </DataTable.Cell>

                    <DataTable.Cell>
                        {row.lightIndex === 0 ? 1 : 2}
                    </DataTable.Cell>

                    <DataTable.Cell>
                        <IconButton
                            icon={({ size, color }) => (
                                <Image
                                    source={require('../assets/timerRemove.svg')}
                                    style={{ width: size, height: size, tintColor: color }}
                                />
                            )}
                            size={20}
                            onPress={() => removeItem(row.lightIndex, index)}
                        />
                    </DataTable.Cell>
                    <DataTable.Cell>

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