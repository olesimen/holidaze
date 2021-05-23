import PropTypes from "prop-types";
import useAxios from "@/hooks/useAxios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Head, Layout } from "@/components/layout";

const enquiriesUrl = `${process.env.NEXT_PUBLIC_API_URL}/enquiries/`;

const Enquiries = () => {
    const http = useAxios();

    useEffect(() => {
        const getAccommodations = async () => {
            try {
                const response = await http.get(enquiriesUrl);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        getAccommodations();
    }, []);

    return (
        <Layout>
            <h1>Enquiries</h1>
        </Layout>
    );
};

export default Enquiries;
