// 2eme version avec option de chargement infini des pokemons
import PokemonCard from "@/app/components/pokemon/PokemonCard";
import { ThemedText } from "@/app/components/ThemedText";
import { useThemeColors } from "@/app/hooks/useThemeColor";
import React from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteFetchQuery } from "./hooks/useFetchQuery";
type Pokemon = {
    name: string;
    url: string;
};

export default function Index() {
    const colors = useThemeColors();

    // Récupérer les données des Pokémon avec une requête infinie
    const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteFetchQuery("/pokemon?limit=21");

    // Combiner toutes les pages de résultats
    const pokemons: Pokemon[] = data?.pages?.flatMap(page => page.results) ?? [];

    // Extraire l'ID à partir de l'URL du Pokémon
    const getPokemonId = (url: string) => parseInt(url.split("/").filter(Boolean).pop() || "0");

    // Fonction pour rendre chaque carte de Pokémon
    const renderPokemonCard = ({ item } : {item: Pokemon}) => {
        const id = getPokemonId(item.url);
        return <PokemonCard style={styles.cardItem} id={id} name={item.name} />;
    };

    // Charger plus de Pokémon lorsque l'utilisateur atteint le bas
    const loadMorePokemons = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require("@/assets/images/pokeball.png")} style={styles.pokeballImage} />
                <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
            </View>

            <FlatList
                data={pokemons}
                renderItem={renderPokemonCard}
                keyExtractor={(item) => getPokemonId(item.url).toString()}
                numColumns={3}
                contentContainerStyle={styles.scrollContainer}
                columnWrapperStyle={styles.grid}
                onEndReached={loadMorePokemons}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color={colors.grayMedium} />
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        padding: 4,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        padding: 12,
        gap: 8,
    },
    pokeballImage: {
        width: 24,
        height: 24,
    },
    scrollContainer: {
        paddingHorizontal: 12,
    },
    grid: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardItem: {
        width: "30%",
        marginBottom: 12,
        alignItems: "center",
        justifyContent: "center",
        height: 150,
    },
    loading: {
        marginVertical: 20,
    },
});

// import { ThemedText } from "@/app/components/ThemedText";
// import { useThemeColors } from "@/app/hooks/useThemeColor";
// import React from "react";
// import { Image, ScrollView, StyleSheet, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import PokemonCard from "./components/pokemon/PokemonCard";
// import { useFetchQuery } from "./hooks/useFetchQuery";
// export default function Index() {
//     const colors = useThemeColors();
//     // const pokemons = Array.from({ length: 30 }, (_, k) => ({
//     //     name: "Pikachu",
//     //     id: k + 1,
//     // }));
//     const {data} = useFetchQuery('/pokemon?limit=21')
//     const pokemons = data?.results ?? []
//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <Image
//                     source={require("@/assets/images/pokeball.png")}
//                     style={{ width: 24, height: 24 }} // Correct way to set width and height
//                 />
//                 <ThemedText variant="headline" color="grayLight">
//                     Pokédex
//                 </ThemedText>
//             </View>

//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.grid}>
//                     {pokemons.map((item) => (
//                         <PokemonCard
//                             style={styles.cardItem}
//                             key={item.id}
//                             id={item.id} // Ajout de l'ID manquant
//                             name={item.name}
//                         />
//                     ))}
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "red", // Couleur de fond rouge
//         padding: 4,
//     },
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 16,
//         padding: 12,
//         gap: 8,
//     },
//     scrollContainer: {
//         paddingHorizontal: 12,
//     },
//     grid: {
//         flexDirection: "row",
//         flexWrap: "wrap", // Permet d'avoir plusieurs colonnes et de passer à la ligne
//         justifyContent: "space-between", // Espacement uniforme entre les éléments
//     },
//     cardItem: {
//         width: "30%", // Largeur fixe des éléments de la grille
//         marginBottom: 12,
//         alignItems: "center", // Centre le contenu dans chaque carte
//         justifyContent: "center",
//         height: 150, // Hauteur ajustée pour permettre une bonne visibilité
//     },
// });
// function getPokemonId(url: any) {
//     throw new Error("Function not implemented.");
// }
