import styled from 'styled-components';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function UpdateForm({ onChangeValues, title, lyrics }) {
  const router = useRouter();
  const id = router.query.id;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const updatedTitle = form.title.value.trim();
    const updatedLyrics = form.lyrics.value.trim();

    const updatedSong = {
      title: updatedTitle,
      lyrics: updatedLyrics,
    };

    await fetch(`/api/lyrics/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSong),
    });

    onChangeValues(updatedSong);

    if (updatedTitle.length < 1) {
      toast('u can find a longer title', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'info',
        position: 'top-center',
      });
      return false;
    }

    if (updatedLyrics.length < 3) {
      toast('u can find more words than that', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'info',
        position: 'top-center',
      });
      return false;
    }

    form.reset();
    form.title.focus();
    router.push('/lyrics/collection');
  }

  return (
    <>
      <InputForm onSubmit={handleSubmit}>
        Update your creation :
        <div>
          <label for="title">Title : </label>
          <TitleField
            type="text"
            id="title"
            name="title"
            maxLength="25"
            pattern="[A-Za-z0-9._$%/+-='!]+[A-Za-z0-9._$%/+-='! ]{1,}"
            defaultValue={title}
          />
        </div>
        <div>
          <LyricsField
            type="text"
            placeholder="Keep your ideas rolling!"
            id="lyrics"
            name="lyrics"
            rows="15"
            maxLength="1000"
            defaultValue={lyrics}
          />
        </div>
        <Button>Save ✓</Button>
      </InputForm>
    </>
  );
}

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  border: 0.1rem solid #343434;
  border-radius: 0.3rem;
  padding: 1.3rem;
  margin: 2rem;
`;

const TitleField = styled.input`
  margin-top: 1rem;
  width: 9rem;
`;

const LyricsField = styled.textarea`
  width: 15rem;
  height: 18rem;
  box-shadow: 10px 10px 12px rgba(0, 0, 0, 0.1);
  border: 0.1rem solid #343434;
  border-radius: 0.2rem;
`;

const Button = styled.button`
  width: 5rem;
  height: 2.2rem;
  border-radius: 0.9rem;
  padding: 0.3rem;
  background-color: #2f3061;
  font-family: 'Urbanist', sans-serif;
  font-size: 0.9rem;
  color: #dfdfdf;
  cursor: pointer;
`;
