export function applyTrackingParams(resource, params) {
  if (params) {
    return resource?.trackingParameters
      ? `?${params}&${resource.trackingParameters}`
      : `?${params}`;
  } else {
    return resource?.trackingParameters
      ? `?${resource.trackingParameters}`
      : '';
  }
}
