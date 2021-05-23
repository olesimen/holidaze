import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/router";
import { Head, Layout } from "@/components/layout";
import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Textarea,
    FormErrorMessage,
    Button,
    useToast,
} from "@chakra-ui/react";

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Please provide a title for the accommodation.")
        .min(3, `Must be at least 3 characters.`),
    area: yup
        .string()
        .required("Provide a location for the accommodation.")
        .min(2, "Must be at least 2 characters."),
    description: yup
        .string()
        .required("Please provide a description of the accommodation.")
        .min(10, "Must be at least 10 characters"),
    bedrooms: yup
        .number("Please provide a number.")
        .integer()
        .required("Provide number of bedrooms."),
    beds: yup.number().integer().required("Provide number of beds."),
    guests: yup
        .number("Please provide a number")
        .integer()
        .required("Provide number of guests allowed."),
    bathrooms: yup.number().integer().required("Provide number of bathrooms."),

    // Default values provided for rest in API
});

const Create = () => {
    const accommodationsUrl = `${process.env.NEXT_PUBLIC_API_URL}/accommodations`;

    const http = useAxios();

    const { register, handleSubmit, errors, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        criteriaMode: "all",
    });

    const createForm = useRef(null);

    const toast = useToast();

    const router = useRouter();

    async function onSubmit(data) {
        const { images, ...rest } = data;

        const formData = new FormData();
        formData.append("data", JSON.stringify(rest));

        for (const image of images) {
            formData.append("files.images", image, image.name);
        }
        try {
            const response = await http.post(accommodationsUrl, formData);
            console.log(response);

            if (response.status === 200) {
                toast({
                    position: "top",
                    title: "Accommodation added",
                    description: "Redirecting to dashboard",
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                    onCloseComplete: () => {
                        router.push("/admin");
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <Head
                title="Add new accommodation"
                description="Create and add a new accommodation to your Holidaze account"
            />
            <form onSubmit={handleSubmit(onSubmit)} ref={createForm} noValidate>
                <VStack spacing={8}>
                    <FormControl id="title" isInvalid={errors.title} isRequired>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            placeholder="My awesome apartment"
                            ref={register}
                        />
                        <FormErrorMessage>
                            {errors.title && errors.title.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="area" isInvalid={errors.area} isRequired>
                        <FormLabel htmlFor="area">Area/District</FormLabel>
                        <Input
                            type="text"
                            name="area"
                            placeholder="Bryggen"
                            ref={register}
                        />
                        <FormErrorMessage>
                            {errors.area && errors.area.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl
                        id="description"
                        isInvalid={errors.description}
                        isRequired
                    >
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Textarea
                            name="description"
                            placeholder="Your description (minimum 10 characters)."
                            ref={register}
                            resize="vertical"
                        />
                        <FormErrorMessage>
                            {errors.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl
                        id="bedrooms"
                        isInvalid={errors.bedrooms}
                        isRequired
                    >
                        <FormLabel htmlFor="bedrooms">Bedrooms</FormLabel>
                        <Input
                            type="number"
                            name="bedrooms"
                            placeholder="1"
                            ref={register}
                        />
                        <FormErrorMessage>
                            {errors.bedrooms && errors.bedrooms.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="beds" isInvalid={errors.beds} isRequired>
                        <FormLabel htmlFor="beds">Beds</FormLabel>
                        <Input
                            type="number"
                            name="beds"
                            placeholder="1"
                            ref={register}
                        />
                        <FormErrorMessage>
                            {errors.beds && errors.beds.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl
                        id="guests"
                        isInvalid={errors.guests}
                        isRequired
                    >
                        <FormLabel htmlFor="guests">Guests</FormLabel>
                        <Input
                            type="number"
                            name="guests"
                            placeholder="1"
                            ref={register}
                        />
                        <FormErrorMessage>
                            {errors.guests && errors.guests.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl
                        id="bathrooms"
                        isInvalid={errors.bathrooms}
                        isRequired
                    >
                        <FormLabel htmlFor="bathrooms">Bathrooms</FormLabel>
                        <Input
                            type="number"
                            name="bathrooms"
                            placeholder="1"
                            ref={register}
                        />
                        <FormErrorMessage>
                            {errors.bathrooms && errors.bathrooms.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="kitchen" mb="0">
                            Kitchen
                        </FormLabel>
                        <Switch
                            id="kitchen"
                            name="kitchen"
                            ref={register}
                            defaultIsChecked={false}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="tv" mb="0">
                            TV
                        </FormLabel>
                        <Switch
                            id="tv"
                            name="tv"
                            ref={register}
                            defaultIsChecked={false}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="dryer" mb="0">
                            Dryer
                        </FormLabel>
                        <Switch
                            id="dryer"
                            name="dryer"
                            ref={register}
                            defaultIsChecked={false}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="wifi" mb="0">
                            Wifi
                        </FormLabel>
                        <Switch
                            id="wifi"
                            name="wifi"
                            ref={register}
                            defaultIsChecked={false}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="air_con" mb="0">
                            Air conditioning
                        </FormLabel>
                        <Switch
                            id="air_con"
                            name="air_con"
                            ref={register}
                            defaultIsChecked={false}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="heating" mb="0">
                            Heating
                        </FormLabel>
                        <Switch
                            id="heating"
                            name="heating"
                            ref={register}
                            defaultIsChecked={false}
                        />
                    </FormControl>

                    <FormControl
                        id="images"
                        isInvalid={errors.images}
                        isRequired
                    >
                        <FormLabel htmlFor="images">Add your images</FormLabel>
                        <Input
                            type="file"
                            name="images"
                            ref={register}
                            multiple
                            variant="outline"
                        />
                        <FormErrorMessage>
                            {errors.images && errors.images.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button
                        mt={4}
                        isLoading={formState.isSubmitting}
                        loadingText="Submitting"
                        isDisabled={!formState.isValid}
                        type="submit"
                    >
                        Send it!
                    </Button>
                </VStack>
            </form>
        </Layout>
    );
};

export default Create;
