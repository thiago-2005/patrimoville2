import Routes from "./src/Routes";

import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_800ExtraBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
export default function App() {
  const [FontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!FontsLoaded) {
    return null
  }

  return (
    <Routes />
  );
}
