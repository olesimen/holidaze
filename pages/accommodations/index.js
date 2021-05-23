import PropTypes from "prop-types";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Head, Layout } from "@/components/layout";
import { Heading } from "@chakra-ui/react";

const accommodationsUrl = `${process.env.NEXT_PUBLIC_API_URL}/accommodations`;

const Accommodations = () => {
    const router = useRouter();
    let queryUrl;

    if (router.query.title_contains) {
        queryUrl = `${accommodationsUrl}?title_contains=${router.query.title_contains}`;
    } else {
        queryUrl = accommodationsUrl;
    }

    useEffect(() => {
        const getAccommodations = async () => {
            try {
                const response = await axios.get(queryUrl);
                console.log(response);

                // Figure out how to use validateStatus
                // if (response.status === 200) {
                //     const {data} = response;
                //     setPages(data);
                // }else{
                //     setError("Please refresh the page")
                // }
            } catch (error) {
                console.log(error);
            }
        };
        getAccommodations();
    }, []);

    return (
        <Layout>
            <Head
                title="Accommodations"
                description="All accommodations offered by Holidaze."
            />
            <Heading>All accommodations</Heading>
        </Layout>
    );
};

export default Accommodations;
