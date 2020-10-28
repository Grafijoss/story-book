/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

import { v4 as uuid } from 'uuid';


import useFilterDropdown from '~hooks/useFilterDropdown';

import useFilteredData from '~hooks/useFilteredData';


import { isEmpty } from '~utils/core';


const TestFilterDropdown = ({

    name, label, dropdownApi, ...rest

}) => {

    const isDiscriminatorActive = dropdownApi.isDiscriminatorActive(name);


    const onDropdownContainerClicked = () => {

        dropdownApi.toggleDiscriminatorPanel(name);

    };


    const selectedValues = dropdownApi.getSelectedDiscriminatorsValuesByName(name);


    return (

        <div

            id="TestFilterDropdown"

            data-expanded={isDiscriminatorActive && dropdownApi.isOpen}

            onClick={onDropdownContainerClicked}

            data-testid={rest['data-testid']}

            data-selected-values={selectedValues.join(',')}

        >

            {label}

        </div>

    );

};


const TestFilterDropdownMenu = ({

    mobile,

    name,

    items,

    getItemLabel,

    getItemDiscriminatorValue,

    placeholderTestId,

    getItemTestId,

    dropdownApi,

    placeholderLabel = 'All',

    applyButtonTestId,

    ...rest

}) => {

    const dropdownMenuApi = dropdownApi.getDropdownMenu(name);


    const discriminator = dropdownApi.getDiscriminatorByName(name);

    const variant = discriminator.canChooseMultipleValues ? 'multiple-value' : 'single-value';


    if (!mobile && !dropdownMenuApi.isActive) {

        return null;

    }


    const onApplyClicked = () => {

        dropdownApi.applyDiscriminators();

    };


    return (

        <div id="TestFilterDropdownMenu" data-testid={rest['data-testid']}>

            <ul>

                <li data-variant={variant}>

                    <button

                        type="button"

                        data-variant={variant}

                        data-active={dropdownMenuApi.placeholderSelected}

                        onClick={dropdownMenuApi.placeholderClickHandler}

                        data-testid={placeholderTestId}

                    >

                        {placeholderLabel}

                    </button>

                </li>


                {items.map((item) => {

                    const onButtonClicked = () => {

                        dropdownApi.toggleDiscriminatorValue({

                            discriminatorName: name,

                            value: getItemDiscriminatorValue(item),

                        });

                    };


                    const selected = dropdownApi.isDiscriminatorValueSelected({

                        discriminatorName: name,

                        value: getItemDiscriminatorValue(item),

                    });


                    return (

                        <li key={uuid()} data-variant={variant}>

                            <button

                                type="button"

                                data-variant={variant}

                                data-active={selected}

                                onClick={onButtonClicked}

                                data-testid={getItemTestId(item)}

                            >

                                {getItemLabel(item)}

                            </button>

                        </li>

                    );

                })}

            </ul>


            {!mobile && (

                <button type="button" onClick={onApplyClicked} data-testid={applyButtonTestId}>

                    Apply

                </button>

            )}

        </div>

    );

};


const TestMobileFilterDropdownModalToggler = ({ dropdownApi, children, ...rest }) => (

    <button id="TestMobileFilterDropdownModalToggler" type="button" onClick={dropdownApi.toggleVisibility} {...rest}>

        {children}

    </button>

);


const TestModal = ({ dropdownApi, children }) => (

    <div id="TestModal" data-visible={dropdownApi.isOpen}>

        <button type="button" onClick={dropdownApi.toggleVisibility}>Close</button>

        {dropdownApi.isOpen && children}

    </div>

);


// Test Implementations of the dropdowns. Please try to keep them in sync when changing the real

// ones. Our goal here is to test behavior and not styling. If you wanna assert if something is

// visible or not, please do that in the specific component since these are solely for testing the

// dropdown hook 👇🏻.


