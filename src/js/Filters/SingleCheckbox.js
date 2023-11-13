import React from 'react';
import styled from 'styled-components';
import { useMapContext } from '../App';
import { useMapFeatureContext } from '../MapFeatures';

const SingleCheckbox = props => {
  const { label, airtable_field_filter, airtable_field_options, selectedFilters, setSelectedFilters } = props;

  const reverseBool = !airtable_field_options.length;

  const isChecked =
    selectedFilters[airtable_field_filter] &&
    (reverseBool ? selectedFilters[airtable_field_filter][0] == 'false' : selectedFilters[airtable_field_filter][0] == 'true');

  const options = reverseBool ? [false] : airtable_field_options;

  return (
    <Label className="filter">
      {options.map(option => (
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
          <label htmlFor={`${airtable_field_filter}-${option}`}>{label}</label>
        </div>
      ))}
    </Label>
  );
};

const Label = styled.div`
  width: 100%;
`;
export default SingleCheckbox;
