import React from 'react';
import { Input } from 'chayns-components';
import PropTypes from 'prop-types'; // Look at the bottom, there is an explanation why you shouldnt delete this.
import './searchSite.css';

class searchSite extends React.Component {
    constructor() {
        super();
        this.state = {
            SiteName: '',
            timeout: null,
        };
        // binding methods here.
        this.searchSite = this.searchSite.bind(this);
    }

    searchSite(e) {
        const { setSearchString } = this.props;
        const { timeout } = this.state;
        this.setState({ SiteName: e });

        // sets the time after every change to 500ms.
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        this.setState({
            timeout:
                setTimeout(() => {
                    console.log(timeout);
                    setSearchString(e);
                }, 500),
        });
    }

    render() {
        const { SiteName } = this.state;
        return (
            <div>
                <Input className="input" placeholder="suchen" autogrow onChange={(e) => { this.searchSite(e); }} value={SiteName}/>
            </div>
        );
    }
}

// when you delete this. You will habe a problem with the props of this code.
searchSite.propTypes = {
    setSearchString: PropTypes.string.isRequired,
};

export default searchSite;
