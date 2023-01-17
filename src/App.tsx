import { colord } from 'colord';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ColourResults } from './components/ColourResults';
import { Stack } from './components/Common';
import { SearchBar } from './components/SearchBar';
import { XKCD_JSON } from './config';
import useDebounce from './hooks/useDebounce';
import { ColourApiResponse, ColourData } from './lib/types';
import { colourDistance, generateRGBHSL } from './lib/utils';

const App = () => {
  const [colours, setColours] = useState<ColourData[]>([]);
  const [colour, setColour] = useState('');

  const searchColour = useDebounce(colour);
  const { data: rawColours, error } = useSWR(
    XKCD_JSON,
    async (url: string) => {
      const res = await fetch(url);
      const data = (await res.json()) as ColourApiResponse;
      // Add rgb and hsl data
      const colourData = generateRGBHSL(data.colors);

      // Set colour group only if its empty (error or initial fetch)
      if (colours.length === 0) {
        setColours(colourData);
      }
      return colourData;
    },
    {
      errorRetryCount: 0
    }
  );

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
    const top100Colours = sortColours.slice(0, 100);
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
