import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeactivationScreen from "./components/DeactivationScreen";
import InitialScreen from "./components/InitialScreen";
import BrightnessLevelScreen from "./components/BrightnessLevelScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name='Início'
              component={InitialScreen}
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
