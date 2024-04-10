import { Box, Button, Flex, Image, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import uselIkePost from "../../hooks/uselIkePost";
import { timeAgo } from "../../utils/timeAgo"
import CommentsModal from "../Modals/CommentsModal";



const PostFooter = ({ post, username, isProfilePage, creatorProfile }) => {
  const authUser = useAuthStore(state => state.user);

  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState('');
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = uselIkePost(post)

  const { isOpen, onOpen, onClose} = useDisclosure()

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment)
    setComment('');
  }


  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
        </Box>

        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
          <CommentLogo />
        </Box>
      </Flex>


      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize={12} color={'gray'}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontWeight={700} fontSize={"sm"}>
            {creatorProfile?.username}{" "}
            <Text as='span' fontWeight={400}>
              {post.caption}
            </Text>
          </Text>

          {post.comments.length > 0 && (
            <Text color={"gray"} fontSize={"sm"} cursor={'pointer'} onClick={onOpen}>
              View all {post.comments.length} comments
            </Text>
          )}

          {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
        </>
      )}

      {authUser && (
        <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
          <InputGroup>
            <Input variant={"flushed"} placeholder="Add a comment..." fontSize={14}
              onChange={(e) => setComment(e.target.value)} value={comment} ref={commentRef}
            />
            <InputRightElement>
              <Button
                onClick={handleSubmitComment} isLoading={isCommenting}
                fontSize={14} color={"blue.500"} fontWeight={600} cursor={"pointer"} _hover={{ color: "white" }} bg={"transparent"}>
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  )
}

export default PostFooter