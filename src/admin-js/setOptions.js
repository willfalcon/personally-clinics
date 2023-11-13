import addOptions from './addOptions';

async function setOptions(select, field) {
  const rawRes = await fetch('/wp-json/clinic-finder/v1/get-field-options', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      field,
    }),
  });
  const res = await rawRes.json();
  addOptions(select, res);
}

export default setOptions;
