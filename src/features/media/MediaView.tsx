"use client";

import {
    Box,
    SimpleGrid,
    VStack,
    Text,
    HStack,
    Heading,
    Button,
    Flex,
    IconButton
} from "@chakra-ui/react";
import { FiArrowLeft, FiSliders } from "react-icons/fi";

import { TutorialCard } from "./components/TutorialCard";
import { VideoPlayer } from "./components/VideoPlayer";
import { GravadorAudio } from "./components/GravadorAudio";
import { ListaAudios } from "./components/ListaAudios";

import { useMediaView } from "@/features/media/hooks/useMediaView";
import { Tutorial } from "@/types/types";

export function MediaView() {
    const { estados, acoes, configs } = useMediaView();

    // --- VISÃO 1: DETALHES (Vídeo Aberto) ---
    if (estados.selectProcess) {
        return (
            <Box bg="white" minH="calc(100vh - 70px)" w="full">
                {/* NAVBAR INTERNA DO VÍDEO */}
                <Flex
                    h="56px"
                    bg="gray.50"
                    px={{ base: 4, md: 8, "2xl": 12 }}
                    align="center"
                    gap={4}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    position="sticky"
                    top="0"
                    zIndex="110"
                >
                    <IconButton
                        aria-label="Voltar"
                        variant="ghost"
                        color="blue.900"
                        onClick={() => acoes.setProcess("")}
                        borderRadius="full"
                    >
                        <FiArrowLeft size="20px" />
                    </IconButton>

                    <Text color="black" fontWeight="bold" truncate fontSize="sm">
                        {estados.selectProcess}
                    </Text>
                </Flex>

                {/* CONTEÚDO FLUIDO DO VÍDEO */}
                <VStack p={{ base: 4, md: 8, "2xl": 12 }} gap={5} w="full" mt={2} align="stretch">

                    {/* CARROSSEL DE IDIOMAS ACIMA DO VÍDEO */}
                    <HStack
                        w="full"
                        overflowX="auto"
                        pb={1}
                        css={{
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": { display: "none" }
                        }}
                    >
                        {configs.idiomas.map((lang) => (
                            <Button
                                key={lang}
                                size="sm"
                                borderRadius="full"
                                flexShrink={0}
                                variant={estados.selectedLanguage === lang ? "solid" : "subtle"}
                                colorPalette={estados.selectedLanguage === lang ? "blue" : "gray"}
                                onClick={() => acoes.setLanguage(lang)}
                                px={4}
                                fontWeight="medium"
                            >
                                {lang}
                            </Button>
                        ))}
                    </HStack>

                    {/* No Desktop WQHD divide em duas colunas gigantes esticadas */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, md: 8 }} alignItems="start" w="full">
                        <Box w="full">
                            <VideoPlayer urlYoutube={estados.conteudoAtual?.youtubeUrl} />
                        </Box>

                        <Box w="full" bg="white" borderRadius="2xl" p={5} borderWidth="1px" borderColor="gray.200" shadow="sm">
                            <VStack align="stretch" gap={6}>
                                {estados.conteudoAtual && (
                                    <GravadorAudio
                                        tutorialId={estados.conteudoAtual.id}
                                        idioma={estados.selectedLanguage}
                                    />
                                )}
                                <Box maxH={{ base: "300px", md: "500px" }} overflowY="auto">
                                    <ListaAudios
                                        audios={estados.audiosComunidade}
                                        carregando={estados.carregandoAudios}
                                    />
                                </Box>
                            </VStack>
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Box>
        );
    }

    // --- VISÃO 2: GALERIA GERAL (Vídeos em Alta) ---
    return (
        <Box bg="white" minH="calc(100vh - 70px)" w="full" px={{ base: 4, md: 8, "2xl": 12 }} py={6}>
            <VStack align="start" gap={6} w="full">

                <Heading size="md" color="blue.900" fontWeight="black">
                    Vídeos em Alta - {estados.selectedLanguage || "Português"}
                </Heading>

                {/* Filtros de Idioma da Galeria */}
                <HStack
                    w="full"
                    overflowX="auto"
                    pb={2}
                    css={{
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" }
                    }}
                >
                    <IconButton aria-label="Filtros" variant="subtle" colorPalette="gray" borderRadius="md" size="sm" flexShrink={0}>
                        <FiSliders />
                    </IconButton>
                    <Button
                        size="sm"
                        borderRadius="md"
                        variant={!estados.selectedLanguage ? "solid" : "subtle"}
                        colorPalette={!estados.selectedLanguage ? "blue" : "gray"}
                        onClick={() => acoes.setLanguage("")}
                        _hover={{ bg: "gray.200" }}
                    >
                        Explorar
                    </Button>
                    {configs.idiomas.map((lang) => (
                        <Button
                            key={lang}
                            size="sm"
                            borderRadius="md"
                            flexShrink={0}
                            variant={estados.selectedLanguage === lang ? "solid" : "subtle"}
                            colorPalette={estados.selectedLanguage === lang ? "blue" : "gray"}
                            onClick={() => acoes.setLanguage(lang)}
                        >
                            {lang}
                        </Button>
                    ))}
                </HStack>

                {/* Grid Responsiva  */}
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4, "2xl": 5 }}
                    gap={{ base: 6, md: 8 }}
                    w="full"
                    pt={2}
                >
                    {estados.tutoriais.map((tut: Tutorial) => (
                        <TutorialCard
                            key={tut.id}
                            tutorial={tut}
                            onClick={() => acoes.setProcess(tut.pergunta)}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
}