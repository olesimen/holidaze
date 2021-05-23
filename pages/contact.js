import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { Layout, Head } from "@/components/layout";

import {
    Heading,
    Container,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    FormErrorMessage,
    Button,
    useToast,
} from "@chakra-ui/react";

const schema = yup.object().shape({
    firstname: yup
        .string()
        .trim()
        .required("Please enter your first name.")
        .min(3, `Must be at least 3 characters.`),
    lastname: yup
        .string()
        .trim()
        .required("Please enter your last name.")
        .min(4, "Must be at least 4 characters."),
    email: yup
        .string()
        .trim()
        .required("Please enter your email address.")
        .email("Please enter a valid email address."),
    subject: yup.string().ensure().required("Please select a subject."),
    message: yup
        .string()
        .required("Please enter your message.")
        .min(10, "Must be at least 10 characters"),
});

const Contact = () => {
    const { register, handleSubmit, errors, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        criteriaMode: "all",
    });

    const messagesUrl = `${process.env.NEXT_PUBLIC_API_URL}/messages`;

    const http = axios;

    const router = useRouter();

    const toast = useToast();

    async function onSubmit(data) {
        try {
            const response = await http.post(messagesUrl, data);

            if (response.status === 200) {
                toast({
                    position: "top",
                    title: "Message sent",
                    description: "We will get back to you as soon as possible.",
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                    onCloseComplete: () => {
                        router.push("/");
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <Head title="Contact" description="Get in touch with us." />
            <Heading as="h1" textAlign="center" mb={8}>
                Get in touch
            </Heading>
            <Container maxW="container.sm">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <VStack spacing={8}>
                        <FormControl
                            id="firstname"
                            isInvalid={errors.firstname}
                            isRequired
                        >
                            <FormLabel htmlFor="firstname">
                                First Name
                            </FormLabel>
                            <Input
                                type="text"
                                name="firstname"
                                placeholder="John"
                                ref={register}
                            />
                            <FormErrorMessage>
                                {errors.firstname && errors.firstname.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            id="lastname"
                            isInvalid={errors.lastname}
                            isRequired
                        >
                            <FormLabel htmlFor="lastname">Last Name</FormLabel>
                            <Input
                                type="text"
                                name="lastname"
                                placeholder="Smith"
                                ref={register}
                            />
                            <FormErrorMessage>
                                {errors.lastname && errors.lastname.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            id="email"
                            isInvalid={errors.email}
                            isRequired
                        >
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="john@domain.com"
                                ref={register}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            id="subject"
                            isInvalid={errors.subject}
                            isRequired
                        >
                            <FormLabel htmlFor="subject">Subject</FormLabel>
                            <Select name="subject" ref={register}>
                                <option></option>
                                <option value="option 1">option 1</option>
                                <option value="option 2">option 2</option>
                            </Select>
                            <FormErrorMessage>
                                {errors.subject && errors.subject.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            id="message"
                            isInvalid={errors.message}
                            isRequired
                        >
                            <FormLabel htmlFor="message">Message</FormLabel>
                            <Textarea
                                name="message"
                                placeholder="Your message (minimum 10 characters)."
                                ref={register}
                                resize="vertical"
                            />
                            <FormErrorMessage>
                                {errors.message && errors.message.message}
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
            </Container>
        </Layout>
    );
};

export default Contact;
