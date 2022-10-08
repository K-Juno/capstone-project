import Link from 'next/link';
import styled from 'styled-components';

export default function Nav() {
  return (
    <NavContainer>
      <nav>
        <Link href="/">
          <NavTag>Home</NavTag>
        </Link>
      </nav>
      <nav>
        <Link href="/lyrics">
          <NavTag>Lyrics</NavTag>
        </Link>
      </nav>
      <nav>
        <Link href="/recordings">
          <NavTag>Recordings</NavTag>
        </Link>
      </nav>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  background-image: linear-gradient(-20deg, #312f5d 0%, #194563 100%);
  padding: 1.1rem;
`;

const NavTag = styled.a`
  text-decoration: none;
  border-radius: 0.2rem;
  padding: 0.3rem;
  background-color: #507d96;
  color: #dfdfdf;
  cursor: pointer;

  &:hover {
    background-color: #6791ab;
  }
`;
