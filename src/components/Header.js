import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const useWindowScroll = () => {
  const positionRef = useRef()
  const [lastDirection, setLastDirection] = useState('up')

  useEffect(() => {
    const handleScroll = (e) => {
      const newDirection = window.scrollY < positionRef.current?.y ? 'up' : 'down'
      if (newDirection !== lastDirection) {
        setLastDirection(newDirection)        
      }
      positionRef.current = { x: window.scrollX, y: window.scrollY }
    }
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastDirection]);

  return lastDirection
}

const Header = () => {
  const lastDirectionScroll = useWindowScroll()



  const handleClick = (anchor) => {
     const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  const handleClickProjects = React.useCallback(() => {
    handleClick('projects')
  }, [handleClick])
  
  const handleClickContactMe = React.useCallback(() => {
    handleClick('contactme')
  }, [handleClick])

  return (
    <Box
      position="fixed"
      top={lastDirectionScroll === 'up' ? '0px' : '-200px'}
      left={0}
      right={0}
      transitionProperty="top"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={4}>
               {socials.map((icon, i) => (
                 <a href={icon.url} key={i}>
                  <FontAwesomeIcon icon={ icon.icon} size="2x" />
                </a>
            ))}
        </HStack>
           </nav>
          <nav>
            <HStack spacing={8}>
              <div onClick={handleClickProjects}>
                Projects
              </div>
              <div onClick={handleClickContactMe}>
                Contact me
              </div>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
