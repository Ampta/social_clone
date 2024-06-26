import { Box, Flex, Spinner, Container } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />

  return (
    <Container maxW={"container.xl"} alignItems={'center'} px={{ base: "1", md: "8" }}>
      <Flex flexDir={canRenderNavbar ? "column" : "row"} >
        {/* {side bar on the left} */}
        {canRenderSidebar ? (
          <Box w={{ base: "70px", md: "240px" }}>
            <Sidebar />
          </Box>
        ) : null}

        {/* NavBar */}
        {canRenderNavbar ? <Navbar /> : null}


        {/* {the page content of the right} */}
        <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} mx={"auto"}>
          {children}
        </Box>

      </Flex>
    </Container>
  )
}

export default PageLayout

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
      <Spinner size='xl' />
    </Flex>
  )
}