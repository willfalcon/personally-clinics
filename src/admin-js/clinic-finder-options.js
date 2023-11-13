import addOptions from './addOptions';
import setOptions from './setOptions';
import setAllOptions from './setAllOptions';

const filterOptionsRepeater = document.querySelector(`[data-name="filter_options"]`);
const fieldOptions = filterOptionsRepeater.querySelectorAll(`.acf-field[data-name="airtable_field_filter"]`);

const adminFilterOptionsRepeater = document.querySelector(`[data-name="admin_filters"]`);
const adminFilterFields = adminFilterOptionsRepeater.querySelectorAll(`.acf-field[data-name="admin_filter_field"]`);

setAllOptions(fieldOptions, 'airtable_field_filter', 'airtable_field_options');
setAllOptions(adminFilterFields, 'admin_filter_field', 'admin_filter_field_values');

Array.from(fieldOptions).forEach(option => {
  const select = option.querySelector('select');
  const value = select.value;
  const options = option.nextElementSibling;
  const optionSelect = options.querySelector('select');
  select.addEventListener('change', e => {
    setOptions(optionSelect, e.target.value);
  });
});

Array.from(adminFilterFields).forEach(option => {
  const select = option.querySelector('select');
  const options = option.nextElementSibling;
  const optionSelect = options.querySelector('select');
  select.addEventListener('change', e => {
    setOptions(optionSelect, e.target.value);
  });
});

const listParent = filterOptionsRepeater.querySelector('.acf-table tbody');
const observer = new MutationObserver(mutation => {
  const addedNode = mutation[0].addedNodes[0];

  const option = addedNode.querySelector(`.acf-field[data-name="airtable_field_filter"]`);
  const select = option.querySelector('select');
  const value = select.value;
  const options = option.nextElementSibling;
  const optionSelect = options.querySelector('select');
  select.addEventListener('change', e => {
    setOptions(optionSelect, e.target.value);
  });
});

observer.observe(listParent, {
  childList: true,
});
