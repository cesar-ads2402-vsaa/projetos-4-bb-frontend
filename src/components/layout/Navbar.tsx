"use client";

import { Box, Flex, Button, HStack, IconButton, Icon } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut, FiHome } from "react-icons/fi";
import { BotaoAdmin } from "@/features/admin/components/BotaoAdmin";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
    const { isLoggedIn, handleLogout } = useAuth();

    return (
        <Box as="nav" bg="brand.500" w="full" borderBottom="1px solid" borderColor="blackAlpha.100" px={{ base: 4, md: 8, "2xl": 12 }} py={2} shadow="sm" position="sticky" top="0" zIndex="1000">
            <Flex w="full" alignItems="center" justifyContent="space-between">
                <HStack gap={{ base: 2, md: 4 }}>
                    <Link href="/" passHref>
                        <Button variant="ghost" color="blue.900" borderRadius="full" size="sm" px={{ base: 2, md: 3 }} gap={2} _hover={{ bg: "blackAlpha.100" }} cursor="pointer">
                            <Icon as={FiHome} fontSize="20px" />
                            <Box as="span" display={{ base: "none", md: "inline" }} fontWeight="bold" fontSize="xs">Início</Box>
                        </Button>
                    </Link>
                    <Link href="/">
                        <Box position="relative" width={{ base: "110px", md: "160px" }} height="40px" cursor="pointer">
                            <Image src="/bb-logo.png" alt="Logo do Banco do Brasil" fill style={{ objectFit: "contain" }} priority />
                        </Box>
                    </Link>
                </HStack>

                <HStack gap={{ base: 2, md: 4 }}>
                    {isLoggedIn ? (
                        <HStack gap={3}>
                            <Box css={{ "& button": { borderRadius: "full", height: "32px", fontSize: "xs", fontWeight: "bold", px: 4, bg: "whiteAlpha.900", color: "purple.600", border: "1px solid", borderColor: "purple.200", cursor: "pointer", _hover: { bg: "white", shadow: "sm" } } }}>
                                <BotaoAdmin />
                            </Box>
                            <IconButton aria-label="Sair" variant="ghost" color="blue.900" size="sm" onClick={handleLogout} borderRadius="full" _hover={{ bg: "blackAlpha.100" }}>
                                <FiLogOut size="20px" />
                            </IconButton>
                        </HStack>
                    ) : (
                        <HStack gap={2}>
                            <Link href="/login"><Button size="sm" variant="ghost" color="blue.900" fontWeight="bold" fontSize="xs">Entrar</Button></Link>
                            <Link href="/cadastro"><Button size="sm" bg="blue.600" color="white" borderRadius="full" px={5} _hover={{ bg: "blue.700" }} fontWeight="bold" fontSize="xs">Cadastrar</Button></Link>
                        </HStack>
                    )}
                </HStack>
            </Flex>
        </Box>
    );
};