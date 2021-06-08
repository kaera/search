Search react app

## Install
To install project dependencies execute the following command:

```sh
yarn
```

## Run application
To run the application use the following command:
```sh
yarn start
```
This command will run two scripts concurrently:
1. `react-scripts start`
2. `node server.js`

The User Interface is running on http://localhost:3000/

A dummy API endpoint is available on the same port.

e.g.
```sh
curl -s http://localhost:3000/search
curl -s http://localhost:3000/search?q=trui
```

## Run tests
To run tests use the following command:
```sh
yarn test
```

## Run storybook
To run storybook use the following command:
```sh
yarn storybook
```
Once you start your Storybook, you'll see that now you have a whole different set of devices to use.
That's possible by adding the Viewport toolbar item which makes it easy to develop responsive UIs.

More details: [here](https://storybook.js.org/docs/ember/essentials/viewport)
