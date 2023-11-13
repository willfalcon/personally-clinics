export default function getFilters(selectedFilters, filterOptions) {
  const usedFilters = [];
  for (const [key, value] of Object.entries(selectedFilters)) {
    if (value !== 'default') {
      usedFilters.push({
        id: key,
        value,
        label: filterOptions.filter(filter => filter.airtable_field_filter === key)[0].airtable_field_filter,
      });
    }
  }
  return usedFilters;
}
