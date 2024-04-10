import { Box, Image } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import useGetUserProfileId from '../../hooks/useGetUserProfileId'

const FeedPost = ({post}) => {

  const {userProfile} = useGetUserProfileId(post.createdBy);

  return (
    <Box justifyContent={'center'}>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={2} borderRadius={4} overflow={"hidden"}>
            <Image src={post.imageUrl} alt={'FEED POST IMAGE'}/>
        </Box>
        <PostFooter post={post} creatorProfile={userProfile} />
    </Box>
  )
}

export default FeedPost