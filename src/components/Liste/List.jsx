/* eslint-disable max-len */
import React from 'react';
import { Button } from 'chayns-components';
import PropTypes from 'prop-types'; // Look at the bottom, there is an explanation why you shouldnt delete this.
import './list.css';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            isExpanded: false,
            siteList: [],
            searchFilter: '',
            listNotShown: [],
        };
        // binding methods here.
        this.showless = this.showless.bind(this);
        this.showmore = this.showmore.bind(this);
        this.showElements = this.showElements.bind(this);
    }

    // at the beginning the list should show 20 Sites.
    componentDidMount() {
        this.showElements();
    }

    // when the user types a site with the same string will search for it.
    componentDidUpdate() {
        const { searchString } = this.props;
        const { searchFilter} = this.state;

        if (searchString !== searchFilter) {
            this.setState({ searchFilter: searchString });
            this.showElements();
        }
    }

    async showElements() {
        chayns.showWaitCursor();
        const { searchString } = this.props;
        this.setState({ siteList: [] });

        try {
            // eslint-disable-next-line max-len
            const response = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=0&Take=40`);
            const list = await response.json();

            // slices the Data from the fetch to 20 elements.
            this.setState({ siteList: list.Data.slice(0, 20) });
            this.setState({ listNotShown: list.Data.slice(20, 40) });
        } catch (error) {
            this.setState({ siteList: null });
        }
        chayns.hideWaitCursor();
    }

    // shows on click more
    async showmore() {
        const { listNotShown } = this.state;
        this.setState({
            isExpanded: true,
        });
        this.setState((prevState) => ({
            // concat adds an array to another array. https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
            siteList: prevState.siteList.concat(listNotShown),
        }));
    }

    // shows on click less
    async showless() {
        this.setState({
            isExpanded: false,
        });
        this.setState((prevState) => ({
            siteList: prevState.siteList.slice(0, 20),
        }));
    }

    renderButtons(isExpanded, siteList) {
        if (siteList.length >= 20) {
            return (
                isExpanded
                    ? <Button onClick={this.showless}>Weniger...</Button>
                    : <Button onClick={this.showmore}>Mehr...</Button>
            );
        }
        return null;
    }

    render() {
        const { isExpanded, siteList } = this.state;
        return (
            <div className="list">
                <div className="sites">
                    {siteList.length > 0
                        ? (
                            // creates the Elements for every fetch.
                            siteList.map((site) => (
                                <div onClick={() => window.open(`http://chayns.net/${site.siteId}`)} className="site">
                                    <object className="SiteImage" data={`https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`} type="Image/png">
                                        {/* if an images show "Error 404" a alternative Picture will show up. */}
                                        <img className="SiteImage" src="https://chayns.tobit.com/storage/77892-13928/Images/icon-57.png" alt="fail" />
                                    </object>
                                    <p className="site__name">{site.appstoreName}</p>
                                </div>
                            ))
                        )
                        : null}
                </div>
                <div className="buttonDiv">
                    {/* changes to the needed button, if the elements shows more or less. */}
                    { this.renderButtons(isExpanded, siteList) }
                </div>
            </div>
        );
    }
}

// when you delete this. You will habe a problem with the props of this code.
List.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default List;
