import {StatusBar, StyleSheet, Switch, Text, View} from 'react-native';
import {Icon} from "@rneui/themed";
import {useCallback, useEffect, useState} from "react";
import {getLight, setAutoOn, setLight} from "../api/Routes";
import CardComponent from "./CardComponent";
import {TouchableRipple} from "react-native-paper";
import Image from 'react-native-remote-svg';

const InitialScreen = ({ navigation }) => {
    const [firstIconName, setFirstIconName] = useState('bulb-outline');
    const [isFirstLampEnabled, setIsFirstLampEnabled] = useState(false);
    const [isFirstLightOn, setIsFirstLightOn] = useState(false);

    const [secondIconName, setSecondIconName] = useState('bulb-outline');
    const [isSecondLampEnabled, setIsSecondLampEnabled] = useState(false);
    const [isSecondLightOn, setIsSecondLightOn] = useState(false);

    useEffect(() => {
        getLight().then(result => {
           updateFirstStateOfLight(result.lights[0].lightOn);
           setIsFirstLampEnabled(result.lights[0].autoOn);

           updateSecondStateOfLight(result.lights[1].lightOn);
           setIsSecondLampEnabled(result.lights[1].autoOn);
        });
    }, []);

    const setFirstLightState = (value) => {
        let obj = {
            lightOn: value,
            lightIndex: 0
        }
        setLight(JSON.stringify(obj));
    };

    const updateFirstStateOfLight = (lightOn) => {
        if(lightOn){
            setFirstIconName('bulb-outline');
            setIsFirstLightOn(false);
            setFirstLightState(false);
        }else{
            setFirstIconName('bulb');
            setIsFirstLightOn(true);
            setFirstLightState(true);
        }
    };

    const onChangeFirstSwitchAutoOnMode = (value) => {
        setIsFirstLampEnabled(value);
        let obj = {
            autoOn: value,
            lightIndex: 0
        }
        setAutoOn(JSON.stringify(obj));
    };

    const setSecondLightState = (value) => {
        let obj = {
            lightOn: value,
            lightIndex: 1
        }
        setLight(JSON.stringify(obj));
    };

    const updateSecondStateOfLight = (lightOn) => {
        if(lightOn){
            setSecondIconName('bulb-outline');
            setIsSecondLightOn(false);
            setSecondLightState(false);
        }else{
            setSecondIconName('bulb');
            setIsSecondLightOn(true);
            setSecondLightState(true);
        }
    };

    const onChangeSecondSwitchAutoOnMode = (value) => {
        setIsSecondLampEnabled(value);
        let obj = {
            autoOn: value,
            lightIndex: 1
        }
        setAutoOn(JSON.stringify(obj));
    };

    return (
        <View style={styles.container}>
            <CardComponent>
                <Text style={styles.cardTitle}>
                    Controle das lâmpadas
                </Text>

                <View style={styles.direction}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textLamp}>
                            Lâmpada 1
                        </Text>
                        <Icon
                            raised
                            disabled={isFirstLampEnabled}
                            name={firstIconName}
                            type='ionicon'
                            color={'#ff7f50'}
                            size={40}
                            onPress={() => updateFirstStateOfLight(isFirstLightOn)}
                        />

                        <Text style={styles.textColor}>
                            Modo automático
                        </Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#ff7f50" }}
                            thumbColor={ isFirstLampEnabled ? "#ffa280" : "#f4f3f4" }
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={onChangeFirstSwitchAutoOnMode}
                            value={isFirstLampEnabled}
                        />
                    </View>

                    <View style={styles.lamp}>
                        <Text style={styles.textLamp}>Lâmpada 2</Text>
                        <Icon
                            raised
                            disabled={isSecondLampEnabled}
                            name={secondIconName}
                            type='ionicon'
                            color={'#ff7f50'}
                            size={40}
                            onPress={() => updateSecondStateOfLight(isSecondLightOn)}
                        />
                        <Text style={styles.textColor}>
                            Modo automático
                        </Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#ff7f50" }}
                            thumbColor={ isSecondLampEnabled ? "#ffa280" : "#f4f3f4" }
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={onChangeSecondSwitchAutoOnMode}
                            value={isSecondLampEnabled}
                        />
                    </View>
                </View>
            </CardComponent>

            <CardComponent>
                <Text style={styles.cardTitle}>
                    Configurações
                </Text>

                <TouchableRipple onPress={() => navigation.navigate('Desativação')}>
                    <View style={styles.direction}>
                        <Image
                            source={require('../assets/lightSleep.svg')}
                            style={styles.iconsSize}
                        />
                        <Text style={styles.text}>
                            Período de Desativação
                        </Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => navigation.navigate('Ativação')}>
                    <View style={styles.iconsLabel}>
                        <Image
                            source={require('../assets/lightOn.svg')}
                            style={styles.iconsSize}
                        />
                        <Text style={styles.text}>
                            Período de Ativação
                        </Text>
                    </View>
                </TouchableRipple>


                <TouchableRipple onPress={() => navigation.navigate('Nível de Luminosidade')}>
                    <View style={styles.iconsLabel}>
                        <Image
                            source={require('../assets/lightBrigthness.svg')}
                            style={styles.iconsSize}
                        />
                        <Text style={styles.text}>
                            Nível de Luminosidade
                        </Text>
                    </View>
                </TouchableRipple>
            </CardComponent>

            <StatusBar backgroundColor="#ff7f50"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    direction: {
        flexDirection: 'row',
    },
    switch: {
        marginLeft: 0,
        marginRight: 'auto'
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#ff7f50',
    },
    textLamp: {
        marginTop: 15,
        textAlign: 'center',
        color: '#5b5b5b'
    },
    lamp: {
        alignItems: 'center',
        marginLeft: 40
    },
    iconsSize: {
        width: 22,
        height: 22
    },
    text: {
        marginLeft: 5,
        color: '#5b5b5b'
    },
    iconsLabel: {
        flexDirection: 'row',
        marginTop: 5
    },
    textColor: {
        marginTop: 15,
        color: '#5b5b5b'
    }
});
export default InitialScreen;