import { Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import colors from 'tailwindcss/colors'

const cyan = colors.cyan[500]
const blue = colors.blue[500]

export function Home () {
  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      <LinearGradient
        // Button Linear Gradient
        colors={[cyan, blue]}
        className="h-full w-full flex-1 justify-center items-center"
      >
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        className="rounded-md px-3 py-2"
      >
        <Text className="text-white">Sign in with Facebook</Text>
      </LinearGradient>
      <Text className="text-white">Bem vindo ao Patrimoville</Text>
      </LinearGradient>
    </View>
  )
}