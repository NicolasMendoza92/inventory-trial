import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function App({
    Component, pageProps: { session, ...pageProps }
}) {

    return (
        <>
            <Head>
                <title>APP ALLCOT Inventary</title>
                <link rel="icon" href="/allcot_icon.png" sizes="any" />
            </Head>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}
