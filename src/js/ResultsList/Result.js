import React, { useEffect, useRef } from 'react';
import { useMapContext } from '../App';
import styled from 'styled-components';
import Marker from '../Marker';
import { createRoot } from 'react-dom/client';
import Popup from '../Popup';

export default function Result({ clinic }) {
  const fields = clinic.fields;
  const { includeInfo, filterOptions, mapboxgl, map } = useMapContext();
  const info = includeInfo
    .filter(info => info.include_in_results_list)
    .map(info => {
      const field = info.include_airtable_field;
      const value = fields && fields[field] ? fields[field] : null;
      return {
        label: info.label,
        value,
        field,
      };
    });
  const markerRef = useRef(null);

  useEffect(() => {
    if (!fields) return;
    const placeholder = document.createElement('div');
    const root = createRoot(placeholder);
    root.render(<Popup fields={fields} includeInfo={includeInfo} filterOptions={filterOptions} />);
    const popup = new mapboxgl.Popup({ offset: 25, maxWidth: 350 }).setDOMContent(placeholder);
    const marker = new mapboxgl.Marker().setLngLat(fields.Location.split(',')).setPopup(popup).addTo(map);
    markerRef.current = marker;

    return () => {
      popup.remove();
      marker.remove();
      setTimeout(() => {
        root.unmount();
      });
    };
  }, []);

  return (
    <>
      <Item
        key={clinic.id}
        className="results__item result"
        // active={clinic.id === popup}
        onClick={() => {
          // setPopup(clinic.id);
          const marker = markerRef.current;
          marker.togglePopup();
          //   map.fitBounds(getBounds([clinic.fields.Location.split(','), currentMarkerLocation]), {
          //     padding: {
          //       top: 120,
          //       left: 30,
          //       right: 30,
          //       bottom: 30,
          //     },
          //     maxZoom: 14,
          //   });
        }}
        // onMouseEnter={() => setMarkerHover(clinic.id)}
        // onMouseLeave={() => setMarkerHover(null)}
      >
        {info.map(info => {
          if (info.field === 'Name of Clinic') {
            return (
              <h4 className="result__name" key={info.field}>
                {info.value}
              </h4>
            );
          }
          if (info.field === 'Address') {
            return (
              <address className="result__address" key={info.field}>
                {info.value}
              </address>
            );
          }
          return <p key={info.field}>{info.value}</p>;
        })}
        {clinic.distance && <span className="result__distance">{clinic.distance.toFixed(2)} miles</span>}
      </Item>
    </>
  );
}

const Item = styled.li`
  h4 {
    margin: 0;
    margin-bottom: 0.5rem;
    cursor: pointer;
    text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
    :hover {
      /* text-decoration: underline; */
    }
  }
  li {
    padding: 5px 0;
    border-bottom: 1px solid;
  }
  cursor: pointer;
`;
