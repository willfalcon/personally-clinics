import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SingleCheckbox from './SingleCheckbox';
import { useMapContext } from '../App';
import { useMapFeatureContext } from '../MapFeatures';

const Filter = props => {
  const { label, airtable_field_filter, airtable_field_options, selectedFilters, setSelectedFilters } = props;

  const trueFalse = (airtable_field_options.length == 1 && airtable_field_options[0] == 'true') || !airtable_field_options.length;
  if (trueFalse) {
    return <SingleCheckbox {...props} />;
  }

  return (
    <Label
      className="filter"
      // typeBoolean={trueFalse}
    >
      <legend>{label}</legend>

      {airtable_field_options.map(option => {
        const isChecked = selectedFilters[airtable_field_filter] && selectedFilters[airtable_field_filter][0] == option;

        return (
          <div key={option} data-checked={isChecked}>
            <input
              type="checkbox"
              value={option}
              key={option}
              name={airtable_field_filter}
              className="filter__option"
              id={`${airtable_field_filter}-${option}`}
              onChange={e => {
                const { checked, value } = e.target;
                if (checked) {
                  const arr = selectedFilters[airtable_field_filter] ? selectedFilters[airtable_field_filter] : [];

                  setSelectedFilters({
                    ...selectedFilters,
                    [airtable_field_filter]: [...arr, value],
                  });
                } else {
                  setSelectedFilters({
                    ...selectedFilters,
                    [airtable_field_filter]: selectedFilters[airtable_field_filter].filter(item => item !== value),
                  });
                }
              }}
            />
            <label htmlFor={`${airtable_field_filter}-${option}`}>{option}</label>
          </div>
        );
      })}
    </Label>
  );
};

const Label = styled.fieldset`
  width: 100%;
`;

export default Filter;
