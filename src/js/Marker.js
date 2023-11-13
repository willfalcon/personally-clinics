import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';
import { useMapContext } from './App';
import { useRenderCount } from '@uidotdev/usehooks';

export default function Marker({ distance, fields, id }) {
  const { mapboxgl, map, includeInfo, filterOptions } = useMapContext();
  const renders = useRenderCount();

  useEffect(() => {
    if (!fields) return;
    const placeholder = document.createElement('div');
    const root = createRoot(placeholder);
    root.render(<Popup fields={fields} includeInfo={includeInfo} filterOptions={filterOptions} />);
    const popup = new mapboxgl.Popup({ maxWidth: 350 }).setDOMContent(placeholder);
    const marker = new mapboxgl.Marker().setLngLat(fields.Location.split(',')).setPopup(popup).addTo(map);
    marker.id = id;
    console.log(marker);

    return () => {
      popup.remove();
      marker.remove();
      setTimeout(() => {
        root.unmount();
      });
    };
  }, []);
  return <></>;
}
