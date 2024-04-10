import { Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { InstagramLogo, InstagramMobileLogo } from '../../assets/constants'
import { BiLogOut } from "react-icons/bi"
import useLogout from '../../hooks/useLogout';
import SidebarItem from './SidebarItem';

const Sidebar = () => {


    const { handleLogout, isLoggingOut } = useLogout();


    return (
        <div>
            <Box
                height={"100vh"}
                borderRight={"1px solid"}
                borderColor={"whiteAlpha.300"}
                py={8}
                position={"sticky"}
                top={0}
                left={0}
                px={{ base: 2, md: 4 }}
            >

                <Flex direction={"column"} gap={10} w="full" height={"full"}>
                    <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor="pointer" >
                        <InstagramLogo />
                    </Link>

                    <Link to={"/"} as={RouterLink} p={2} display={{ base: "block", md: "none" }}
                        borderRadius={6}
                        _hover={{
                            bg: "whiteAlpha.200",
                        }}
                        w={10}
                        cursor="pointer" >
                        <InstagramMobileLogo />
                    </Link>
                    <Flex direction={"column"} gap={5} cursor={"pointer"}>
                        <SidebarItem />
                    </Flex>

                    {/* Logout */}
                    <Tooltip
                        hasArrow
                        label={"Logout"}
                        placement='right'
                        ml={1}
                        openDelay={500}
                        display={{ base: 'block', md: "flex-start" }}
                    >
                        <Flex
                            onClick={handleLogout}
                            alignItems={"center"}
                            gap={4}
                            _hover={{ bg: "whiteAlpha.400" }}
                            borderRadius={6}
                            p={2}
                            mt={"auto"}
                            w={"full"}>

                            <BiLogOut size={25} />
                            <Button display={{ base: "none", md: "block" }} variant={"ghost"} _hover={{ bg: "transparent" }} isLoading={isLoggingOut}>
                                Logout
                            </Button>

                        </Flex>
                    </Tooltip>

                </Flex>

            </Box>
        </div>
    )
}

export default Sidebar