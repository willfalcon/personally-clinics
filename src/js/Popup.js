import React from 'react';
import styled from 'styled-components';
import MarkerIcon from './MarkerIcon';

export default function Popup({ fields, includeInfo, filterOptions }) {
  const iconType = fields?.hasOwnProperty('Type (Icon)') ? fields['Type (Icon)'] : ['default'];
  const info = includeInfo
    .filter(
      info => info.include_in_clinic_popup && info.include_airtable_field !== 'Name of Clinic' && info.include_airtable_field !== 'Address'
    )
    .map(info => {
      const field = info.include_airtable_field;
      const value = fields && fields[field] ? fields[field] : null;
      return {
        label: info.label,
        value,
        field,
      };
    });
  return (
    <StyledPopup wide={(iconType[0] !== 'default').toString()}>
      <PopupContent className="popup location" icon={(iconType !== 'default').toString()}>
        <header className="location__header">
          <h2 className="location__title">{fields['Name of Clinic']}</h2>
          <address className="location__address">{fields.Address}</address>
          <div className="location__icons">
            {iconType.map(
              type =>
                type !== 'default' && (
                  <div className="location__icon" key={type}>
                    <MarkerIcon active={false} current={false} type={type} />
                    <span>{type}</span>
                  </div>
                )
            )}
          </div>
        </header>
        {info.map(info => {
          if (info.field == 'Website') {
            return (
              <React.Fragment key={info.field}>
                <h3 className="location__label">{info.label}</h3>
                <a className="location__website" href={info.value} target="_blank" rel="noopener noreferrer">
                  {info.value}
                </a>
              </React.Fragment>
            );
          }
          if (info.field == 'Phone Number') {
            return (
              <React.Fragment key={info.field}>
                <h3 className="location__label">{info.label}</h3>
                <a className="location__phone" href={`tel:${info.value}`}>
                  {info.value}
                </a>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={info.field}>
              <h3 className="location__label">{info.label}</h3>
              <p className="location__hours">{info.value}</p>
            </React.Fragment>
          );
        })}
        <h3 className="location__label">Services</h3>
        <ul>
          {filterOptions
            .filter(option => {
              const field = fields[option.airtable_field_filter];
              return typeof field === 'boolean' && field && option.type === 'field';
            })
            .map(option => {
              return <li key={option.airtable_field_filter}>{option.label}</li>;
            })}
        </ul>
      </PopupContent>
    </StyledPopup>
  );
}

const StyledPopup = styled.div`
  max-width: 300px;
  max-width: ${({ wide }) => (wide == 'true' ? '350px' : '300px')};
  margin: -10px -10px -15px;
  .mapboxgl-popup-content {
    padding: 0;
  }
`;

const PopupContent = styled.div`
  width: min-content;
  min-width: 250px;
  width: 100%;
  height: 500px;
  overflow: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  .location {
    &__header {
      background: var(--wp--preset--color--dark, #3a0236);
      background: var(--wp--preset--color--dark-pink, #3a0236);
      padding: 18px 24px;
      display: grid;
      grid-template-columns: auto 50px;
      grid-template-rows: auto auto;
    }
    &__icons {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
    &__icon {
      display: block;
      img {
        width: 50px;
        height: 50px;
      }
      span {
        color: white;
        text-align: center;
        display: block;
        font-weight: bold;
      }
    }
    &__title {
      line-height: 1;
      font-family: inherit;
      margin-top: 0;
      margin-bottom: 0;
      color: var(--wp--preset--color--light-pink, #ff7dc2);
      font-weight: 900;
      font-size: 26px;
      grid-column: ${({ icon }) => (icon == 'true' ? '1 / 2' : '1 / 3')};
      grid-row: 1 / 2;
    }
    &__address {
      color: white;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      grid-column: ${({ icon }) => (icon == 'true' ? '1 / 2' : '1 / 3')};
      grid-row: 2 / 3;
    }
    &__website {
      display: block;
    }
  }
  > * {
    padding: 0 21px;
    word-wrap: break-word;
  }
  li {
    margin: 0;
  }
`;
