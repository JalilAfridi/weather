
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import Searchbar from '../components/search';
import Image from 'react-native-image-progress';
import getWeatherData from '../utils/api';


const Home = () => {
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchDataHandler = useCallback(() => {
        getWeatherData(input, setInput, setLoading, setData);
    });

    return (
        <View style={styles.root}>
            <ImageBackground
                source={require('../assets/bg.jpeg')}
                resizeMode="cover"
                style={styles.bgimage}>
                    <Searchbar
                        value={input}
                        updateSearch={setInput}
                        onSubmitEditing={fetchDataHandler}
                        style={{ marginTop: '1%' }}
                    />


                <ScrollView style={styles.infoView}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={fetchDataHandler}
                        />
                    }
                >

                    {(data).map((listItem, index) => (
                        <View key={index} style={{ justifyContent: 'flex-start', paddingVertical: 2 }}>
                            <View style={{ backgroundColor: "gray", padding: 5, width: "100%", margin: 5, borderRadius: 5 }}>
                                <Text>{moment(listItem?.dt_txt).format('dddd, MMM Do')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View>
                                    <Text style={styles.main}>{listItem?.weather[0]?.main}</Text>
                                    <Text style={styles.description}>{listItem?.weather[0]?.description}</Text>
                                </View>
                                {/* This image shows the icon with progress indicator */}
                                <Image
                                    source={{ uri: `http://openweathermap.org/img/w/${listItem?.weather[0]?.icon}.png` }}
                                    indicatorProps={{
                                        size: 70,
                                        borderWidth: 0,
                                        color: 'rgba(150, 150, 150, 1)',
                                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                    }}
                                    style={styles.icon} />
                            </View>

                        </View>
                    ))}
                </ScrollView>

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    icon: {
        width: 70,
        height: 70,
    },
    bgimage: {
        flex: 1,
        flexDirection: 'column',
    },

    textInput: {
        borderBottomWidth: 2,
        padding: 5,
        paddingVertical: 5,
        marginHorizontal: 5,
        backgroundColor: '#gray',
        fontSize: 19,
        fontWeight: '300',
        borderRadius: 5,
        borderBottomColor: 'orange',
    },

    main: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold',
    },

    infoView: {
        marginHorizontal: 10
    },

    dateText: {
        color: '#fff',
        fontSize: 22,
        marginVertical: 10,
    },
    description: {
        fontSize: 15,
        color: '#fff',
        marginLeft: 20,
        fontWeight: 'bold',

    }
});

export default Home;