<br />
<div align="center">
  <p style="font-size: 150px">🎡</p>
<h3 style="font-size: 50px" align="center"><b>Charged Particles Playground</b></h3>

  <p align="center">
    A simple and fun way to play with the Charged Particles protocol.
    <br />   
</div>

## Built With
* [Charged Particles](http://charged.fi/)
* [React](https://reactjs.org/)
* [Zustand](https://github.com/pmndrs/zustand)
* [OnboardJS](https://docs.blocknative.com/onboard)

## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites
1. Instal NPM - `npm install -g npm`
2. Metamask account - [Getting Started with MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask)
3. Blocknative API Key - Get a free API Key at [https://www.blocknative.com/](https://www.blocknative.com/)

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/coeu5a/charged-particles-playground.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Add  `.env`
   ```sh
   # Blocknative API Key - https://www.blocknative.com/
   ONBOARD_JS_API_KEY=change-me

   # https://chainid.network
   NETWORK_ID=80001

   # mumbai|kovan|mainnet|polygon
   NETWORK_NAME=mumbai
   ```

### Running
1. Run the application
   ```sh
    yarn start
   ```

