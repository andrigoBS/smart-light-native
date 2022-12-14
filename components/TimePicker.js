import {StyleSheet, Text, View} from 'react-native';
import {Button, RadioButton, TouchableRipple} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useState} from "react";
import {setOffTime, setOnTime} from "../api/Routes";
import Image from 'react-native-remote-svg';

const TimePicker = ({typeOfPeriod}) => {
    const [isBeginTimePickerVisible, setBeginTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [lampValue, setLampValue] = useState("0");
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
        setBeginTime(date);
        hideBeginTimePicker();
    };

    const handleConfirmEnd = (date) => {
        setEndTime(date);
        hideEndTimePicker();
    };

    const save = () => {
        if(typeOfPeriod === "off"){
            let obj = {
                offHoursStart: beginTime.getHours(),
                offMinutesStart: beginTime.getMinutes(),
                offHoursEnd: endTime.getHours(),
                offMinutesEnd: endTime.getMinutes(),
                lightIndex: parseInt(lampValue)
            }
            setOffTime(JSON.stringify(obj));
        }else{
            let obj = {
                onHoursStart: beginTime.getHours(),
                onMinutesStart: beginTime.getMinutes(),
                onHoursEnd: endTime.getHours(),
                onMinutesEnd: endTime.getMinutes(),
                lightIndex: parseInt(lampValue)
            }
            setOnTime(JSON.stringify(obj));
        }
        clear();
    }

    const clear = () => {
        setBeginTime(-1);
        setEndTime(-1);
        setLampValue("0");
    }

    const isPeriodIncomplete = () => {
        return beginTime === -1 || endTime === -1;
    }

    const isBeginTimeIncomplete = () => {
      return beginTime === -1;
    }

    const isEndTimeIncomplete = () => {
        return endTime === -1;
    }

    const getEndHourFormatted = () => {
        return formattedHours(endTime.getHours()) + ":" + formattedMinutes(endTime.getMinutes());
    }
    const getBeginHourFormatted = () => {
        return formattedHours(beginTime.getHours()) + ":" + formattedMinutes(beginTime.getMinutes());
    }

    const formattedHours = (hours) => {
        return hours < 10 ? `0${hours}` : hours;
    }

    const formattedMinutes = (minutes) => {
        return minutes < 10 ? `0${minutes}` : minutes;
    }

    return (
        <View style={{ margin: 5 }}>
            <TouchableRipple onPress={showBeginTimePicker}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../assets/timerPlay.svg')}
                            style={styles.timerIcon}
                        />
                        <DateTimePickerModal
                            isVisible={isBeginTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmBegin}
                            onCancel={hideBeginTimePicker}
                        />

                        <Text style={styles.titleText}>
                            Hor??rio Inicial
                        </Text>
                    </View>

                    <Text style={styles.timeText}>
                        { isBeginTimeIncomplete() ? "Sem defini????o" : getBeginHourFormatted() }
                    </Text>
                </View>
            </TouchableRipple>

            <TouchableRipple onPress={showEndTimePicker}>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Image
                            source={require('../assets/timerStop.svg')}
                            style={styles.timerIcon}
                        />
                        <DateTimePickerModal
                            isVisible={isEndTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmEnd}
                            onCancel={hideEndTimePicker}
                        />

                        <Text style={styles.titleText}>
                            Hor??rio Final
                        </Text>
                    </View>

                    <Text style={styles.timeText}>
                        { isEndTimeIncomplete() ? "Sem defini????o" : getEndHourFormatted() }
                    </Text>


                </View>
            </TouchableRipple>
            <View style={{ marginTop: 10, marginLeft: 5}}>
                <Text style={styles.titleText}>
                    L??mpada
                </Text>
                <RadioButton.Group onValueChange={newValue => setLampValue(newValue)} value={lampValue}>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton color='#ff7f50' value={"0"} />
                        <Text>1</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton color='#ff7f50' value={"1"}/>
                        <Text>2</Text>
                    </View>
                </RadioButton.Group>
            </View>

            <View style={styles.button}>
                <Button
                    style={{  backgroundColor: isPeriodIncomplete() ? '#dedede' : '#ff7f50' }}
                    mode='contained'
                    icon={({ size, color }) => (
                        <Image
                            source={require('../assets/save.svg')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    )}
                    disabled={ isPeriodIncomplete() }
                    onPress={() => save() }
                >
                    Salvar
                </Button>

                <Button
                    style={styles.clear}
                    mode='contained'
                    icon={({ size, color }) => (
                        <Image
                            source={require('../assets/broom.svg')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    )}
                    onPress={() => clear() }
                >
                    Limpar
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop : 15,
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#595959'
    },
    timerIcon: {
        width: 22,
        height: 22,
        marginRight: 5
    },
    timeText: {
        marginLeft: 27,
        color: '#5b5b5b'
    },
    clear: {
        backgroundColor: '#ff7f50',
        marginLeft: 5
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default TimePicker;