import { Stack } from '@/src/App';
import { colord } from 'colord';
import styled from 'styled-components';
import { ColourData } from '../lib/types';
import { ColourTable } from './ColourTable';

interface Props {
  searchColour: string;
  rawColours?: ColourData[];
  colours: ColourData[];
  error: any;
}

export const ColourResults: React.FC<Props> = ({ searchColour, rawColours, colours, error }) => {
  const isValid = colord(searchColour).isValid();
  const isValidOrEmpty = isValid || searchColour.length === 0;

  if (error) return <ErrorText>Error: unable to source XKCD colour file</ErrorText>;
  if (!rawColours) return <p>Loading...</p>;
  if (!isValidOrEmpty) return <p>"{searchColour}" is not a valid colour code.</p>;
  return (
    <Stack>
      {searchColour.length > 0 ? (
        <p>
          Results for <ColourCode>"{searchColour}"</ColourCode>.
        </p>
      ) : (
        'All Colors.'
      )}
      {colours.length > 0 && isValidOrEmpty && <ColourTable colours={colours} />}
    </Stack>
  );
};

const ColourCode = styled.span`
  text-transform: uppercase;
`;

const ErrorText = styled.p`
  color: red;
`;
