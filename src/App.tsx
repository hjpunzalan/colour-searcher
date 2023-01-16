import { colord } from 'colord';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { ColourTable } from './components/ColourTable';
import { SearchBar } from './components/SearchBar';
import useDebounce from './hooks/useDebounce';
import { ColourApiResponse, ColourData } from './lib/types';
import { colourDistance } from './lib/utils';

const App = () => {
  const [rawColours, setRawColours] = useState<ColourData[]>([]);
  const [colours, setColours] = useState<ColourData[]>([]);
  const [colour, setColour] = useState('');
  const searchColour = useDebounce(colour);

  // Fetch state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let validOrEmpty = colord(searchColour).isValid() || searchColour.length === 0;

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json'
    )
      .then(async (res) => {
        const data = (await res.json()) as ColourApiResponse;

        // Add rgb and hsl data
        const colourData = data.colors.map((c) => {
          return {
            ...c,
            rgb: colord(c.hex).toRgbString(),
            hsl: colord(c.hex).toHslString()
          };
        });
        // Set raw colour group
        setRawColours(colourData);

        // Set colour group
        setColours(colourData);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to fetch colour data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchColour.length === 0) {
      setColours(rawColours);
      return;
    }
    if (colours.length === 0 || !validOrEmpty) return;
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
      <Stack gap="2rem">
        <SearchBar colour={colour} setColour={setColour} />
        <Stack>
          {loading && <p>Loading...</p>}
          {searchColour.length > 0 ? (
            <p>
              Results for <ColourCode>"{searchColour}"</ColourCode>.
            </p>
          ) : (
            'All Colors.'
          )}

          {colours.length > 0 && validOrEmpty && <ColourTable colours={colours} />}
        </Stack>
      </Stack>
    </div>
  );
};

export default App;

const Stack = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || 0};
`;

const ColourCode = styled.span`
  text-transform: uppercase;
`;
