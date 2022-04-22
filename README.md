> **Part 1 - React + MUI baseline**
+ [Part 2 - useContext and useState hooks](https://github.com/rosealexander/react-mui-workshop/tree/part2-useContext%26useState)
+ [part 3 - Fetch API and useEffect hook](https://github.com/rosealexander/react-mui-workshop/tree/part3-useEffect+useMemo)
+ [part 4 - MUI component library](https://github.com/rosealexander/react-mui-workshop/tree/part4-MUI)
+ [part 5 - GitHub Pages](https://github.com/rosealexander/react-mui-workshop/tree/part5-GitHub-Pages)

<hr />

### Create React App
This project was bootstrapped with [Create React App](https://create-react-app.dev/docs/getting-started), an opinionated 
toolkit for creating react applications that's bundled with features including a local development server, 
testing framework, preconfigured webpack and buildscripts and much more. To keep things simple, the testing framework 
has been removed.

### Available Scripts
In the project root directory, you can run:

#### `npm install`
This is a npm command that installs all dependencies for this project that are listed in package.json.

#### `npm start`
This command has been added and configured for us by Create React App and will launch our app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
#### `npm run build`
This command has also been provided to us by Create React App and will compile all of our .jsx into regular javascript 
and create a folder `build` that has all the files needed to run in a web browser.

###  Project layout
* [/public ⧉](https://create-react-app.dev/docs/using-the-public-folder/)
  * acm_logo.png
  * favicon.ico
  * index.html
* /src
  * App.js
  * /features
    * Body.jsx
    * Footer.jsx
    * Header.jsx
    * Layout.jsx
    * /theme
      * theme.js
  * index.js
  
- `/public/index.html`  is the page template\
- `/app.js` is a component that acts as a container for all other components.\
- `/src/index.js` is the JavaScript entry point\
- `/src/features/Layout.jsx` a container component wrapping our Header Footer and Body components.\
- `/src/features/theme/theme.js` outlines the color scheme used in the MUI component library.

### MUI configuration
[Material UI](https://mui.com) (MUI) is a React component library styled using the
[Material Design UI framework](https://material.io/design/introduction). MUI is configured in `App.js` by wrapping all
other components within the ThemeProvider component. We can customize the MUI color scheme using the createTheme 
function and passing our customized theme into ThemeProvider using the **theme** prop.

> [continue to Part 2 - useContext and useState hooks](https://github.com/CSUN-ACM/react-mui-workshop/tree/Part2-useContext%26useState)
