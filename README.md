# [Colour Searcher](https://coloursearcher.netlify.app/)

A simple colour searcher that pulls colour data and sort by similarity according to the colour provided.

To [calculate colour similarity](https://github.com/hjpunzalan/colour-searcher/blob/0a75a69de19db310807887cae05e36fbeaa74cfc/src/lib/utils.ts#L5), it utilises the pythagorean theorem in 3D to find the shortest distance from the RGB values of the colour.

[![image](https://user-images.githubusercontent.com/47600145/212788889-f138a700-a124-450f-b00d-ce830d9deedd.png)](https://www.mathsisfun.com/geometry/images/pythagoras-3d-a.svg)

## Objective

To create a single-page website in React that contains a colour search tool. The tool should
operate in the following way:

- Starts by doing a GET request to all colours from the XKCD colours JSON file:
  https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json
- Once the colours are fetched, display them all in a large table containing information
  about each color.
- Allow the user to search the colours by inputting a CSS colour code (Ie. “#FF0000”,
  “rgb(255,0,0)”) and hitting Enter.
- If the inputted colour is valid, sort the colours by their similarity to the inputted
  colour and display the top ~100 results. You will need to think of a good algorithm to
  do this.

Optional bonus functionality:

- If the inputted colour is invalid and the user hits Enter, display an error message
  saying that the colour is invalid.
- If supported by the browser, add a native colour picker to the colour input:
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
- If the initial fetch of the colours fails, show a Retry button that retries the fetch when
  clicked.

_Dependencies_

- [node](https://nodejs.org/en/)

### **Initial Setup**

Run the following when setting up the project for the first time:

```
npm run install
```

### **Daily Development**

Start project

```
npm run dev
```

Start Jest

```
npm run test
```

Start Cypress (Chrome) - differences between browsers is minimal therefore unnecessary

```
npm run cypress:build
```

Git hook Husky will run eslint and prettier per commit

## Stack

- React
- Vite
- Colord
- Styled Components
- Jest
- Cypress

## Style

- Valera Round - https://fonts.google.com/specimen/Varela+Round
