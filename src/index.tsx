import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: `Bearer e97142affad59e489fe1cefa6172cc25e0d3a6ee`, // This token has only given a permission to view public repos
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
)
