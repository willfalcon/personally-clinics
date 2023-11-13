function addOptions(select, options, selected = false) {
  select.innerHTML = '';
  // console.log({ select, options, selected });
  options.forEach(option => {
    let opt = document.createElement('option');
    opt.value = option;
    opt.innerHTML = option;
    // console.log(selected);
    if (selected) {
      const boolOption = typeof option == 'boolean';
      // console.log(boolOption);
      if (selected.includes(boolOption ? (option ? 'true' : 'false') : option)) {
        opt.selected = true;
      }
    }
    select.appendChild(opt);
  });
}

export default addOptions;
