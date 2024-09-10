import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function About() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the about page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Couleur de fond blanche
    },
    text: {
        fontSize: 18, // Taille du texte
        color: 'black', // Couleur du texte
    },
});

export default About;
