const getMatchingRegions = (text, dataModule) => {
  const allRegions = require('../' + dataModule).default.allRegions;

  text = text.toLowerCase().replaceAll(' ', '').replaceAll('-', '');

  let result = [];

  Object.keys(allRegions).forEach((r) => {
    const name = r.split('_').join('');

    if (Array.isArray(allRegions[r])) {
      if (text.includes(name)) {
        result.push({
          name,
          values: allRegions[r],
        });
      }
    } else {
      let found = false;
      let allValues = [];

      Object.keys(allRegions[r]).forEach((s) => {
        const aliases = allRegions[r][s]['aliases'] || [];
        if (
          text.includes(s + name) ||
          text.includes(name + s) ||
          aliases.includes(text)
        ) {
          result.push({
            name: name + '.' + s,
            values: allRegions[r][s],
          });
          found = true;
          allValues.push(...allRegions[r][s]);
        }
      });

      if (!found && text.includes(name)) {
        const def = allRegions[r].default;
        const values = Array.isArray(def) ? def : allRegions[r][def];

        result.push({
          name,
          values,
        });
      }
    }
  });

  return result;
};

const filterDataByRegion = (data, region, mod) => {
  const abbreviations = mod.abbreviations || [];

  let filteredData = {
    x: [],
    y: [],
  };

  data.x.forEach((x, i) => {
    x = x.toLowerCase();
    const values = region.values
      .map(
        (r) =>
          abbreviations.find(
            (a) => r.toLowerCase() === a.abbreviation.toLowerCase()
          )?.name
      )
      .filter((r) => r);

    if (
      region.values.some((r) => r.toLowerCase() === x) ||
      values.find((s) => s.toLowerCase() === x)
    ) {
      filteredData.x.push(data.x[i]);
      filteredData.y.push(data.y[i]);
    }
  });

  return filteredData;
};

export default {
  filterDataByRegion,
  getMatchingRegions,
};
