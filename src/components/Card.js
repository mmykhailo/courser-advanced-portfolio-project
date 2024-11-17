import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => (
    <VStack backgroundColor={'#fff'} borderRadius={10} overflow='hidden'>
      <Image
        src={'https://ugfvryfkokho.labs.coursera.org/serve/' + imageSrc()}
        w={'100%'}
        borderRadius={10}
      />
      <VStack p={8} alignItems="left">
        <Heading color={'#000'}>{title}</Heading>
        <Text color="gray">{description}</Text>
        <Text color="gray">
          See more <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </Text>
      </VStack>
    </VStack>
  )

export default Card;
