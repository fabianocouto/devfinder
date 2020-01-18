import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [techs, setTechs] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });
                const { latitude, longitude } = coords;
                setCurrentPosition({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }
        loadInitialPosition();
    }, []);

    function handleRegionChange(region) {
        setCurrentPosition(region);
    }

    async function loadDevs(){
        const {latitude, longitude} = currentPosition;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs: techs,
            }
        });

        console.log(response);

        setDevs(response.data);
    }

    if (!currentPosition) {
        return null;
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChange} initialRegion={currentPosition} style={styles.mapView}>
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
                        <Image style={styles.mapAvatar} source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => {
                            navigation.navigate('Profile', {github_username: dev.github_username});
                        }}>
                            <View style={styles.devInfo}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar tecnologia"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.searchButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1
    },
    mapAvatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#7d40e7',
    },
    devInfo: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        color: '#7d40e7',
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,

    }
});

export default Main;