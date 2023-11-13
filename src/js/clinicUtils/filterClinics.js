export default function filterClinics(clinics, filters) {
  // filters: [filter]
  //
  // filters look like this
  // checkbox filter: {
  //   id: "Title X Family Planning",
  //   label: "Title X Family Planning",
  //   value: ['true']
  // }
  // multiple options filter: {
  //   id: "Payment Method?",
  //   label: "Payment Method?",
  //   value: ['Private Insurance', 'Free']
  // }

  // if no filters, don't filter the clinics.
  if (!filters.length) return clinics;

  const filteredClinics = clinics.filter(clinic => {
    // sometimes theres a null entry in the array of clinics. filter that out.
    if (!clinic) return false;

    const fields = clinic.fields;

    // we'll go through each filter and check if the clinic's field value matches it. If not, we filter it out.
    return filters.every(filter => {
      // if a filter is selected then deselected, the filter stays in the array, but with no values. we can go ahead and pass those.
      if (!filter.value.length) return true;
      // get this clinic's field value for the filter we're checking
      const clinicsFieldValue = fields[filter.id]?.toString();
      // if the clinic field doesn't exist, it was never set, so it won't match the filter
      if (!clinicsFieldValue) return false;
      // if any of the filter values match the clinic value, we pass it.
      // console.log(filter.value, clinicsFieldValue);

      return filter.value.some(value => value == clinicsFieldValue);
    });
  });
  return filteredClinics;
}
