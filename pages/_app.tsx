import '../styles/globals.css'
import { useEffect } from 'react';
import { ApolloClient, NormalizedCacheObject, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux'
import { store } from '../components/Redux/store'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://hub.snapshot.org/graphql',
  });

  useEffect(()=>{
    const whiteList = localStorage.getItem('whiteList')
    const blackList = localStorage.getItem('blackList')

    if(whiteList == null) {
      localStorage.setItem('whiteList', JSON.stringify([]))
    }
    if(blackList== null) {
      localStorage.setItem('blackList', JSON.stringify([]))
    }
  },[])

  return(<Provider store={store}>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000"/>
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>)
}

export default MyApp
