import React from 'react';
import App from 'next/app';
import Head from "next/head";
import "../public/css/tailwind.css";
import "../public/css/main.css";
import 'rc-slider/assets/index.css';

export default class MyApp extends App {
    

    render() {
        const {Component, pageProps} = this.props;

        return (
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>owo</title>
                    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet"></link>
                </Head>
                <Component {...pageProps} />
            </>
        )
    }
}
