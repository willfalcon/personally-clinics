import addOptions from './addOptions';

async function setAllOptions(fieldOptions, field, options) {
  const rawRes = await fetch('/wp-json/clinic-finder/v1/get-fields');
  const fieldJSON = await rawRes.json();
  const acfRaw = await fetch('/wp-json/acf/v3/options/options');
  const acfRes = await acfRaw.json();
  const {
    acf: { filter_options, admin_filters },
  } = acfRes;

  // console.log(fieldJSON);
  Array.from(fieldOptions).forEach(field => {
    const select = field.querySelector('select');
    const value = select.value;
    const options = field.nextElementSibling;
    const optionSelect = options.querySelector('select');
    const savedFilterOptions = filter_options.filter(option => option.airtable_field_filter === value).length
      ? filter_options.filter(option => option.airtable_field_filter === value)[0]?.airtable_field_options
      : admin_filters.filter(option => option.admin_filter_field === value)[0]?.admin_filter_field_values;
    addOptions(optionSelect, fieldJSON[value], savedFilterOptions);
  });
}

export default setAllOptions;
