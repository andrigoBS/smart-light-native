import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import Slider, {SliderProps} from '@react-native-community/slider';
import {getBrightness, setBrightness} from "../Routes";

export default function BrightnessLevelScreen() {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);

    useEffect(() => {
        getBrightness().then(result => {
            setMaxValue(result.maxBrightness);
            setMinValue(result.minBrightness);
        });
    }, []);

    const save = () => {
       let obj = {
           maxBrightness: maxValue,
           minBrightness: minValue
       }
        setBrightness(JSON.stringify(obj));
    }

    const resetSliders = () => {
        setMinValue(12);
        setMaxValue(100);
    }

    return (
        <View style={styles.container}>
            <View style={{marginBottom: 20}}>
                <Text style={styles.titleText}>Brilho</Text>
                <Text>{maxValue}% da luminosidade lâmpada</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={maxValue}
                    thumbTintColor='#ff7f50'
                    minimumTrackTintColor='#ff7f50'
                    maximumTrackTintColor='#000000'
                    onSlidingStart={setMaxValue}
                    onSlidingComplete={setMaxValue}
                />
            </View>

            <Text style={styles.titleText}>O quão escuro o ambiente precisa estar para ligar a lâmpada</Text>
            <Text>{minValue}% Escuro</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={minValue}
                thumbTintColor='#ff7f50'
                minimumTrackTintColor='#ff7f50'
                maximumTrackTintColor='#000000'
                onSlidingStart={setMinValue}
                onSlidingComplete={setMinValue}
            />
            <View style={styles.button}>
                <Button
                    color='#ff7f50'
                    title='Salvar'
                    onPress={() => save()}
                />
                <View style={{marginLeft: 5}}>
                    <Button
                        color='#ff7f50'
                        title='Limpar'
                        onPress={() => resetSliders()}
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
    }
});