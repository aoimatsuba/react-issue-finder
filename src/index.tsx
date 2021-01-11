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
    const token = process.env.REACT_APP_GITHUB_TOKEN
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
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
