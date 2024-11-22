'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { TextField } from './components/ui/text-field'
import { Button } from './components/ui/button'
import { Skeleton } from './components/ui/skeleton'
import { Paginations } from './components/ui/pagination'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from './components/ui/drawer'
import { Card, Resistance, Weakness } from './types'

const ITEMS_PER_PAGE = 10

function App() {
    const [search, setSearch] = useState<string>('')
    const [cards, setCards] = useState<
        {
            id: string
            name: string
            images: { large: string }
            attacks?: {
                name: string
                damage: string
                text: string
                cost: string[]
            }[]
        }[]
    >([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
    const [detailedCard, setDetailedCard] = useState<{
        id: string
        name: string
        images: { large: string }
        attacks?: {
            name: string
            damage: string
            text: string
            cost: string[]
        }[]
        hp?: string
        types?: string[]
        weaknesses?: Weakness[]
        resistances?: Resistance[]
        retreatCost?: string[]
        evolvesTo?: string[]
        artist?: string
        flavorText?: string
        cardmarket?: { prices?: { averageSellPrice?: number } }
    } | null>(null)
    const [drawerLoading, setDrawerLoading] = useState<boolean>(false)
    const [totalCards, setTotalCards] = useState<number>(0)
    const [searched, setSearched] = useState<boolean>(false)

    const fetchPokemonCards = useCallback(
        async (page: number = 1) => {
            if (!search.trim()) {
                setSearched(false)
                return
            }

            setLoading(true)
            try {
                const response = await fetch(
                    `https://api.pokemontcg.io/v2/cards?q=name:${search}&pageSize=${ITEMS_PER_PAGE}&page=${page}`
                )
                const data = await response.json()

                setCards(data.data || [])
                setSearched(true)
                setTotalCards(data.totalCount || 0)
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des cartes Pokémon:',
                    error
                )
            } finally {
                setLoading(false)
            }
        },
        [search]
    )

    const fetchCardDetails = useCallback(async (id: string) => {
        setDrawerLoading(true)
        try {
            const response = await fetch(
                `https://api.pokemontcg.io/v2/cards/${id}`
            )
            const data = await response.json()
            setDetailedCard(data.data)
            console.log(data.data)
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des détails de la carte:',
                error
            )
        } finally {
            setDrawerLoading(false)
        }
    }, [])

    const handlePageChange = useCallback(
        (page: number) => {
            fetchPokemonCards(page)
        },
        [fetchPokemonCards]
    )

    useEffect(() => {
        if (selectedCardId) {
            fetchCardDetails(selectedCardId)
        }
    }, [selectedCardId, fetchCardDetails])

    const totalPages = useMemo(
        () => Math.ceil(totalCards / ITEMS_PER_PAGE),
        [totalCards]
    )

    return (
        <div className="w-full justify-center p-6 font-sans">
            <h1 className="text-3xl font-bold text-center mb-6">Pokémon TCG</h1>
            <div className="flex items-end justify-center mb-6 space-x-4">
                <TextField
                    inputSize={'sm'}
                    placeholder="Rechercher un Pokémon"
                    value={search}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(event.target.value)
                    }
                />
                <Button size={'sm'} onClick={() => fetchPokemonCards(1)}>
                    Chercher
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {loading ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <Skeleton key={index} className="w-full h-96" />
                    ))
                ) : cards.length > 0 ? (
                    cards.map((card: Card) => (
                        <div
                            key={card.id}
                            onClick={() => setSelectedCardId(card.id)}
                            className="relative w-full h-[400px] transform-style-3d duration-700 cursor-pointer"
                        >
                            <div className="face-front">
                                <img
                                    src={card.images.large}
                                    alt={card.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="face-back rounded-lg h-full">
                                <img
                                    src="/img/pokemon_back_card.png"
                                    alt="pokemon_back_card"
                                    className="h-full"
                                />
                            </div>
                        </div>
                    ))
                ) : searched ? (
                    <p className="text-center text-gray-500">
                        il n’y a pas de résultat
                    </p>
                ) : null}
            </div>
            {totalCards > ITEMS_PER_PAGE && (
                <div className="flex justify-center mt-6">
                    <Paginations
                        totalPages={totalPages}
                        onChange={handlePageChange}
                        nextText="Suivant"
                        previousText="Précédent"
                    />
                </div>
            )}
            {selectedCardId && (
                <Drawer
                    open={!!selectedCardId}
                    onOpenChange={() => setSelectedCardId(null)}
                >
                    <DrawerContent className="w-full flex flex-col items-center p-6">
                        <DrawerHeader>
                            {drawerLoading ? (
                                <Skeleton className="h-8 w-40" />
                            ) : (
                                <>
                                    <DrawerTitle className="text-xl text-center font-bold">
                                        {detailedCard?.name ||
                                            'Détails de la carte'}
                                    </DrawerTitle>
                                    <DrawerDescription className=" text-center text-sm text-gray-500">
                                        {detailedCard?.flavorText ||
                                            'Pas de description disponible.'}
                                    </DrawerDescription>
                                </>
                            )}
                        </DrawerHeader>
                        <div className="p-4 w-full max-w-md flex flex-col md:flex-row gap-4">
                            {drawerLoading ? (
                                <Skeleton className="h-96 w-full" />
                            ) : (
                                <>
                                    <img
                                        src={detailedCard?.images.large}
                                        alt={detailedCard?.name}
                                        className="w-full h-72 object-contain rounded-md mb-4"
                                    />
                                    <div className="space-y-2 w-full">
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Points de vie (HP):
                                            </span>{' '}
                                            {detailedCard?.attacks?.map(
                                                (attacks: {
                                                    name: string
                                                    damage: string
                                                    text: string
                                                }) => (
                                                    <p key={attacks.name}>
                                                        {attacks.name} :{' '}
                                                        <span className="font-bold">
                                                            {attacks.damage}
                                                        </span>{' '}
                                                        - {attacks.text}
                                                    </p>
                                                )
                                            ) || 'Non spécifié'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Points de vie (HP):
                                            </span>{' '}
                                            {detailedCard?.hp || 'Non spécifié'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Type(s):
                                            </span>{' '}
                                            {detailedCard?.types?.join(', ') ||
                                                'Non spécifié'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Faiblesses:
                                            </span>{' '}
                                            {detailedCard?.weaknesses
                                                ?.map(
                                                    (w: Weakness) =>
                                                        `${w.type} (${w.value})`
                                                )
                                                .join(', ') || 'Aucune'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Résistances:
                                            </span>{' '}
                                            {detailedCard?.resistances
                                                ?.map(
                                                    (r: Resistance) =>
                                                        `${r.type} (${r.value})`
                                                )
                                                .join(', ') || 'Aucune'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Coût de retraite:
                                            </span>{' '}
                                            {detailedCard?.retreatCost?.join(
                                                ', '
                                            ) || 'Non spécifié'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Évolue vers:
                                            </span>{' '}
                                            {detailedCard?.evolvesTo?.join(
                                                ', '
                                            ) || 'Non spécifié'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Artiste:
                                            </span>{' '}
                                            {detailedCard?.artist ||
                                                'Non spécifié'}
                                        </p>
                                        <div className="text-sm space-y-1">
                                            <p>
                                                <span className="font-bold">
                                                    Prix moyen :
                                                </span>{' '}
                                                {detailedCard?.cardmarket
                                                    ?.prices?.averageSellPrice
                                                    ? `${detailedCard.cardmarket.prices.averageSellPrice} €`
                                                    : 'Non spécifié'}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <DrawerFooter className="w-full flex justify-end">
                            <DrawerClose asChild>
                                <Button variant="outline">Fermer</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </div>
    )
}

export default App
