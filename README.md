# TinyApp
A tiny tutorial for a friend learning React who, like many, hates the initial setup required to get up and running and writing code.

Also for those who sometimes feel like developing on their Windows machine between matches in Dota 2, League, Overwatch, etc. :)

Follow this tutorial or clone this repo to get started with using the following technologies:
* ES6
* React
* webpack
* webpack-dev-server (with live reloading!)

## Install Node.js for Windows
Download the latest version of Node.js from https://nodejs.org/en/

Once it's installed, open up the Node.js command prompt.

![alt text](images/nodejs_command_prompt.png)

## Create your project directory
In your command prompt:

`cd Desktop`  
`mkdir TinyApp`  
`cd TinyApp`  

Open up the project in your favorite IDE.

## Setup your package.json file
Initialize using the the command:

`npm init --yes`

This will create a `package.json` file for you.

You will need the following packages:
* react
* react-dom
* babel-core
* babel-loader
* babel-preset-react
* babel-preset-es2015
* babel-preset-stage-0
* webpack
* webpack-dev-server

Run the following in the command prompt to install them all:

`npm i -S react react-dom babel-core babel-loader babel-preset-react babel-preset-es2015 babel-preset-stage-0 webpack webpack-dev-server`

`npm i -S` is shorthand for `npm install --save`

Also add the following line to your `package.json` "scripts":

`"dev": "webpack-dev-server --inline"`

We'll use this script at the end of the tutorial to start up our server.

The whole file should look like this now:

```
{
  "name": "TinyApp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --inline"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-core": "^6.21.0",
    "babel-loader": "^6.2.10",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "babel-preset-stage-0": "^6.16.0",
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "webpack": "^1.14.0",
    "webpack-dev-server": "^1.16.2"
  }
}
```

## Create webpack.config.js file
In your project's root directory, create a file named `webpack.config.js`, and copy into it the following code:

```
var path = require('path');

module.exports = {
  entry: './app/entry.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
```

There's a ton of different things you're allowed to configure here depending on what packages you want to include in your project. This is the most simple version I could come up with. Accept that you'll have to just copy this file from somewhere for a while.

## Create index.html file
In your project's root directory, create a file named `index.html`, and copy into it the following code:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Tiny App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="assets/bundle.js"></script>
  </body>
</html>
```

`<div id="root"></div>` is the root DOM element that your React app will be attached to.

`assets/bundle.js` is the bundled file served by webpack-dev-server that will be updated and injected into the running app whenever you save changes. This should only be used for development. You'll notice that this file is not actually created in your project directory.

webpack-dev-server is a little Node.js Express server, which uses webpack-dev-middleware to serve a webpack bundle. You can read more about it in the official docs: https://webpack.github.io/docs/webpack-dev-server.html

If you want to create the `bundle.js` file for production, just run `webpack` in your terminal and, in this example, you should see it in `build/bundle.js`.

## Create app/entry.js file
Create a new folder inside your project called `app`. Inside `app` create a file named `entry.js`. This is the entry point for webpack, where you'll start writing your React app. Copy the following code into the file:

```
import React from 'react'
import ReactDOM from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>Hey, it works! Nice!</div>,
    document.getElementById('root')
  )
})
```

## Start webpack-dev-server
In your Node.js command prompt, run `npm run dev` to start up your webpack-dev-server. We defined the `"dev"` script earlier in our `package.json` file to run the command `webpack-dev-server --inline`.

The `--inline` option makes our browser automatically refresh when we save changes!

Visit `http://localhost:8080/` to see your app. You should see `"Hey, it works! Nice!"`. Change the text inside `entry.js`, save, and see if your browser automatically refreshes. If it does, everything should be set up correctly.

If it doesn't work you might need to install webpack globally using the command `npm install -g webpack`.

You're good to go! Happy coding!
