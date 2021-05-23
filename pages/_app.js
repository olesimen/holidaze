import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/context/AuthContext";

// Fonts
import "@fontsource/comfortaa/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

//Theme
import myTheme from "@/theme/myTheme";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider resetCSS theme={myTheme}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
