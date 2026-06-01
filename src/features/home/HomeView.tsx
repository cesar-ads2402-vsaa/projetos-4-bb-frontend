"use client";

import { useState } from "react";
import {
    Box, VStack, Heading, Text, SimpleGrid, Icon, Flex, Button, HStack, Circle, Center, IconButton
} from "@chakra-ui/react";
import {
    FiLock, FiCreditCard, FiSmartphone, FiDollarSign, FiArrowRight, FiHelpCircle, FiGrid, FiSliders
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { TutorialCard } from "@/features/media/components/TutorialCard";
import { useMediaView } from "@/features/media/hooks/useMediaView";
import Link from "next/link";

export function HomeView() {
    const router = useRouter();
    const { estados, acoes, configs } = useMediaView();
    const [filtroAtivo, setFiltroAtivo] = useState<string | null>(null);

    const handleVideoClick = (tutorialPergunta: string) => {
        acoes.setProcess(tutorialPergunta);
        router.push("/media");
    };

    const categoriasBase = [
        { nome: "Senhas", icon: FiLock, color: "blue.500", bg: "blue.50" },
        { nome: "Cartões", icon: FiCreditCard, color: "orange.500", bg: "orange.50" },
        { nome: "App BB", icon: FiSmartphone, color: "green.500", bg: "green.50" },
        { nome: "Pix e Pagos", icon: FiDollarSign, color: "teal.500", bg: "teal.50" },
    ];

    const categoriasComOutros = [
        ...categoriasBase,
        { nome: "Outros", icon: FiGrid, color: "purple.500", bg: "purple.50" }
    ];

    const tutoriaisExibidos = estados.tutoriais.filter((tut) => {
        if (!filtroAtivo) return true;

        if (filtroAtivo === "Outros") {
            const namesBase = categoriasBase.map(c => c.nome);
            return !tut.categoria || !namesBase.includes(tut.categoria);
        }

        return tut.categoria === filtroAtivo;
    });

    return (
        <Box bg="white" minH="calc(100vh - 64px)" w="full">
            {/* 1. HERO SECTION  */}
            <Box bg="brand.500" pt={12} pb={24} px={{ base: 4, md: 8, "2xl": 12 }} w="full">
                <Heading size="2xl" color="blue.900" fontWeight="900" letterSpacing="tighter">
                    Como podemos ajudar?
                </Heading>
            </Box>

            {/* SEÇÃO INTEGRADA DE SELETORES  */}
            <VStack w="full" px={{ base: 4, md: 8, "2xl": 12 }} mt="-60px" gap={6} align="stretch">

                {/* 2. NOVO: FILTRO DE IDIOMAS NO TOPO DA HOME (Estilo YouTube Pílula) */}
                <Box bg="white" p={4} borderRadius="xl" shadow="md" borderWidth="1px" w="full">
                    <VStack align="start" gap={2} w="full">
                        <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" px={1}>
                            Selecione o Idioma:
                        </Text>

                        <HStack
                            w="full"
                            gap={2}
                            overflowX="auto"
                            pb={1}
                            css={{
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" }
                            }}
                        >
                            <IconButton aria-label="Filtros" variant="subtle" colorPalette="gray" borderRadius="full" size="sm" flexShrink={0}>
                                <FiSliders />
                            </IconButton>

                            <Button
                                size="sm"
                                borderRadius="full"
                                flexShrink={0}
                                variant={!estados.selectedLanguage ? "solid" : "subtle"}
                                colorPalette={!estados.selectedLanguage ? "blue" : "gray"}
                                onClick={() => acoes.setLanguage("")}
                                px={4}
                                fontWeight="medium"
                            >
                                Explorar Todos
                            </Button>

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
                    </VStack>
                </Box>

                {/* 3. ÍCONES DE FILTROS/CATEGORIAS */}
                <Box w="full">
                    <SimpleGrid columns={5} gap={2} maxW="full">
                        {categoriasComOutros.map((cat) => {
                            const isAtivo = filtroAtivo === cat.nome;
                            return (
                                <VStack key={cat.nome}>
                                    <Circle
                                        size={{ base: "60px", md: "80px" }}
                                        bg={isAtivo ? cat.color : "white"}
                                        color={isAtivo ? "white" : cat.color}
                                        shadow="lg"
                                        cursor="pointer"
                                        transition="all 0.3s"
                                        onClick={() => setFiltroAtivo(isAtivo ? null : cat.nome)}
                                        _hover={{ transform: "scale(1.1)", bg: isAtivo ? cat.color : cat.bg }}
                                    >
                                        <Icon as={cat.icon} fontSize={{ base: "24px", md: "30px" }} />
                                    </Circle>
                                    <Text fontSize="xs" fontWeight="bold" color="blue.900" mt={1}>
                                        {cat.nome}
                                    </Text>
                                </VStack>
                            );
                        })}
                    </SimpleGrid>
                </Box>

            </VStack>

            {/* 4. GRID DE TUTORIAIS COMPLETO  */}
            <Box w="full" py={12} px={{ base: 4, md: 8, "2xl": 12 }}>
                <Flex justify="space-between" align="end" mb={10}>
                    <VStack align="start" gap={1}>
                        <HStack gap={2} color="blue.600">
                            <Icon as={FiHelpCircle} />
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                                {filtroAtivo ? `Categoria: ${filtroAtivo}` : "Sugestões"}
                                {estados.selectedLanguage && ` — ${estados.selectedLanguage}`}
                            </Text>
                        </HStack>
                        <Heading size="lg" color="blue.900" fontWeight="800">
                            Tutoriais Disponíveis
                        </Heading>
                    </VStack>

                    <Link href="/media" passHref>
                        <Button variant="ghost" color="blue.600" fontWeight="bold" size="sm" gap="2">
                            Ver todos <FiArrowRight />
                        </Button>
                    </Link>
                </Flex>

                {tutoriaisExibidos.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, "2xl": 5 }} gap={10} w="full">
                        {tutoriaisExibidos.map((tut) => (
                            <Box key={tut.id} transition="0.3s" _hover={{ opacity: 0.9 }}>
                                <TutorialCard
                                    tutorial={tut}
                                    onClick={() => handleVideoClick(tut.pergunta)}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <Center py={10} w="full">
                        <Text color="gray.500">Nenhum tutorial encontrado para os filtros selecionados.</Text>
                    </Center>
                )}
            </Box>
        </Box>
    );
}