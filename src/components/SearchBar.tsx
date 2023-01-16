import styled from 'styled-components';

interface Props {
  colour: string;
  setColour: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}

export const SearchBar = ({ colour, setColour, disabled }: Props) => {
  return (
    <Label>
      Colour
      <Input
        disabled={disabled}
        type="text"
        name="colour"
        value={colour}
        onChange={(e) => {
          setColour(e.target.value);
        }}
        placeholder="Enter Colour"
      />
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const Input = styled.input`
  padding: 0.65em 1em;
  border-radius: 5px;
  border: 1px solid lightgrey;
`;
