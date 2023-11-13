import React from 'react';
import styled from 'styled-components';
import { AiOutlineDoubleLeft } from 'react-icons/ai';

import Control from '../components/Control';
import Label from '../components/Label';
import { useMapContext } from '../App';
import Filter from './Filter';

export default function Filters({ selectedFilters, setSelectedFilters }) {
  const { filtersOpen, setFiltersOpen, map, filterOptions } = useMapContext();
  return (
    <>
      <ExpandButtonWrapper open={filtersOpen}>
        <ExpandButton
          className="filter__expand"
          open={filtersOpen}
          onClick={() => {
            setFiltersOpen(!filtersOpen);
            setTimeout(() => {
              map.resize();
            }, 0);
          }}
        >
          <AiOutlineDoubleLeft />
        </ExpandButton>
      </ExpandButtonWrapper>
      <FilterContainer open={filtersOpen}>
        <h2 className="filters__heading">Filters</h2>
        {filterOptions.map(filter => {
          if (filter.type === 'label') {
            return <Label key={filter.label} label={filter.label} />;
          }
          return (
            <Filter
              key={filter.airtable_field_filter}
              {...filter}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          );
        })}
      </FilterContainer>
    </>
  );
}

const ExpandButtonWrapper = styled(Control)`
  left: ${({ open }) => (open ? '200px' : '20px')};
  /* top: 5px; */
  width: 30px;
  height: 25px;
`;

const ExpandButton = styled.button`
  background: white;
  display: flex;
  align-items: center;
  justify-contents: center;

  border: 0;
  padding: 0;
  cursor: pointer;
  svg {
    width: 100%;
    transform: ${({ open }) => (open ? 'rotateY(0)' : 'rotateY(180deg)')};
  }
`;

const FilterContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #ecf6f8;
  background: var(--light, #ecf6f8);
  width: 250px;
  flex: 0 0 250px;
  padding: 20px 10px;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  grid-area: filters;
  overflow: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 100%;
  transition: 0.25s;
  /* transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')}; */
  display: ${({ open }) => (open ? 'block' : 'none')};
  > * {
    display: block;
  }
  select {
    display: block;
  }
`;
