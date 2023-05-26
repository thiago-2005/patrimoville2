import React, { useEffect, useState } from 'react'
import { Image, View, ScrollView, Text, StyleSheet, Linking, Dimensions, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import mapMarkerImg from '../images/marker.png'
import { api } from '../services/api'

interface LandmarkDetails {
  id: number
}

interface Landmark {
  id: number
  name: string
  history: string
  latitude: number
  longitude: number
  images_url: Array<string>
};

export function Detail () {
  const route = useRoute();
  const [landmark, setlandmark] = useState<Landmark>()
  
  const params = route.params as LandmarkDetails;

  useEffect(() => {
    api.get(`landmark/${params.id}`).then((response) => {
      setlandmark(response.data);
    });
  }, [params.id]);

  if (!landmark) {
    return (
      <View className='w-full h-full flex-1 justify-center items-center'>
        <Text className='text-lg text-cyan-600'>Carregando...</Text>
      </View>
    )
  }

  function handleOpenGoogleMapRoutes() {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${landmark?.latitude},${landmark?.longitude}`)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {landmark.images_url.map((url) => {
            return (
              <Image 
                key={url}
                style={styles.image}
                source={{ uri: url }}
              />
            )
          })}
          <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
          <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
          <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{landmark.name}</Text>
        <Text style={styles.description}>{landmark.history}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: landmark.latitude,
              longitude: landmark.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: landmark.latitude,
                longitude: landmark.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity onPress={handleOpenGoogleMapRoutes} style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },
  scheduleTextRed: {
    color: '#FF669D'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})