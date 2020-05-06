# Election

This is a basic example of a decentralized election being conducted on blockchain.

## Steps to setup the project

### Requirements

Make sure you have npm or yarn installed.

- https://www.npmjs.com/get-npm

- https://classic.yarnpkg.com/en/docs/install/#debian-stable



#### Truffle

A world class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier.

Installation:

`yarn global add truffle`

or 

`npm i -g truffle`

#### Ganache

Ganache is a personal blockchain for rapid Ethereum and Corda distributed application development. You can use Ganache across the entire development cycle; enabling you to develop, deploy, and test your dApps in a safe and deterministic environment.

Installation:

Download the Ganache Desktop App for your OS from https://github.com/trufflesuite/ganache/releases

### Compiling and deploying the smart contract

Run ganache and create a workspace named election.
Go to the folder smart-contract and run truffle migrate command.

`$ cd smart-contract`

`$ truffle migrate`

This should deploy the smart contract on the blockchain simulated by Ganache. 

Copy the deployed address from the terminal once you run truffle migrate command.

Paste the address in the election.json file present in election-client.

`$ cd election-client/src/bridge`

Paste the address in election.json as address parameter.

### Install client dependencies

After cloning this repo go to the election client directory and run `npm i` or `yarn`

`$ cd election-client`

`$ yarn`

This will install all the dependencies required for the react app.

### Running the application

Once the smart contract is deployed and the client dependencies are installed go to the election-client folder and run yarn start.

`$ cd election-client`

`$ yarn start`

Voila your application is running now.