import React, { useEffect, useState } from 'react';
import mapMarker from '../images/Vector.png';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
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

  useFocusEffect(() => {
    api.get('/landmark').then((response) => {
      setLandmarks(response.data);
    });
  });

  function handleNavigateToLandmarksDetails(id: number) {
    navigation.navigate('Detail', { id });
  }

  return (
    <View style={styles.container}>
      <MapView 
        className='h-full w-full'
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -26.3055339,
          longitude: -48.850644,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
      > 
        {landmarks.map((landmark) => {
          return (
            <Marker
              key={landmark.id}
              icon={mapMarker}
              coordinate={{
                latitude: Number(landmark.latitude),
                longitude: Number(landmark.longitude),
              }}

              calloutAnchor={{
                x: 0,
                y: 0,
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToLandmarksDetails(landmark.id)}>
                  <Text className='rounded-lg bg-cyan-400 px-2 py-1 text-lg text-white flex-1'>{landmark.name}</Text>
              </Callout>
            </Marker>
            )
        })}
      </MapView>
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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