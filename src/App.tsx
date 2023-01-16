import { useEffect, useState } from "react";
import "virtual:fonts.css";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		fetch(
			"https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json"
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
}

export default App;
