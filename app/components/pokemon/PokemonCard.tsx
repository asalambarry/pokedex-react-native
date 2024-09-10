import { useThemeColors } from '@/app/hooks/useThemeColor';
import React from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../Card';
import { ThemedText } from '../ThemedText';

type Props = {
    style?: ViewStyle | ViewStyle[], // Accepter également un tableau de styles
    id: number,
    name: string,
};

const PokemonCard = ({ style, id, name }: Props) => {
    const colors = useThemeColors();
    return (
        <Card style={[styles.card, style]}>
            <ThemedText style={styles.shadowText} variant='caption' color='grayMedium'>
                #{id.toString().padStart(3, '0')}
            </ThemedText>
            <Image
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
                style={styles.image}
                accessibilityLabel={`Image of Pokémon ${name}`} // Ajout de l'accessibilité
            />
            <ThemedText style={styles.shadowText} variant='caption' color='grayDark'>
                {name}
            </ThemedText>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center', // Centrer les éléments dans la carte
        justifyContent: 'center',
        padding: 8, // Ajout de padding pour l'espacement
        backgroundColor: 'white', // Pour mieux voir l'ombre
        borderRadius: 10, // Ajout de coins arrondis
        shadowColor: 'grayDark', // Couleur de l'ombre
        shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
        shadowOpacity: 0.3, // Opacité de l'ombre
        shadowRadius: 4, // Rayon de l'ombre (flou)
        elevation: 5, // Ombre pour Android
    },
    image: {
        width: 96,
        height: 96,
        marginVertical: 8, // Espacement autour de l'image
        shadowColor: 'grayDark', // Ombre pour l'image
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    shadowText: {
        shadowColor: 'grayDark', // Couleur de l'ombre pour le texte
        shadowOffset: { width: 0, height: 1 }, // Décalage vertical léger
        shadowOpacity: 0.2, // Opacité de l'ombre
        shadowRadius: 1, // Rayon de l'ombre (flou léger)
    },
});

export default PokemonCard;
