import { colord } from 'colord';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { ColourResults } from './components/ColourResults';
import { SearchBar } from './components/SearchBar';
import useDebounce from './hooks/useDebounce';
import { ColourApiResponse, ColourData } from './lib/types';
import { colourDistance } from './lib/utils';

const App = () => {
  const [colours, setColours] = useState<ColourData[]>([]);
  const [colour, setColour] = useState('');
  const searchColour = useDebounce(colour);
  const { data: rawColours, error } = useSWR('/api/xkcd-colors.json', async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json'
    );
    const data = (await res.json()) as ColourApiResponse;
    // Add rgb and hsl data
    const colourData = data.colors.map((c) => {
      return {
        ...c,
        rgb: colord(c.hex).toRgbString(),
        hsl: colord(c.hex).toHslString()
      };
    });

    // Set colour group
    setColours(colourData);
    return colourData;
  });

  useEffect(() => {
    if (!rawColours) return;
    if (searchColour.length === 0) {
      setColours(rawColours);
      return;
    }
    // If not a valid colour code then return
    if (!colord(searchColour).isValid()) return;

    // Sort colours only if valid
    const sortColours = [...rawColours];
    sortColours.sort((a, b) => {
      const aColourDistance = colourDistance(searchColour, a.hex);
      const bColourDistance = colourDistance(searchColour, b.hex);
      return aColourDistance > bColourDistance ? 1 : -1;
    });
    const top100Colours = sortColours.slice(0, 99);
    setColours(top100Colours);
  }, [searchColour]);

  return (
    <div className="App">
      <h1>Colour Searcher</h1>
      <Stack gap="3rem">
        <SearchBar disabled={!rawColours || error} colour={colour} setColour={setColour} />
        <ColourResults
          error={error}
          searchColour={searchColour}
          rawColours={rawColours}
          colours={colours}
        />
      </Stack>
    </div>
  );
};

export default App;

export const Stack = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || 0};
`;

export const Row = styled.div<{ gap?: string }>`
  display: flex;
  align-items: stretch;
  gap: ${(props) => props.gap || 0};
`;
