import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  const {values, handleSubmit, errors, getFieldProps, isValid, resetForm} = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      comment: '',
      type: '',
    },
    onSubmit: (values) => {
      submit('/yolo', values)
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Please input your name'),
      email: Yup.string().email('Email is not valid').required('Please input your email'),
      comment: Yup.string().required('Please input your comment'),
      type: Yup.string().required('Please input type'),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message)
      if(response.type=== 'success') resetForm()
    }
  }, [response])

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={getFieldProps('firstName').onChange}
                />
                <FormErrorMessage>{ errors.firstName }</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={getFieldProps('email').onChange}
                />
                <FormErrorMessage>{ errors.email }</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.type}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                                    value={values.type}
                  onChange={getFieldProps('type').onChange}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{ errors.type }</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={values.comment}
                  onChange={getFieldProps('comment').onChange}
                />
                <FormErrorMessage>{ errors.comment }</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" disabled={!isValid || isLoading} >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
