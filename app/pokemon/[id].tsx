import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Pokemon() {
    const { id } = useLocalSearchParams();  // Extraction directe de l'ID
    return (
        <View style={styles.container}>
            {/* Vérification si l'ID est défini */}
            <Text>{id ? `Pokemon ID: ${id}` : "Aucun Pokémon trouvé"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
});

export default Pokemon;
