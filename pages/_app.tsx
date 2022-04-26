import '../styles/globals.css'
import { ApolloClient, NormalizedCacheObject, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux'
import { store } from '../components/Redux/store'

function MyApp({ Component, pageProps }) {

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://hub.snapshot.org/graphql',
  });

  return(<Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>)
}

export default MyApp
