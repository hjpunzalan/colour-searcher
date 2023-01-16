import { Stack } from '@/src/App';
import { colord } from 'colord';
import styled from 'styled-components';
import { useSWRConfig } from 'swr';
import { XKCD_JSON } from '../config';
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
  const { mutate } = useSWRConfig();

  if (error)
    return (
      <Stack>
        <ErrorText>Error: unable to source XKCD colour file</ErrorText>
        <Button
          onClick={() => {
            // https://swr.vercel.app/docs/mutation#revalidation
            // mutate will revalidate fetch
            mutate(XKCD_JSON);
          }}
        >
          Refetch
        </Button>
      </Stack>
    );
  if (!rawColours) return <p>Loading...</p>;
  if (!isValidOrEmpty) return <p>"{searchColour}" is not a valid colour code.</p>;
  return (
    <Stack gap="1rem">
      {searchColour.length > 0 ? (
        <p>
          Results for <ColourCode>"{searchColour}"</ColourCode>.
        </p>
      ) : (
        'All Colours.'
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

const Button = styled.button`
  width: fit-content;
  padding: 0.5em 2em;
  cursor: pointer;
`;
