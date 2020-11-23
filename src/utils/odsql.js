export const getBaseUrl = (baseDomain) => (datasetId) => {
  const url = (baseDomain?`https://${baseDomain}.opendatasoft.com`:window.location.origin);
  const uri = `/api/v2/catalog/datasets/${datasetId}`;
  return new URL(url + uri)
};

export const getRecordsUrl = (base) => {
  const urlString = `${base}/records?`;
  return new URL(urlString)
};

export const getGeoJsonExportUrl = (base) => {
  const urlString = `${base}/exports/geojson?`;
  return new URL(urlString)
};

const addQueryParamToUrl = url => clause => value => {
  const queryParams = new URLSearchParams(url);
  queryParams.append(clause, value)
  const appendedUrl = new URL(url + '&' + queryParams);
  return appendedUrl
}

// All these functions return a function, that accepts a value as parameter
export const addWhereQuery = url => addQueryParamToUrl(url)('where');
export const addSelectQuery = url => addQueryParamToUrl(url)('select');
export const addRefineQuery = url => addQueryParamToUrl(url)('refine');
export const addExcludeQuery = url => addQueryParamToUrl(url)('exclude');
export const addStartQuery = url => addQueryParamToUrl(url)('start');
export const addRowsQuery = url => addQueryParamToUrl(url)('rows');
export const addIncludeAppMetasQuery = url => addQueryParamToUrl(url)('include_app_metas');
export const addTimezoneQuery = url => addQueryParamToUrl(url)('timezone');

// More general tool to pass an array of { clause: value } params
export const addQueryParamsList = url => queryParams => {
  const urlWithParams = Object.keys(queryParams).reduce(addQueryParamToUrl(url));
  return encodeURI(urlWithParams)
}
