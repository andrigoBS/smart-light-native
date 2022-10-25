import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useState} from "react";
import {setBrightness, setOffTime} from "../Routes";

export default function DeactivationScreen() {
    const [isBeginTimePickerVisible, setBeginTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [beginTime, setBeginTime] = useState(-1);
    const [endTime, setEndTime] = useState(-1);

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const showBeginTimePicker = () => {
        setBeginTimePickerVisibility(true);
    };

    const hideBeginTimePicker = () => {
        setBeginTimePickerVisibility(false);
    };

    const handleConfirmBegin = (date) => {
        console.warn("A time has been picked: ", date);
        setBeginTime(date);
        hideBeginTimePicker();
    };

    const handleConfirmEnd = (date) => {
        console.warn("A time end has been picked: ", date);
        setEndTime(date);
        hideEndTimePicker();
    };

    const save = () => {
        let obj = {
            offHoursStart: beginTime.getHours(),
            offMinutesStart: beginTime.getMinutes(),
            offHoursEnd: endTime.getHours(),
            offMinutesEnd: endTime.getMinutes()
        }
        setOffTime(JSON.stringify(obj));
    }

    const clear = () => {
        setBeginTime(-1);
        setEndTime(-1);

        let obj = {
            offHoursStart: beginTime,
            offMinutesStart: beginTime,
            offHoursEnd: endTime,
            offMinutesEnd: endTime
        }
        setOffTime(JSON.stringify(obj));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Horário Inicial</Text>
            <Text>{beginTime === -1 ? "Sem definição" : beginTime.getHours() + ":" + beginTime.getMinutes()}</Text>

            <Text style={styles.titleTextFinal}>Horário Final</Text>
            <Text>{endTime === -1 ? "Sem definição" : endTime.getHours() + ":" + endTime.getMinutes()}</Text>

            <View style={styles.button}>
                <Button
                    color='#ff7f50'
                    title='Horário inicio'
                    onPress={showBeginTimePicker}
                />
                <DateTimePickerModal
                    isVisible={isBeginTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmBegin}
                    onCancel={hideBeginTimePicker}
                />

                <View style={{marginLeft: 5}}>
                    <Button
                        color='#ff7f50'
                        title='Horário fim'
                        onPress={showEndTimePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isEndTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmEnd}
                        onCancel={hideEndTimePicker}
                    />
                </View>
            </View>

            <View style={styles.button}>
                <Button
                    color='#ff7f50'
                    title='Salvar'
                    disabled={beginTime === -1 || endTime === -1}
                    onPress={() => save() }
                />
                <View style={{marginLeft: 5}}>
                    <Button
                        color='#ff7f50'
                        title='Limpar'
                        onPress={() => clear() }
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        marginVertical: 20,
        marginHorizontal: 20
    },
    button: {
        marginVertical : 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    titleTextFinal: {
        fontSize: 15,
        marginBottom: 5,
        marginTop: 15,
        fontWeight: 'bold'
    }
});