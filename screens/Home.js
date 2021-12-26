import React, { useEffect, useState } from 'react'
import Search from '../components/home/Search'
import ProductCards from '../components/home/ProductCards';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useFonts, Inter_900Black, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
// import Constants from 'expo-constants';
// import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
export default function Home() {

    let [fontsLoaded] = useFonts({
        Inter_900Black,
        Inter_800ExtraBold
    });

    const [data, setData] = useState({})


    useEffect( async () => {
        const responce = await fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=apple`, {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
                "x-rapidapi-key": "c21f427b09msh296727ad4bf3af7p1dfe3djsned4f6f14e075"
            }
        })
        const results = await responce.json();
        setData(results);
    }, [])




if (!fontsLoaded) {
    return <AppLoading />;
}
else {
    return (
        <View style={styles.screen}>
            <Search />
            <ProductCards data={data}/>
        </View>
    )
}
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'space-between',
        // marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        // padding: 42
    },
    text: {
        fontSize: 60,
        fontFamily: 'Inter_800ExtraBold',
        color: 'white'
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});