const TournamentsFilterDropdown = ({ games, dates }) => {

    const getGameTitle = game => game.alias || game.title;


    const gameNames = games.map(getGameTitle);


    const { mobileApi, desktopApi } = useFilterDropdown({

        name: 'filterTournaments',

        placeholderLabel: 'all',

        discriminators: [

            {

                name: 'games',

                possibleValues: gameNames,

                canChooseMultipleValues: true,

            },

            {

                name: 'date',

                possibleValues: dates,

                canChooseMultipleValues: false,

            },

        ],

    });


    return (

        <>

            <TestMobileFilterDropdownModalToggler dropdownApi={mobileApi} data-testid="TournamentsFilterDropdown__MobileModalToggler">

                Filter

            </TestMobileFilterDropdownModalToggler>


            <div>

                {global.innerWidth > 600 && (

                    <div id="TestFilterDropdownLayout">

                        <TestFilterDropdown

                            name="games"

                            label="Game"

                            dropdownApi={desktopApi}

                            data-testid="TournamentsFilterDropdown__GamesDropdown"

                        />


                        <TestFilterDropdown

                            name="date"

                            label="Date"

                            dropdownApi={desktopApi}

                            data-testid="TournamentsFilterDropdown__DatesDropdown"

                        />

                    </div>

                )}


                {global.innerWidth > 600 && (

                    <div

                        data-state={desktopApi.isOpen ? 'visible' : 'hidden'}

                        data-testid="TournamentsFilterDropdown__DropdownMenusContainer"

                    >

                        <TestFilterDropdownMenu

                            name="games"

                            items={games}

                            getItemLabel={getGameTitle}

                            getItemDiscriminatorValue={getGameTitle}

                            placeholderTestId="TournamentsFilterDropdown__GameDropdownMenuOption__placeholder"

                            getItemTestId={game => `TournamentsFilterDropdown__GameDropdownMenuOption__${getGameTitle(game)}`}

                            dropdownApi={desktopApi}

                            data-testid="TournamentsFilterDropdown__GamesDropdownMenu"

                            applyButtonTestId="TournamentsFilterDropdown__GamesDropdownMenu__apply-button"

                        />


                        <TestFilterDropdownMenu

                            name="date"

                            items={dates}

                            getItemLabel={x => x}

                            getItemDiscriminatorValue={x => x}

                            placeholderTestId="TournamentsFilterDropdown__DatesDropdownMenuOption__placeholder"

                            getItemTestId={date => `TournamentsFilterDropdown__DatesDropdownMenuOption__${date}`}

                            dropdownApi={desktopApi}

                            data-testid="TournamentsFilterDropdown__DatesDropdownMenu"

                            applyButtonTestId="TournamentsFilterDropdown__DatesDropdownMenu__apply-button"

                        />

                    </div>

                )}

            </div>


            <TestModal dropdownApi={mobileApi}>

                <div data-testid="TournamentsFilterDropdown__ModalContent">

                    <div id="TestFilterDropdownMenuContainer">

                        <header id="TestMobileFilterDropdown">Games</header>


                        <TestFilterDropdownMenu

                            mobile

                            name="games"

                            items={games}

                            getItemLabel={getGameTitle}

                            getItemDiscriminatorValue={getGameTitle}

                            placeholderTestId="TournamentsFilterDropdown__GameDropdownMenuOption__placeholder"

                            getItemTestId={game => `TournamentsFilterDropdown__GameDropdownMenuOption__${getGameTitle(game)}`}

                            dropdownApi={desktopApi}

                            data-testid="TournamentsFilterDropdown__GamesDropdownMenu"

                        />

                    </div>


                    <div id="TestFilterDropdownMenuContainer">

                        <header id="TestMobileFilterDropdown">Category</header>


                        <TestFilterDropdownMenu

                            mobile

                            name="date"

                            items={dates}

                            getItemLabel={x => x}

                            getItemDiscriminatorValue={x => x}

                            placeholderTestId="TournamentsFilterDropdown__DatesDropdownMenuOption__placeholder"

                            getItemTestId={date => `TournamentsFilterDropdown__DatesDropdownMenuOption__${date}`}

                            dropdownApi={desktopApi}

                            data-testid="TournamentsFilterDropdown__DatesDropdownMenu"

                        />

                    </div>

                </div>


                <button type="button" onClick={mobileApi.applyDiscriminators} data-testid="TournamentsFilterDropdown__apply-button">

                    Apply

                </button>

            </TestModal>

        </>

    );

};


