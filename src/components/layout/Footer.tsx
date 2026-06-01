import { Box, Container, Text, Stack, Link } from "@chakra-ui/react";

export function Footer() {
    return (
        <Box as="footer" bg="brand.500" color="black" py={8} borderTop="1px solid" borderColor="gray.200">
            <Container maxW="container.xl">
                <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center">
                    <Text fontSize="sm">
                        &copy; {new Date().getFullYear()} © Banco do Brasil S/A - CNPJ 00.000.000/0001-91 SAUN QD 5 LT B, Asa Norte, Brasília-DF, Brasil - CEP 70040-911,
                        FAQ Inclusivo. Projeto de Impacto Social.
                    </Text>
                    <Stack direction="row" gap={6}>
                        <Link href="#" color="black" fontWeight="bold" _hover={{ textDecoration: "underline", color: "gray.700" }}>Sobre</Link>
                        <Link href="#" color="black" fontWeight="bold" _hover={{ textDecoration: "underline", color: "gray.700" }}>Privacidade</Link>
                        <Link href="#" color="black" fontWeight="bold" _hover={{ textDecoration: "underline", color: "gray.700" }}>Contato</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}