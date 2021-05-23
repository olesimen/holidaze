import { Head, Layout } from "@/components/layout";
import { Heading } from "@chakra-ui/react";

const Home = () => {
    return (
        <Layout>
            <Head title="Home" description="Find your next stay in Bergen." />
            <Heading>Home</Heading>
        </Layout>
    );
};

export default Home;
