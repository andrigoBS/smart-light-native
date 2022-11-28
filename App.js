import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeactivationScreen from "./components/DeactivationScreen";
import InitialScreen from "./components/InitialScreen";
import BrightnessLevelScreen from "./components/BrightnessLevelScreen";
import ActivationScreen from "./components/ActivationScreen";

const Stack = createNativeStackNavigator();
const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255,127,80)',
        text: 'rgb(255,255,255)',
    },
};


export default function App() {
  return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator >
          <Stack.Screen
              name='Início'
              component={InitialScreen}
          />
          <Stack.Screen
            name='Ativação'
            component={ActivationScreen}
          />
          <Stack.Screen
              name='Desativação'
              component={DeactivationScreen}
          />
          <Stack.Screen
              name='Nível de Luminosidade'
              component={BrightnessLevelScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
