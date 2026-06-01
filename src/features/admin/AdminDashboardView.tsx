"use client";

import {
    Box,
    Button,
    Input,
    VStack,
    HStack,
    Text,
    Heading,
    Flex,
    SimpleGrid,
    Badge,
    NativeSelect,
    Stack,
    Circle,
    Icon,
    IconButton
} from "@chakra-ui/react";
import {
    FiTrash2,
    FiCheck,
    FiX,
    FiShield,
    FiVideo,
    FiHeadphones,
    FiUsers,
    FiGlobe,
    FiLock,
    FiCreditCard,
    FiSmartphone,
    FiDollarSign,
    FiGrid,
    FiUser,
    FiClock,
    FiFileText
} from "react-icons/fi";
import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";
import { withAdminAuth } from "@/hooks/withAdminAuth";

export function AdminDashboardViewRaw() {
    const { estados, acoes } = useAdminDashboard();

    const categoriasAdmin = [
        { nome: "Senhas", icone: FiLock, color: "blue.500" },
        { nome: "Cartões", icone: FiCreditCard, color: "orange.500" },
        { nome: "App BB", icone: FiSmartphone, color: "green.500" },
        { nome: "Pix e Pagos", icone: FiDollarSign, color: "teal.500" },
        { nome: "Outros", icone: FiGrid, color: "purple.500" },
    ];

    const formatarTimestamp = (dataIso?: string) => {
        if (!dataIso) return "Data desconhecida";
        try {
            const data = new Date(dataIso);
            return data.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dataIso;
        }
    };

    return (
        <Flex minH="100vh" bg="gray.50" direction={{ base: "column", md: "row" }}>

            {/* MENU LATERAL / NAVEGAÇÃO MOBILE */}
            <Box
                w={{ base: "full", md: "250px" }}
                bg="gray.900"
                p={{ base: 4, md: 6 }}
                color="white"
            >
                <Heading size="md" mb={6} color="blue.300" display={{ base: "none", md: "block" }}>
                    Painel Admin
                </Heading>

                {/* VISÃO DESKTOP */}
                <VStack display={{ base: "none", md: "flex" }} align="start" gap={4}>
                    <Button w="full" justifyContent="start" variant={estados.abaAtiva === "TUTORIAIS" ? "solid" : "ghost"} colorPalette="blue" onClick={() => acoes.setAbaAtiva("TUTORIAIS")}>
                        <FiVideo style={{ marginRight: '8px' }} /> Tutoriais
                    </Button>
                    <Button w="full" justifyContent="start" variant={estados.abaAtiva === "MODERACAO" ? "solid" : "ghost"} colorPalette="green" onClick={() => acoes.setAbaAtiva("MODERACAO")}>
                        <FiHeadphones style={{ marginRight: '8px' }} /> Moderação
                        {estados.audiosPendentes.length > 0 && <Badge colorPalette="red" ml={2} borderRadius="full">{estados.audiosPendentes.length}</Badge>}
                    </Button>
                    <Button w="full" justifyContent="start" variant={estados.abaAtiva === "USUARIOS" ? "solid" : "ghost"} colorPalette="purple" onClick={() => acoes.setAbaAtiva("USUARIOS")}>
                        <FiUsers style={{ marginRight: '8px' }} /> Usuários
                    </Button>
                    <Button w="full" justifyContent="start" variant={estados.abaAtiva === "IDIOMAS" ? "solid" : "ghost"} colorPalette="orange" onClick={() => acoes.setAbaAtiva("IDIOMAS")}>
                        <FiGlobe style={{ marginRight: '8px' }} /> Idiomas
                    </Button>
                </VStack>

                {/* VISÃO MOBILE */}
                <HStack
                    display={{ base: "flex", md: "none" }}
                    overflowX="auto"
                    gap={2}
                    pb={2}
                    css={{ '&::-webkit-scrollbar': { display: 'none' } }}
                >
                    <Button size="sm" flexShrink={0} variant={estados.abaAtiva === "TUTORIAIS" ? "solid" : "outline"} colorPalette="blue" onClick={() => acoes.setAbaAtiva("TUTORIAIS")}>
                        Tutoriais
                    </Button>
                    <Button size="sm" flexShrink={0} variant={estados.abaAtiva === "MODERACAO" ? "solid" : "outline"} colorPalette="green" onClick={() => acoes.setAbaAtiva("MODERACAO")}>
                        Moderação {estados.audiosPendentes.length > 0 && `(${estados.audiosPendentes.length})`}
                    </Button>
                    <Button size="sm" flexShrink={0} variant={estados.abaAtiva === "USUARIOS" ? "solid" : "outline"} colorPalette="purple" onClick={() => acoes.setAbaAtiva("USUARIOS")}>
                        Usuários
                    </Button>
                    <Button size="sm" flexShrink={0} variant={estados.abaAtiva === "IDIOMAS" ? "solid" : "outline"} colorPalette="orange" onClick={() => acoes.setAbaAtiva("IDIOMAS")}>
                        Idiomas
                    </Button>
                </HStack>
            </Box>

            {/* ÁREA DE CONTEÚDO PRINCIPAL */}
            <Box flex="1" p={{ base: 4, md: 8 }} maxW="1000px" mx="auto" minW="0" w="full" overflow="hidden">

                {/* ABA 1: TUTORIAIS */}
                {estados.abaAtiva === "TUTORIAIS" && (
                    <VStack align="start" gap={8} w="full">
                        <Heading size="lg" color="gray.800">Gerenciar Tutoriais</Heading>

                        <Box p={6} bg="white" shadow="sm" borderRadius="lg" w="full" borderWidth="1px">
                            <VStack align="start" gap={6}>
                                <Text fontWeight="bold" color="gray.800">Adicionar Novo Processo</Text>

                                <Stack direction={{ base: "column", md: "row" }} w="full" gap={4}>
                                    <Input
                                        color="black"
                                        placeholder="Pergunta (ex: Como acessar o e-mail?)"
                                        value={estados.form.novaPergunta}
                                        onChange={(e) => acoes.setNovaPergunta(e.target.value)}
                                    />
                                    <Input
                                        color="black"
                                        placeholder="URL do YouTube"
                                        value={estados.form.novaUrl}
                                        onChange={(e) => acoes.setNovaUrl(e.target.value)}
                                    />
                                </Stack>

                                <VStack align="start" gap={3} w="full">
                                    <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
                                        Selecione a Categoria:
                                    </Text>
                                    <HStack gap={4} flexWrap="wrap">
                                        {categoriasAdmin.map((cat) => {
                                            const isSelecionado = estados.form.novaCategoria === cat.nome;
                                            return (
                                                <VStack
                                                    key={cat.nome}
                                                    cursor="pointer"
                                                    onClick={() => acoes.setNovaCategoria(cat.nome)}
                                                    gap={1}
                                                >
                                                    <Circle
                                                        size="50px"
                                                        border="2px solid"
                                                        borderColor={isSelecionado ? cat.color : "gray.100"}
                                                        bg={isSelecionado ? cat.color : "transparent"}
                                                        color={isSelecionado ? "white" : cat.color}
                                                        transition="all 0.2s"
                                                        _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                                                    >
                                                        <Icon as={cat.icone} fontSize="20px" />
                                                    </Circle>
                                                    <Text fontSize="2xs" fontWeight="bold" color={isSelecionado ? cat.color : "gray.500"}>
                                                        {cat.nome}
                                                    </Text>
                                                </VStack>
                                            );
                                        })}
                                    </HStack>
                                </VStack>

                                <Button
                                    colorPalette="blue"
                                    onClick={acoes.criarTutorial}
                                    loading={estados.form.carregandoForm}
                                    px={12}
                                    w={{ base: "full", md: "auto" }}
                                    alignSelf={{ md: "flex-end" }}
                                >
                                    Salvar Tutorial
                                </Button>
                            </VStack>
                        </Box>

                        <SimpleGrid columns={1} gap={4} w="full">
                            {estados.tutoriais.map(tut => (
                                <Flex
                                    key={tut.id}
                                    color="gray.800"
                                    p={4}
                                    bg="white"
                                    shadow="sm"
                                    borderRadius="md"
                                    borderWidth="1px"
                                    justify="space-between"
                                    align="center"
                                    direction={{ base: "column", sm: "row" }}
                                    gap={4}
                                >
                                    <Box flex="1" minW="0" w="full">
                                        <Text fontWeight="bold" color="black" wordBreak="break-word">
                                            {tut.pergunta}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500" truncate>
                                            {tut.youtubeUrl}
                                        </Text>
                                    </Box>
                                    <Button
                                        colorPalette="red"
                                        variant="ghost"
                                        size="sm"
                                        w={{ base: "full", sm: "auto" }}
                                        onClick={() => acoes.deletarTutorial(tut.id)}
                                    >
                                        <FiTrash2 style={{ marginRight: '4px' }} /> Deletar
                                    </Button>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </VStack>
                )}

                {/* ABA 2: MODERAÇÃO DE ÁUDIOS  */}
                {estados.abaAtiva === "MODERACAO" && (
                    <VStack align="start" gap={6} w="full">
                        <Heading size="lg" color="gray.800">Moderação de Explicações</Heading>

                        {/* FILTROS DA MODERAÇÃO */}
                        <VStack w="full" bg="white" p={5} borderRadius="xl" shadow="sm" borderWidth="1px" gap={5} align="start">
                            <Box w="full">
                                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1} textTransform="uppercase">
                                    Filtrar por Vídeo/Tutorial:
                                </Text>
                                <NativeSelect.Root w="full">
                                    <NativeSelect.Field
                                        value={estados.filtroModTutorial}
                                        onChange={(e) => acoes.setFiltroModTutorial(e.target.value)}
                                        color="black"
                                        bg="white"
                                        css={{
                                            "& option": {
                                                backgroundColor: "white",
                                                color: "black",
                                            }
                                        }}
                                    >
                                        <option value="" style={{ backgroundColor: "white", color: "black" }}>
                                            Todos os vídeos
                                        </option>

                                        {estados.tutoriais.map((tut) => (
                                            <option
                                                key={tut.id}
                                                value={tut.id}
                                                style={{ backgroundColor: "white", color: "black" }}
                                            >
                                                {tut.pergunta}
                                            </option>
                                        ))}
                                    </NativeSelect.Field>
                                </NativeSelect.Root>
                            </Box>

                            <VStack align="start" w="full" gap={2}>
                                <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
                                    Filtrar por Idioma:
                                </Text>
                                <HStack w="full" gap={2} overflowX="auto" pb={1} css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
                                    <Button
                                        size="sm"
                                        borderRadius="full"
                                        flexShrink={0}
                                        variant={!estados.filtroModIdioma ? "solid" : "subtle"}
                                        colorPalette={!estados.filtroModIdioma ? "blue" : "gray"}
                                        onClick={() => acoes.setFiltroModIdioma("")}
                                        px={4}
                                        fontWeight="medium"
                                    >
                                        Todos os idiomas
                                    </Button>
                                    {estados.idiomas.map((lang) => (
                                        <Button
                                            key={lang.id || lang.nome}
                                            size="sm"
                                            borderRadius="full"
                                            flexShrink={0}
                                            variant={estados.filtroModIdioma === lang.nome ? "solid" : "subtle"}
                                            colorPalette={estados.filtroModIdioma === lang.nome ? "blue" : "gray"}
                                            onClick={() => acoes.setFiltroModIdioma(lang.nome)}
                                            px={4}
                                            fontWeight="medium"
                                        >
                                            {lang.nome}
                                        </Button>
                                    ))}
                                </HStack>
                            </VStack>
                        </VStack>

                        {/* LISTAGEM DOS CARDS FILTRADOS */}
                        {(() => {
                            const audiosFiltrados = estados.audiosPendentes.filter((audio) => {
                                const bateIdioma = !estados.filtroModIdioma || audio.idioma === estados.filtroModIdioma;
                                const bateTutorial = !estados.filtroModTutorial || audio.tutorialId === Number(estados.filtroModTutorial);
                                return bateIdioma && bateTutorial;
                            });

                            if (audiosFiltrados.length === 0) {
                                return (
                                    <Box py={12} textAlign="center" w="full" bg="white" borderRadius="lg" borderWidth="1px">
                                        <Text color="gray.500" fontSize="sm">
                                            Nenhuma explicação pendente para os filtros selecionados.
                                        </Text>
                                    </Box>
                                );
                            }

                            return (
                                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4} w="full">
                                    {audiosFiltrados.map((audio) => {
                                        const tutorialCorrespondente = estados.tutoriais.find(t => t.id === audio.tutorialId);

                                        return (
                                            <VStack
                                                key={audio.id}
                                                p={4}
                                                bg="white"
                                                shadow="sm"
                                                borderRadius="xl"
                                                borderWidth="1px"
                                                align="stretch"
                                                gap={4}
                                                color="gray.800"
                                                w="full"
                                                minW="0"
                                            >
                                                {/* BLOCO DE DADOS DETALHADOS DO ÁUDIO (Nome, Idioma, Vídeo, Timestamp) */}
                                                <VStack align="stretch" gap={2.5} minW="0" w="full">

                                                    {/* Linha 1: Autor e Botões de Ação na mesma linha com imunidade a quebras */}
                                                    <Flex justify="space-between" align="center" w="full" gap={2}>
                                                        <HStack gap={2} minW="0" flex="1">
                                                            <Icon as={FiUser} color="gray.400" flexShrink={0} />
                                                            <Text fontWeight="bold" color="black" fontSize="sm" truncate>
                                                                {audio.nomeAutor || "Colaborador Anônimo"}
                                                            </Text>
                                                        </HStack>

                                                        <HStack gap={1.5} flexShrink={0}>
                                                            <IconButton
                                                                colorPalette="green"
                                                                size="sm"
                                                                borderRadius="full"
                                                                aria-label="Aprovar áudio"
                                                                onClick={() => acoes.aprovarAudio(audio.id)}
                                                            >
                                                                <FiCheck />
                                                            </IconButton>
                                                            <IconButton
                                                                colorPalette="red"
                                                                size="sm"
                                                                borderRadius="full"
                                                                aria-label="Reprovar áudio"
                                                                onClick={() => acoes.reprovarAudio(audio.id)}
                                                            >
                                                                <FiX />
                                                            </IconButton>
                                                        </HStack>
                                                    </Flex>

                                                    {/* Linha 2: Idioma */}
                                                    <HStack gap={2}>
                                                        <Badge colorPalette="blue" variant="subtle" borderRadius="full" px={2.5} py={0.5} fontSize="2xs">
                                                            {audio.idioma}
                                                        </Badge>
                                                    </HStack>

                                                    {/* Linha 3: Referente ao vídeo */}
                                                    {tutorialCorrespondente && (
                                                        <HStack gap={2} minW="0" w="full">
                                                            <Icon as={FiFileText} color="gray.400" flexShrink={0} />
                                                            <Text fontSize="xs" color="gray.600" fontWeight="medium" truncate>
                                                                <Text as="span" color="gray.400">Vídeo:</Text> {tutorialCorrespondente.pergunta}
                                                            </Text>
                                                        </HStack>
                                                    )}

                                                    {/* Linha 4: Timestamp  */}
                                                    <HStack gap={2} minW="0" w="full">
                                                        <Icon as={FiClock} color="gray.400" flexShrink={0} />
                                                        <Text fontSize="2xs" color="gray.500" truncate>
                                                            Enviado em: {formatarTimestamp(audio.dataCriacao)}
                                                        </Text>
                                                    </HStack>
                                                </VStack>

                                                {/* REPRODUTOR DE ÁUDIO  */}
                                                <Box
                                                    w="full"
                                                    overflowX="auto"
                                                    pt={1}
                                                    css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
                                                >
                                                    <audio
                                                        src={audio.caminhoArquivo}
                                                        controls
                                                        style={{ width: "100%", minWidth: "250px" }}
                                                    />
                                                </Box>
                                            </VStack>
                                        );
                                    })}
                                </SimpleGrid>
                            );
                        })()}
                    </VStack>
                )}

                {/* ABA 3: USUÁRIOS */}
                {estados.abaAtiva === "USUARIOS" && (
                    <VStack align="start" gap={6} w="full">
                        <Heading size="lg" color="gray.800">Gerenciar Equipe</Heading>
                        <SimpleGrid columns={1} gap={4} w="full">
                            {estados.usuariosComuns.map((user: any) => (
                                <Flex
                                    key={user.id}
                                    p={4}
                                    bg="white"
                                    shadow="sm"
                                    borderRadius="lg"
                                    borderWidth="1px"
                                    justify="space-between"
                                    align="center"
                                    direction={{ base: "column", sm: "row" }}
                                    gap={4}
                                >
                                    <Box flex="1" minW="0" w="full">
                                        <Text fontWeight="bold" color="black" truncate>
                                            {user.nome}
                                            {user.cargo === "ADMIN" && <Badge colorPalette="green" ml={2}>ADMIN</Badge>}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500" truncate>
                                            {user.email}
                                        </Text>
                                    </Box>
                                    <HStack gap={2} w={{ base: "full", sm: "auto" }} justify="flex-end">
                                        {user.cargo !== "ADMIN" && (
                                            <Button
                                                colorPalette="purple"
                                                size="sm"
                                                w={{ base: "full", sm: "auto" }}
                                                onClick={() => acoes.promoverUsuario(user.id, user.nome)}
                                            >
                                                <FiShield /> Promover
                                            </Button>
                                        )}
                                        {user.cargo === "ADMIN" && estados.cargoLogado === "SUPER_ADMIN" && (
                                            <Button
                                                colorPalette="red"
                                                variant="outline"
                                                size="sm"
                                                w={{ base: "full", sm: "auto" }}
                                                onClick={() => acoes.rebaixarUsuario(user.id, user.nome)}
                                            >
                                                Remover Poderes
                                            </Button>
                                        )}
                                    </HStack>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </VStack>
                )}

                {/* ABA 4: GERENCIAR IDIOMAS */}
                {estados.abaAtiva === "IDIOMAS" && (
                    <VStack align="start" gap={8} w="full">
                        <Heading size="lg" color="gray.800">Gerenciar Idiomas</Heading>
                        <Box p={6} bg="white" shadow="sm" borderRadius="lg" w="full" borderWidth="1px">
                            <Text fontWeight="bold" color="gray.800" mb={4}>Cadastrar Novo Idioma</Text>
                            <HStack w="full" gap={4}>
                                <Input
                                    color="black"
                                    bg="white"
                                    placeholder="Nome (ex: Espanhol)"
                                    value={estados.formIdioma.novoNomeIdioma}
                                    onChange={(e) => acoes.setNovoNomeIdioma(e.target.value)}
                                />
                                <Input
                                    color="black"
                                    bg="white"
                                    placeholder="Código (ex: es-ES)"
                                    value={estados.formIdioma.novoCodigoIdioma}
                                    onChange={(e) => acoes.setNovoCodigoIdioma(e.target.value)}
                                />
                                <Button
                                    colorPalette="orange"
                                    onClick={acoes.criarIdioma}
                                    loading={estados.form.carregandoForm}
                                >
                                    Salvar
                                </Button>
                            </HStack>
                        </Box>

                        <SimpleGrid columns={1} gap={4} w="full">
                            {estados.idiomas.map((idioma: any) => (
                                <HStack
                                    key={idioma.id}
                                    p={4}
                                    bg="white"
                                    shadow="sm"
                                    borderRadius="md"
                                    borderWidth="1px"
                                    justify="space-between"
                                    color="gray.800"
                                >
                                    <Box>
                                        <Text fontWeight="bold" color="black">{idioma.nome}</Text>
                                        <Text fontSize="sm" color="gray.500">Código: {idioma.codigo}</Text>
                                    </Box>
                                    <Button
                                        colorPalette="red"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => acoes.deletarIdioma(idioma.id)}
                                    >
                                        <FiTrash2 /> Deletar
                                    </Button>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    </VStack>
                )}

            </Box>
        </Flex>
    );
}

export const AdminDashboardView = withAdminAuth(AdminDashboardViewRaw);