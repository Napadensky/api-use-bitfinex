# Challenge Rather Lab

## == Stack ==

- Node.js v16
- Test: jest
- config: dotenv
- Http: express.js
- pino: logging
- linter: tslint

## == Comands ==

- install dependencies

```cmd
 npm install
```

- to run the project

```cmd
 npm run dev
```

- to run the test

```cmd
 npm run test
```

- to run the linter

```cmd
 npm run lint
```

## == Endpoint ==

- welcome to api

```cmd
http://localhost:3000/
```

- ej: http://localhost:3000/market/tBTCUSD/BUY/0.5 (opertarion BUY or SELL)

```cmd
http://localhost:3000/market/:pair/:operation/:ammount/
```

- ej: http://localhost:3000/market/tBTCUSD/BUY/0.5/limit/100 (opertarion BUY or SELL)

```cmd
http://localhost:3000/market/:pair/:operation/:ammount/limit/:limit
```

- ej: http://localhost:3000/orders/tBTCUSD

```cmd
http://localhost:3000/:pair/prices
```

## == Recommendation ==

I recommend to install an extension to test the enpoints requested by the challenge

Name: REST Client
Id: humao.rest-client
Description: REST Client for Visual Studio Code
Version: 0.25.1
Publisher: Huachao Mao
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=humao.rest-client

In "./src" I proposed to create a folder ("./src/**http**" ) to create \*.http files configured for easy execution.
