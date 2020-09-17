import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import Formular from './Formular/Formular.jsx';
import SearchSite from './SearchSite/searchSite.jsx';
import List from './Liste/List.jsx';
import './app.css';


class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            searchString: 'ahaus',
        };
    }

    render() {
        const { searchString } = this.state;
        return (
            <div>
                <div className="Titel_texarea">
                    <h1>My favorite Sites</h1>
                    <SearchSite
                        setSearchString={
                            (e) => this.setState({ searchString: e })
                        }
                    />
                </div>
                <p id="intro">
                    Willkommen bei den Lieblingsseiten. Hier siehst du welche Seiten
                    von Vielen als Lieblingsseite aufgerufen wurde.
                </p>
                <div>
                    <Formular/>
                </div>
                <div>
                    <List searchString={searchString}/>
                </div>
            </div>
        );
    }
}

export default App;
export const HotApp = hot(App);
