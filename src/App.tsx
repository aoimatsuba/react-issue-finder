import React from 'react'
import { Container } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom'
import Filters from './components/filters/Filters'
import NavigationBar from './components/navigationBar/NavigationBar'
import Result from './components/Result'
import ItemDetail from './ItemDetail/ItemDetail'

const App: React.FunctionComponent = () => {
    return (
        <>
            <NavigationBar />
            <Container>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/detail/:id" component={ItemDetail} />
                </Switch>
            </Container>
        </>
    )
}

const Home = () => {
    return (
        <div className="App">
            <Filters />
            <Result />
        </div>
    )
}

export default App
