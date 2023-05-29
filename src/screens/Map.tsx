import React, { useEffect, useState } from 'react';
import mapMarker from '../images/marker.png';
// import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { api } from '../services/api';

interface LandmarkItem {
  name: string;
  id: number;
  images_url: Array<string>
  latitude: number;
  longitude: number;
};
 
export function Map () {
  const [landmarks, setLandmarks] = useState<LandmarkItem[]>([]);
  const navigation: any = useNavigation();

  const getLandmarks = async () => {
    try {
      const response = await fetch('https://patrimoville.vercel.app/api/landmark')
      const data = await response.json()
      setLandmarks(data);
    } catch (error) {
      setLandmarks([]);
      console.error(error);
    }
  };

  useEffect(() => {
    getLandmarks();
  }, []);

  function handleNavigateToLandmarksDetails(id: number) {
    navigation.navigate('Detail', { id });
  }

  return (
    <View style={styles.container}>
      <ScrollView className='w-screen gap-3 p-2 mt-4'>
        {landmarks.map((landmark) => (
          <TouchableOpacity key={landmark.id} className="w-full mr-16 h-44 relative" onPress={() => handleNavigateToLandmarksDetails(landmark.id)}>
            <Text className="mt-1 text-lg font-semibold text-white absolute bottom-2 left-2 z-50 backdrop-brightness-125">{landmark.name}</Text>
            <Image source={{ uri: landmark.images_url[0] }} className='w-full h-full object-cover rounded-lg' />
          </TouchableOpacity>
        ))}
        <View className="h-20" />
      </ScrollView>

      <View style={styles.footer}> 
        <Text style={styles.footerText}>{landmarks.length} Locais encontrados</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
  },
  calloutContainer: {
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },
  createlandmarkButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});