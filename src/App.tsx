import { colord } from 'colord';
import { useEffect, useState } from 'react';
import './App.css';
import { ColourTable } from './components/ColourTable';
import { ColourApiResponse, ColourData } from './lib/types';
const App = () => {
  const [colours, setColours] = useState<ColourData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json'
    )
      .then(async (res) => {
        const data = (await res.json()) as ColourApiResponse;
        const colourData = data.colors.map((c) => {
          return {
            ...c,
            rgb: colord(c.hex).toRgbString(),
            hsl: colord(c.hex).toHslString()
          };
        });
        setColours(colourData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Colour Searcher</h1>
      {colours.length > 0 && <ColourTable colours={colours} />}
    </div>
  );
};

export default App;
