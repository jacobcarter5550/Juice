import '../styles/globals.css'
import { ApolloClient, NormalizedCacheObject, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux'
import { store } from '../components/Redux/store'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://hub.snapshot.org/graphql',
  });

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
