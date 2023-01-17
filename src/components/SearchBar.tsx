import styled from 'styled-components';
import { Row } from '../App';

interface Props {
  colour: string;
  setColour: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}

export const SearchBar: React.FC<Props> = ({ colour, setColour, disabled }) => {
  return (
    <Label htmlFor="colour-search">
      Colour
      <Row gap=".5rem">
        <Input
          data-testid="colour-search"
          disabled={disabled}
          type="text"
          id="colour-search"
          value={colour}
          onChange={(e) => {
            setColour(e.target.value);
          }}
          placeholder="Enter Colour"
        />
        <Input
          data-testid="colour-picker"
          style={{ padding: 0, cursor: 'pointer' }}
          disabled={disabled}
          type="color"
          value={colour}
          onInput={(e) => {
            setColour(e.currentTarget.value);
          }}
          placeholder="Enter Colour"
        />
      </Row>
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
  height: auto;
`;
