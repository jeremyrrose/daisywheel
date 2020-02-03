import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from '../components/shared/Nav.jsx'
import EditArticles from '../components/EditArticles.jsx'
import NewArticle from '../components/NewArticle.jsx'
import EditArticle from '../components/EditArticle.jsx'
import EditSection from '../components/EditSection.jsx'
import EditSections from '../components/EditSections.jsx'
import EditPages from '../components/EditPages.jsx'
import Configuration from '../components/Configuration.jsx'

const Routes = ({ magazine, refresh }) => (
    <BrowserRouter>
        <div className="mainContainer">
            <Nav />
            <Switch>
                <Route
                exact
                path="/"
                render={() => (<></>)}
                />
                <Route
                exact
                path="/new/article/"
                render={props => (<NewArticle {...props} magazine={magazine} />)}
                />
                <Route
                exact
                path="/edit/articles/:id"
                render={props => (<EditArticle {...props} magazine={magazine} />)}
                />
                <Route
                exact
                path="/edit/articles/"
                render={props => (<EditArticles {...props} magazine={magazine} refresh={refresh} />)}
                />
                <Route
                exact
                path="/edit/sections/"
                render={props => (<EditSections {...props} magazine={magazine} refresh={refresh} />)}
                />
                <Route
                exact
                path="/edit/sections/:id"
                render={props => (<EditSection {...props} magazine={magazine} />)}
                />
                <Route
                exact
                path="/edit/pages/"
                render={props => (<EditPages {...props} magazine={magazine} refresh={refresh} />)}
                />
                <Route
                exact
                path="/edit/configuration"
                render={props => (<Configuration {...props} magazine={magazine} refresh={refresh} />)}
                />
            </Switch>
        </div>
    </BrowserRouter>
)

export default Routes;

