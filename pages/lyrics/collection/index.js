import Link from 'next/link';
import styled from 'styled-components';
import getAllLyrics from '../../../services/lyricsService';
import Image from 'next/image';
import trashIcon from '../../../public/trash-icon.png';
import { useState } from 'react';
import {
  PageTitle,
  SubTitleContainer,
  SubTitle,
  BackLink,
  ListContainer,
  LinkContainer,
  RemoveButton,
} from '../../../components/Styling';

export async function getServerSideProps() {
  const lyrics = await getAllLyrics();

  return {
    props: {
      lyrics,
    },
  };
}

export default function Collection({ lyrics }) {
  const [lyricsList, setLyricsList] = useState(lyrics);

  async function removeLyrics(id) {
    await fetch(`/api/lyrics/${id}`, {
      method: 'DELETE',
    });
    setLyricsList(
      lyricsList.filter((lyrics) => {
        return lyrics.id !== id;
      })
    );
  }

  return (
    <>
      <PageTitle>Lyrics</PageTitle>
      <SubTitleContainer>
        <SubTitle>Your awesome collection</SubTitle>
      </SubTitleContainer>
      <ListContainer>
        {lyricsList.map((song) => (
          <>
            <ListItem key={song.id}>
              <Link href={`/lyrics/collection/${song.id}`} passHref>
                <LyricsTitle>&quot;{song.title}&quot;</LyricsTitle>
              </Link>
              <RemoveButton onClick={() => removeLyrics(song.id)}>
                <Image alt="trash icon" layout="responsive" src={trashIcon} />
              </RemoveButton>
            </ListItem>
          </>
        ))}
      </ListContainer>
      <LinkContainer>
        <Link href="/lyrics">
          <BackLink>go back</BackLink>
        </Link>
      </LinkContainer>
    </>
  );
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LyricsTitle = styled.a`
  text-decoration: none;
  padding: 0.6rem;
  width: fit-content;
  border-radius: 0.3rem;
  color: #dfdfdf;
  background-color: #1b4362;
  cursor: pointer;

  &:hover {
    background-color: #436a89;
  }
`;
