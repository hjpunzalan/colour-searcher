import styled from 'styled-components';

interface Props {
  colour: string;
  setColour: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ colour, setColour }: Props) => {
  return (
    <Label>
      Colour
      <input
        type="text"
        name="colour"
        value={colour}
        onChange={(e) => {
          setColour(e.target.value);
        }}
      />
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;
