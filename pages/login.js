import { useState, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Layout, Head } from "@/components/layout";
import {
    Heading,
    Container,
    VStack,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";

const AUTH_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TOKEN_PATH}`;

const schema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .required("Please enter your username(email).")
        .email("Please enter a valid email address."),

    password: yup.string().trim().required("Please enter your password."),
});

const Login = () => {
    const [loginError, setLoginError] = useState(null);

    const { register, handleSubmit, errors, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        criteriaMode: "all",
    });

    const [auth, setAuth] = useContext(AuthContext);

    const router = useRouter();

    async function onSubmit({ username, password }) {
        setLoginError(null);
        console.log(username, password);

        try {
            const { data: loginData } = await axios.post(AUTH_PATH, {
                identifier: username,
                password: password,
            });
            console.log(loginData);
            setAuth(loginData);
            router.push("/admin");
            console.log(auth);
        } catch (error) {
            console.log("error", error);
            setLoginError(error.toString());
        }
    }

    return (
        <Layout>
            <Head
                title="Login"
                description="Login to get access to admin-page."
            />
            <Heading as="h1" textAlign="center" mb={8}>
                Login
            </Heading>
            <Container maxW="container.sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={8}>
                        {loginError && (
                            <Alert status="error">
                                <AlertIcon />
                                <AlertTitle>Login failed</AlertTitle>
                                <AlertDescription>
                                    {loginError}
                                </AlertDescription>
                            </Alert>
                        )}
                        <FormControl
                            id="username"
                            isInvalid={errors.username}
                            isRequired
                        >
                            <FormLabel htmlFor="username">
                                Username (email)
                            </FormLabel>
                            <Input
                                type="email"
                                name="username"
                                placeholder="john@domain.com"
                                ref={register}
                            />
                            <FormErrorMessage>
                                {errors.username && errors.username.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            id="password"
                            isInvalid={errors.password}
                            isRequired
                        >
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Your password"
                                ref={register}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
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

export default Login;
