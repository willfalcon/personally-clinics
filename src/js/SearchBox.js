import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { useMapContext } from './App';
import { debounce } from './utils';

const SearchBox = () => {
  const { viewport, mapboxToken, filtersOpen, map, setLocation } = useMapContext();
  const [results, setResults] = useState([]);

  async function getResults(text) {
    const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(text)}.json`);
    url.searchParams.append('bbox', '-91.68515745242904,30.149666327977258,-88.04647341779015,35.06247754818682');
    url.searchParams.append('access_token', mapboxToken);
    url.searchParams.append('country', 'us');

    const res = await fetch(url.href);
    const results = await res.json();

    if (results) {
      setResults(results.features);
    } else {
      setResults([]);
    }
  }

  const handleChange = e => {
    getResults(e.target.value);
  };

  const inputRef = useRef(null);

  return (
    <>
      <Search className="searchbox" data={{ viewport }} filtersopen={filtersOpen.toString()}>
        <input className="searchbox__input" onChange={debounce(handleChange, 200)} ref={inputRef} placeholder="Search for Clinics" />
      </Search>
      {!!results?.length && (
        <Results filtersopen={filtersOpen.toString()}>
          {results.map(result => {
            return (
              <li
                key={result.id}
                onClick={() => {
                  setResults([]);
                  setLocation(result.center);
                  map.flyTo({ center: result.center });
                  inputRef.current.value = result.place_name;
                }}
              >
                {result.place_name}
              </li>
            );
          })}
        </Results>
      )}
    </>
  );
};

const Results = styled.ul`
  position: absolute;
  top: 75px;

  left: ${({ filtersopen }) => (filtersopen == 'true' ? '260px' : '60px')};
  width: 300px;
  background: white;
  list-style: none;
  padding: 10px;
  box-shadow: ${rgba('black', 0.5)} 0 1px 2px;
  z-index: 4;
  li {
    font-size: 16px;
    border-bottom: 1px solid;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      background: ${rgba('black', 0.2)};
    }
  }
`;
const Search = styled.div`
  width: 300px;
  position: absolute;
  top: 20px;

  left: ${({ filtersopen }) => (filtersopen == 'true' ? '260px' : '60px')};
  /* transform: translateX(-50%); */

  height: 50px;
  display: flex;
  background: white;
  z-index: 4;
  .searchbox {
    &__input {
      padding-left: 5px;
      padding-right: 5px;
      flex: 1 1 auto;
      font-size: 20px;
      border-radius: 5px;
      border-width: 1px;
    }
  }
`;
export default SearchBox;
