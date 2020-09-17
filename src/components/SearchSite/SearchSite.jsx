import React, { useState } from 'react';
import { Input } from 'chayns-components';
import PropTypes from 'prop-types'; // Look at the bottom, there is an explanation why you shouldnt delete this.
import './search-site.css';

const SearchSite = ({ setSearchString }) => {
    const [siteName, setSiteName] = useState('');
    const [timeOut, setTimeOut] = useState(0);

    const SearchSiteInput = (e) => {
        setSiteName(e);

        // sets the time after every change to 500ms.
        if (timeOut !== 0) {
            clearTimeout(timeOut);
        }
        setTimeOut(setTimeout(() => {
            setSearchString(e);
        }, 500));
    };
    return (
        <div>
            <Input
                className="input"
                placeholder="suchen"
                design={Input.BORDER_DESIGN}
                autogrow
                onChange={(e) => {
                    SearchSiteInput(e);
                }}
                value={siteName}
            />
        </div>
    );
};

// when you delete this. You will have a problem with the props of this code.
SearchSite.propTypes = {
    setSearchString: PropTypes.func.isRequired,
};

export default SearchSite;
