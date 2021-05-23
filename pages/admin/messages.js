import PropTypes from "prop-types";
import useAxios from "@/hooks/useAxios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Head, Layout } from "@/components/layout";

const messagesUrl = `${process.env.NEXT_PUBLIC_API_URL}/messages`;

const Messages = () => {
    const http = useAxios();

    useEffect(() => {
        const getAccommodations = async () => {
            try {
                const response = await http.get(messagesUrl);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        getAccommodations();
    }, []);

    return (
        <Layout>
            <h1>Messages</h1>
        </Layout>
    );
};

export default Messages;
