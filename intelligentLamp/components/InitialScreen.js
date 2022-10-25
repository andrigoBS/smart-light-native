import {Alert, Button, Image, StatusBar, StyleSheet, Switch, Text, View} from 'react-native';
import {Icon} from "@rneui/themed";
import {useCallback, useEffect, useState} from "react";
import {getLight, setAutoOn, setLight} from "../Routes";

export default function InitialScreen({ navigation }) {
    const [iconName, setIconName] = useState('bulb-outline');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);

    useEffect(() => {
        getLight().then(result => {
           updateStateOfLight(result.lightOn);
           setIsEnabled(result.autoOn);
        });
    }, []);

    const setLightState = (value) => {
        let obj = {
            lightOn: value
        }
        setLight(JSON.stringify(obj));
    }

    const updateStateOfLight = (lightOn) => {
        if(lightOn){
            setIconName('bulb-outline');
            setIsLightOn(false);
            setLightState(false);
        }else{
            setIconName('bulb');
            setIsLightOn(true);
            setLightState(true);
        }
    }

    const onChangeSwitchAutoOnMode = (value) => {
        setIsEnabled(value);
        let obj = {
            autoOn: value
        }
        setAutoOn(JSON.stringify(obj));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Olá, seja bem vindo!</Text>
            <Icon
                raised
                // disabled={isEnabled}
                name={iconName}
                type='ionicon'
                color='#ff7f50'
                size={40}
                onPress={() => updateStateOfLight(isLightOn)} />

            <Text style={{ marginTop: 15 }}>Modo automático</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#ff7f50" }}
                thumbColor={ isEnabled ? "#ffa280" : "#f4f3f4" }
                ios_backgroundColor="#3e3e3e"
                onValueChange={onChangeSwitchAutoOnMode}
                // disabled={IsLightOn}
                value={isEnabled}
            />
            <Text style={styles.subtitleText}>Configurações</Text>
            <View style={styles.button}>
                <Button
                    color={'#ff7f50'}
                    title='Período de desativação'
                    onPress={() => navigation.navigate('Desativação')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    color={'#ff7f50'}
                    title='Nível de luminosidade'
                    onPress={() => navigation.navigate('Nível de Luminosidade')}
                />
            </View>
            <StatusBar backgroundColor="#ff7f50"/>
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
        marginVertical : 5
    },
    titleText: {
        fontSize: 20,
        marginBottom: 20
    },
    subtitleText: {
        fontSize: 17,
        marginVertical : 5,
        marginTop : 20,
        fontWeight: 'bold'
    }
});