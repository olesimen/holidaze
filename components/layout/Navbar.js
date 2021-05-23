import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const adminLinks = [
    {
        name: "Dashboard",
        url: "/admin",
    },
    {
        name: "Add new",
        url: "/admin/manage/create",
    },
    {
        name: "Enquiries",
        url: "/admin/enquiries",
    },
    {
        name: "Messages",
        url: "/admin/messages",
    },
];

const clientLinks = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Accommodations",
        url: "/accommodations",
    },
    {
        name: "Contact",
        url: "/contact",
    },
];

const NavLink = ({ children, url }) => (
    <Link
        as={NextLink}
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={url}
    >
        {children}
    </Link>
);

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [auth, setAuth] = useContext(AuthContext);

    const router = useRouter();

    function logOut() {
        setAuth(null);
        router.push("/");
    }

    return (
        <>
            <Box
                bg={useColorModeValue("gray.100", "gray.900")}
                px={4}
                pos="fixed"
                zIndex="docked"
                w="100%"
            >
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={"center"}>
                        <Box>Logo</Box>
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            {clientLinks.map((link) => (
                                <NavLink key={link.name} url={link.url}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        {auth ? (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                >
                                    <Avatar size={"sm"} />
                                </MenuButton>
                                <MenuList>
                                    {adminLinks.map((link) => (
                                        <MenuItem key={link.name}>
                                            <NavLink url={link.url}>
                                                {link.name}
                                            </NavLink>
                                        </MenuItem>
                                    ))}
                                    <MenuDivider />
                                    <MenuItem onClick={logOut}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <NavLink url="/login">Login</NavLink>
                        )}
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {clientLinks.map((link) => (
                                <NavLink key={link.name} url={link.url}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
