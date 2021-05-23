import PropTypes from "prop-types";
import axios from "axios";
import { Head, Layout } from "@/components/layout";

const accommodationsUrl = `${process.env.NEXT_PUBLIC_API_URL}/accommodations/`;

export async function getServerSideProps({ query }) {
    const { id } = query;
    const { data } = await axios.get(`${accommodationsUrl}${id}`);

    return { props: { data } };
}

const Accommodation = ({ data }) => {
    console.log(data);
    const {
        id,
        title,
        description,
        area,
        guests,
        bathrooms,
        bedrooms,
        beds,
        kitchen,
        wifi,
        dryer,
        air_con,
        tv,
        heating,
        enquiries,
    } = data;

    const amenities = {
        kitchen,
        wifi,
        dryer,
        air_con,
        tv,
        heating,
    };

    return (
        <Layout>
            <h1>{title}</h1>
        </Layout>
    );
};

export default Accommodation;
