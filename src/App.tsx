import '@/App.css';
import { useEffect } from 'react';
import 'virtual:fonts.css';

const App = (props: Props) => {
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json'
    ).then(async (res) => {
      const data = await res.json();
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Colour Searcher</h1>
    </div>
  );
};

export default App;
