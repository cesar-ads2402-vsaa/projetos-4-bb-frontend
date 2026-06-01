import { Box, VStack, Text } from "@chakra-ui/react";
import { NativeSelect } from "@chakra-ui/react";
import {PainelFiltrosProps} from "@/types/types";


export function PainelFiltros({
                                  idiomas,
                                  processos,
                                  idiomaSelecionado,
                                  processoSelecionado,
                                  aoMudarIdioma,
                                  aoMudarProcesso
                              }: PainelFiltrosProps) {

    return (
        <Box
            w="full" bg="blue.50" p={6} borderRadius="2xl"
            border="1px solid" borderColor="blue.100"
            position={{ md: "sticky" }} top="20px"
        >
            <VStack align="start" gap={6}>

                {/* SELECT DE IDIOMA */}
                <Box w="full">
                    <Text fontWeight="bold" mb={2} fontSize="sm" color="black">Língua:</Text>
                    <NativeSelect.Root size="sm">
                        <NativeSelect.Field
                            value={idiomaSelecionado || ""}
                            onChange={(e) => aoMudarIdioma(e.target.value)}
                            bg="white" color="black" borderColor="gray.300"
                        >
                            <option value="" disabled style={{ backgroundColor: 'white', color: 'black' }}>
                                Escolha a língua
                            </option>
                            {idiomas.map((lang) => (
                                <option key={lang} value={lang} style={{ backgroundColor: 'white', color: 'black' }}>
                                    {lang}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator color="black" />
                    </NativeSelect.Root>
                </Box>

                {/* SELECT DE PROCESSO */}
                <Box w="full" mt={4}>
                    <Text fontWeight="bold" mb={2} fontSize="sm" color="black">Processo:</Text>
                    <NativeSelect.Root size="sm">
                        <NativeSelect.Field
                            value={processoSelecionado || ""}
                            onChange={(e) => aoMudarProcesso(e.target.value)}
                            bg="white" color="black" borderColor="gray.300"
                        >
                            <option value="" disabled style={{ backgroundColor: 'white', color: 'black' }}>
                                Escolha o processo
                            </option>
                            {processos.map((proc) => (
                                <option key={proc} value={proc} style={{ backgroundColor: 'white', color: 'black' }}>
                                    {proc}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator color="black" />
                    </NativeSelect.Root>
                </Box>

            </VStack>
        </Box>
    );
}