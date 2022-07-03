import { Box, Text, Flex, Image } from '@chakra-ui/react';
import GradientLayout from '../components/gradientLayout';
import { useMe } from '../lib/hooks';
import prisma from '../lib/prisma';

const Home = ({ artists }) => {
  const { user } = useMe();
  return (
    <GradientLayout
      color="blue"
      title={`${user?.firstName} ${user?.lastName}`}
      subtitle="profile"
      description={`${user?.playlistsCount} public playlists`}
      image="https://i.pinimg.com/originals/79/80/9d/79809debe02ca1f02727c080397a34a7.jpg"
      roundImage
    >
      <Box color="white" paddingX="40px" width="100%">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex gap="10px">
          {artists.map((artist) => (
            <Box
              key={artist.id}
              width="200px"
              bg="gray.800"
              borderRadius="4px"
              padding="15px"
            >
              <Image
                src="https://placekitten.com/300/300"
                borderRadius="100%"
              />
              <Box marginTop="20px">
                <Text fontSize="large">{artist.name}</Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  return {
    props: {
      artists,
    },
  };
};

export default Home;
