import NextHead from "next/head";
import PropTypes from "prop-types";

const Head = ({ title, description, keywords }) => {
    return (
        <NextHead>
            <title>
                {title}
                {title ? " | " : ""}Holidaze
            </title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </NextHead>
    );
};

Head.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string,
};

export default Head;
