import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router} from 'react-router-dom';


render() {
  console.log(this.state);
  console.log("This is the process.env", process.env.PUBLIC_URL)
  // debugger
  return (
    <div>
      <Route exact path={`/gameover`} component={GameOver} />
      <Route exact path={`/new`} render={ (routerProps) => < NewUser routerProps={routerProps} />} />
      <Route exact path={`/edit`} render={ (routerProps) => < EditUser routerProps={routerProps} />} />
      <Route exact path={`/home`} render={ (routerProps) => < Home routerProps={routerProps} setUpGame={this.setUpGame} />} />
      <Route exact path={`/gametime`} render={ (routerProps) => < QuestionContainer user1Id={this.state.user1Id} user2Id={this.state.user2Id} gameId={this.state.gameId} routerProps={routerProps}/>} />
    </div>
  );
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Commute?</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