const AllNewsFilterDropdown = ({ games, newsTypes }) => {

    const getGameTitle = game => game.alias || game.title;

    const getArticleCategoryName = category => category.name;


    const gameTitles = games.map(getGameTitle);

    const categoriesNames = newsTypes.map(getArticleCategoryName);


    const { mobileApi, desktopApi } = useFilterDropdown({

        name: 'filterAllNews',

        placeholderLabel: 'all',

        discriminators: [

            {

                name: 'games',

                possibleValues: gameTitles,

                canChooseMultipleValues: true,

            },

            {

                name: 'types',

                possibleValues: categoriesNames,

                canChooseMultipleValues: true,

            },

        ],

    });


    return (

        <>

            <TestMobileFilterDropdownModalToggler dropdownApi={mobileApi} data-testid="NewsFilterDropdown__MobileModalToggler">

                Filter

            </TestMobileFilterDropdownModalToggler>


            <div>

                <div>

                    <TestFilterDropdown

                        name="games"

                        label="Games"

                        dropdownApi={desktopApi}

                        data-testid="NewsFilterDropdown__GamesDropdown"

                    />


                    <TestFilterDropdown

                        name="types"

                        label="Category"

                        dropdownApi={desktopApi}

                        data-testid="NewsFilterDropdown__CategoriesDropdown"

                    />

                </div>


                <div

                    data-state={desktopApi.isOpen ? 'visible' : 'hidden'}

                    data-testid="NewsFilterDropdown__DropdownMenusContainer"

                >

                    <TestFilterDropdownMenu

                        name="games"

                        items={games}

                        getItemLabel={getGameTitle}

                        getItemDiscriminatorValue={getGameTitle}

                        placeholderTestId="NewsFilterDropdown__GameDropdownMenuOption__placeholder"

                        getItemTestId={game => `NewsFilterDropdown__GameDropdownMenuOption__${getGameTitle(game)}`}

                        dropdownApi={desktopApi}

                        data-testid="NewsFilterDropdown__GamesDropdownMenu"

                        applyButtonTestId="NewsFilterDropdown__GamesDropdownMenu__apply-button"

                    />


                    <TestFilterDropdownMenu

                        name="types"

                        items={newsTypes}

                        getItemLabel={getArticleCategoryName}

                        getItemDiscriminatorValue={getArticleCategoryName}

                        placeholderTestId="NewsFilterDropdown__CategoryDropdownMenuOption__placeholder"

                        getItemTestId={article => `NewsFilterDropdown__CategoryDropdownMenuOption__${getArticleCategoryName(article)}`}

                        dropdownApi={desktopApi}

                        data-testid="NewsFilterDropdown__CategoriesDropdownMenu"

                        applyButtonTestId="NewsFilterDropdown__CategoriesDropdownMenu__apply-button"

                    />

                </div>

            </div>


            <TestModal dropdownApi={mobileApi}>

                <div data-testid="NewsFilterDropdown__ModalContent">

                    <div id="TestFilterDropdownMenuContainer">

                        <header id="TestMobileFilterDropdown">Games</header>


                        <TestFilterDropdownMenu

                            mobile

                            name="games"

                            items={games}

                            getItemLabel={getGameTitle}

                            getItemDiscriminatorValue={getGameTitle}

                            placeholderTestId="NewsFilterDropdown__GameDropdownMenuOption__placeholder"

                            getItemTestId={game => `NewsFilterDropdown__GameDropdownMenuOption__${getGameTitle(game)}`}

                            dropdownApi={desktopApi}

                            data-testid="NewsFilterDropdown__GamesDropdownMenu"

                        />

                    </div>


                    <div id="TestFilterDropdownMenuContainer">

                        <header id="TestMobileFilterDropdown">Category</header>


                        <TestFilterDropdownMenu

                            mobile

                            name="types"

                            items={newsTypes}

                            getItemLabel={getArticleCategoryName}

                            getItemDiscriminatorValue={getArticleCategoryName}

                            placeholderTestId="NewsFilterDropdown__CategoryDropdownMenuOption__placeholder"

                            getItemTestId={article => `NewsFilterDropdown__CategoryDropdownMenuOption__${getArticleCategoryName(article)}`}

                            dropdownApi={desktopApi}

                            data-testid="NewsFilterDropdown__CategoriesDropdownMenu"

                        />

                    </div>

                </div>


                <button type="button" onClick={mobileApi.applyDiscriminators} data-testid="NewsFilterDropdown__apply-button">

                    Apply

                </button>

            </TestModal>

        </>

    );

};


