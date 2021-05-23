import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";

const Navigation = dynamic(() => import("@/components/layout/Navbar"), {
    ssr: false,
});

const Layout = ({ children }) => {
    return (
        <>
            <Navigation />
            <Box pt={24} px={[4, 8]}>
                {children}
            </Box>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
