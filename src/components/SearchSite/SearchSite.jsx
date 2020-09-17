import React, { useState } from 'react';
import { Input } from 'chayns-components';
import PropTypes from 'prop-types'; // Look at the bottom, there is an explanation why you shouldnt delete this.
import './searchSite.css';

const SearchSite = (props) => {
    const [SiteName, setSiteName] = useState('');
    const [timeOut, setTimeOut] = useState(0);

    const SearchSiteInput = (e) => {
        setSiteName(e);

        // sets the time after every change to 500ms.
        if (timeOut !== 0) {
            clearTimeout(timeOut);
        }
        setTimeOut(setTimeout(() => {
            props.setSearchString(e);
        }, 500));
    };
    return (
        <div>
            <Input
                className="input"
                laceholder="suchen"
                autogrow
                onChange={(e) => {
                    SearchSiteInput(e);
                }}
                value={SiteName}
            />
        </div>
    );
};

// when you delete this. You will have a problem with the props of this code.
SearchSite.propTypes = {
    setSearchString: PropTypes.string.isRequired,
};

export default SearchSite;
