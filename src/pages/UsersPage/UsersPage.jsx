import { VStack, Flex } from '@chakra-ui/react'
import React from 'react'
import SuggestedUser from '../../components/SuggestedUsers/SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';

const UsersPage = () => {
    const { isLoading, suggestedUsers } = useGetSuggestedUsers();

    return (
            <VStack mx={{ base: "4", lg: "6" }} py={8} gap={4} w={220}>
                {suggestedUsers.map(user => (
                    <SuggestedUser user={user} key={user.id} />
                ))}
            </VStack>
    )
}

export default UsersPage