const WronglyImplementedAllNewsFilterDropdown = ({ games, newsTypes }) => {

    const getGameTitle = game => game.alias || game.title;

    const getArticleCategoryName = category => category.name;


    const gameTitles = games.map(getGameTitle);

    const categoriesNames = newsTypes.map(getArticleCategoryName);


    useFilterDropdown({

        placeholderLabel: 'all',

        discriminators: [

            {

                name: 'games',

                possibleValues: gameTitles,

                canChooseMultipleValues: true,

            },

            {

                name: 'types',

                possibleValues: categoriesNames,

                canChooseMultipleValues: true,

            },

        ],

    });


    return null;

};


const WronglyImplementedAllNewsFilterDropdown2 = () => {

    useFilterDropdown({

        placeholderLabel: 'all',

        name: 'filterAllNews',

    });


    return null;

};


const DataGrid = ({ items, getItemLabel, ...rest }) => (

    <ul id="DataGrid" {...rest}>

        {items.map(item => (

            <li key={uuid()} data-testid={item.id}>

                {getItemLabel(item)}

            </li>

        ))}

    </ul>

);


export const PlayPage = ({ initialData, onFetchMore, onFilterChanged }) => {

    const filterName = 'filterTournaments';


    const { data, loading, error } = useFilteredData({

        name: filterName,

        initialData,

        onFetchMore,

        onFilterChanged,

    });


    return (

        <section id="PlayPage">

            <TournamentsFilterDropdown

                games={initialData.games}

                dates={['Today', 'This Week', 'Next Week', 'Within a month']}

            />

            {!isEmpty(data.tournaments) && (

                <>

                    <DataGrid

                        items={data.tournaments}

                        getItemLabel={tournament => tournament.name}

                        data-testid="tournaments-list"

                    />

                    <button type="button">Load More</button>

                </>

            )}

            {loading && <p>Loading</p>}

            {error && error.message}

        </section>

    );

};


export const AllNewsPage = ({ initialData, onFetchMore, onFilterChanged }) => {

    const filterName = 'filterAllNews';


    const { data, loading, error } = useFilteredData({

        name: filterName,

        initialData,

        onFetchMore,

        onFilterChanged,

    });


    return (

        <section id="AllNewsPage">

            <AllNewsFilterDropdown games={data.games} newsTypes={data.newsTypes} />

            {!isEmpty(data.news) && (

                <>

                    <DataGrid

                        items={data.news}

                        getItemLabel={article => article.name}

                        data-testid="articles-list"

                    />

                    <button type="button">Load More</button>

                </>

            )}

            {loading && <p>Loading</p>}

            {error && error.message}

        </section>

    );

};


export const AllNewsPageWithWronglyImplementedDropdown = ({

    initialData, onFetchMore, onFilterChanged,

}) => {

    const filterName = 'filterAllNews';


    const { data, loading, error } = useFilteredData({

        name: filterName,

        initialData,

        onFetchMore,

        onFilterChanged,

    });


    return (

        <section id="AllNewsPage">

            <WronglyImplementedAllNewsFilterDropdown games={data.games} newsTypes={data.newsTypes} />

            {!isEmpty(data.news) && (

                <>

                    <DataGrid

                        items={data.news}

                        getItemLabel={article => article.name}

                        data-testid="articles-list"

                    />

                    <button type="button">Load More</button>

                </>

            )}

            {loading && <p>Loading</p>}

            {error && error.message}

        </section>

    );

};


export const AllNewsPageWithWronglyImplementedDropdown2 = ({

    initialData, onFetchMore, onFilterChanged,

}) => {

    const filterName = 'filterAllNews';


    const { data, loading, error } = useFilteredData({

        name: filterName,

        initialData,

        onFetchMore,

        onFilterChanged,

    });


    return (

        <section id="AllNewsPage">

            <WronglyImplementedAllNewsFilterDropdown2 games={data.games} newsTypes={data.newsTypes} />

            {!isEmpty(data.news) && (

                <>

                    <DataGrid

                        items={data.news}

                        getItemLabel={article => article.name}

                        data-testid="articles-list"

                    />

                    <button type="button">Load More</button>

                </>

            )}

            {loading && <p>Loading</p>}

            {error && error.message}

        </section>

    );

};