import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import Slider, {SliderProps} from '@react-native-community/slider';
import {getBrightness, setBrightness} from "../api/Routes";
import CardComponent from "./CardComponent";
import Image from 'react-native-remote-svg';
import {Button} from 'react-native-paper';

const BrightnessLevelScreen = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);

    useEffect(() => {
        getBrightness().then(result => {
            console.log("resultBrightness", result)
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
            <CardComponent>
                <Text style={styles.cardTitle}>Brilho</Text>
                <Text style={styles.text}>{maxValue}% da luminosidade lâmpada</Text>
                <Slider
                    style={styles.sliderSize}
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
            </CardComponent>

            <CardComponent>
                <Text style={styles.cardTitle}>O quão escuro o ambiente precisa estar para ligar a lâmpada</Text>
                <Text style={styles.text}>{minValue}% Escuro</Text>
                <Slider
                    style={styles.sliderSize}
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
            </CardComponent>


            <View style={styles.button}>
                <Button
                    style={styles.buttonColor}
                    mode='contained'
                    icon={({ size, color }) => (
                        <Image
                            source={require('../assets/save.svg')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    )}
                    onPress={() => save()}
                >
                    Salvar
                </Button>
                <View style={{ marginLeft: 5 }}>
                    <Button
                        style={styles.buttonColor}
                        mode='contained'
                        icon={({ size, color }) => (
                            <Image
                                source={require('../assets/broom.svg')}
                                style={{ width: size, height: size, tintColor: color }}
                            />
                        )}
                        onPress={() => resetSliders()}
                    >
                        Limpar
                    </Button>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    button: {
        marginTop: 10,
        marginLeft: 12,
        flexDirection: 'row',
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#ff7f50',
    },
    sliderSize: {
        width: 200,
        height: 40
    },
    buttonColor: {
        backgroundColor: '#ff7f50'
    },
    text: {
        color: '#5b5b5b'
    }
});
export default BrightnessLevelScreen;