import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TableOfContents from '../Docs/TOC';
import Sidebar from '../Sidebar';
import Header from '@rocketseat/gatsby-theme-docs/src/components/Header';
import { Wrapper, Main, Title, Children } from './styles';
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Stats,
  Hits,
  connectStateResults
} from 'react-instantsearch-dom'
import PostPreview from '../post-preview'

export default function Layout({
  children,
  disableTableOfContents,
  title,
  headings,
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const disableTOC =
    disableTableOfContents === true || !headings || headings.length === 0;

  function handleMenuOpen() {
    setMenuOpen(!isMenuOpen);
  }

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  const Results = connectStateResults(({ searchState, children }) =>
    searchState && searchState.query ? (
      <div>
        {children}
      </div>
    ) : (
      null
    )
  );


  return (
    <>
      <Sidebar isMenuOpen={isMenuOpen} />
      <Header handleMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
      <Wrapper isMenuOpen={isMenuOpen}>
        <InstantSearch searchClient={searchClient} indexName="rules">
          <SearchBox translations={{
            placeholder: 'Alle Regeln durchsuchen … ',
            resetTitle: 'Eingabe löschen',
            submitTitle: 'Eingabe suchen'
          }} />
          <Results>
            <Stats />
            <Hits hitComponent={PostPreview} />
          </Results>
        </InstantSearch>
        {title && <Title>{title}</Title>}
        <Main disableTOC={disableTOC}>
          {!disableTOC && <TableOfContents headings={headings} />}
          <Children hasTitle={title}>{children}</Children>
        </Main>
      </Wrapper>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  disableTableOfContents: PropTypes.bool,
  title: PropTypes.string,
  headings: PropTypes.array,
};

Layout.defaultProps = {
  disableTableOfContents: false,
  title: '',
  headings: null,
};
