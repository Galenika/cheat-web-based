import React from "react";
import Document, { Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
    render () {
        return (
            <html lang='en-US'>
                <Head>
                    <meta name="theme-color" content="#F2801F"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        );
    }
}
