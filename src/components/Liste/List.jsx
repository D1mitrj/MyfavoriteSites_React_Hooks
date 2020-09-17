/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Button } from 'chayns-components';
import PropTypes from 'prop-types'; // Look at the bottom, there is an explanation why you should not delete this.
import './list.css';

const List = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [siteList, setSiteList] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [listNotShown, setListNotShown] = useState([]);
    const { searchString } = props;

    const showElements = async () => {
        chayns.showWaitCursor();
        // const { searchString } = this.props;
        setSiteList([]);

        try {
            const response = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${props.searchString}&Skip=0&Take=40`);
            const list = await response.json();

            // slices the Data from the fetch to 20 elements.
            setSiteList(list?.Data?.slice(0, 20) || []);
            setListNotShown(list?.Data?.slice(20, 40) || []);
        } catch (error) {
            setSiteList(null);
        }
        chayns.hideWaitCursor();
    };

    // shows on click more
    const showmore = async () => {
        setIsExpanded(true);
        // concat adds an array to another array. https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
        setSiteList(siteList.concat(listNotShown));
    };

    // shows on click less
    const showless = async () => {
        setIsExpanded(false);
        setSiteList(siteList.slice(0, 20));
    };

    const renderButtons = () => {
        if (siteList.length >= 20) {
            return (
                isExpanded
                    ? <Button onClick={showless}>Weniger...</Button>
                    : <Button onClick={showmore}>Mehr...</Button>
            );
        }
        return null;
    };
    // componentdidmount
    useEffect(() => {
        // at the beginning the list should show 20 Sites.
        showElements();
    }, []);
    // componentdidupdate
    useEffect(() => {
        // when the user types a site with the same string will search for it.
        if (searchString !== searchFilter) {
            setSearchFilter(searchString);
            showElements();
        }
    }, [searchString]);

    return (
        <div className="list">
            <div className="sites">
                {siteList?.length > 0
                    ? (
                        // creates the Elements for every fetch.
                        siteList.map((site) => (
                            <div key={site.siteId} onClick={() => window.open(`http://chayns.net/${site.siteId}`)} className="site">
                                <object
                                    className="SiteImage"
                                    data={`https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`}
                                    type="Image/png"
                                >
                                    {/* if an images show "Error 404" a alternative Picture will show up. */}
                                    <img
                                        className="SiteImage"
                                        src="https://chayns.tobit.com/storage/77892-13928/Images/icon-57.png"
                                        alt="fail"
                                    />
                                </object>
                                <p className="site__name">{site.appstoreName}</p>
                            </div>
                        ))
                    )
                    : null}
            </div>
            <div className="buttonDiv">
                {/* changes to the needed button, if the elements shows more or less. */}
                {renderButtons()}
            </div>
        </div>
    );
};

// when you delete this. You will have a problem with the props of this code.
List.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default List;
