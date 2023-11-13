import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { useMapContext } from '../App';
import arrow from '../icons/hand-drawn-arrow.png';
import Result from './Result';

const ResultsList = ({ className, clinics, message }) => {
  const { resultsCTA } = useMapContext();

  return (
    <Results className={className}>
      <h3 className="results__heading">Results</h3>
      {resultsCTA?.text && (
        <div className="results__cta">
          {resultsCTA?.link ? (
            <a href={resultsCTA.link.url}>
              {resultsCTA.text}
              <span className="arrow-button">
                <img src={arrow} />
              </span>
            </a>
          ) : (
            <p>{resultsCTA.text}</p>
          )}
        </div>
      )}
      <ul className="results__list">
        {clinics.map(clinic => (
          <Result key={clinic.id} clinic={clinic} />
        ))}
      </ul>
    </Results>
  );
};

const Results = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  grid-area: results;
  overflow-y: scroll;
  width: 250px;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 10px;
  background: white;
  z-index: 4;
  height: 100%;

  .results {
    &__list {
      padding: 0;
      list-style: none;
    }
  }
`;

export default ResultsList;
