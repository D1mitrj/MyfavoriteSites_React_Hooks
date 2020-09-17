import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import Formular from './Formular/Formular.jsx';
import SearchSite from './SearchSite/searchSite.jsx';
import List from './Liste/List.jsx';
import './app.css';


const App = () =>{
    const [searchString, setSearchString] = useState('ahaus');
    return (
        <div>
            <div className="Titel_texarea">
                <h1>My favorite Sites</h1>
                <SearchSite
                    setSearchString={
                        (e) => setSearchString(e)
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
};

export default App;
export const HotApp = hot(App);
