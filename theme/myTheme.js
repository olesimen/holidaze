import { extendTheme } from "@chakra-ui/react";

const myTheme = extendTheme({
    fonts: {
        heading: "Comfortaa",
        body: "Poppins",
    },
    shadows: {
        outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    },
    colors: {
        primary: {
            50: "#EBF7F9",
            100: "#C8E8EF",
            200: "#A4D9E4",
            300: "#81CADA",
            400: "#5DBBCF",
            500: "#3AACC5",
            600: "#2E8A9E",
            700: "#236776",
            800: "#17454F",
            900: "#0C2227",
        },
    },
    components: {
        Input: {
            variants: {
                outline: {
                    addon: {
                        bg: "primary.200",
                    },
                },
            },
        },
        Button: {
            baseStyle: {
                borderRadius: "sm",
                _hover: {
                    transform: "translateY(-2px)",
                },
                _focus: {
                    transform: "translateY(-2px)",
                },
                _active: {
                    transform: "translateY(-2px) scale(0.95)",
                    boxShadow: "none",
                },
            },
        },
    },
});

export default myTheme;
