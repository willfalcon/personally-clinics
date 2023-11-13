function getDistanceMatrix(origins, destinations) {
  let distanceMatrixPromise = new Promise((resolve, reject) => {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins,
        destinations,
        travelMode: 'DRIVING',
      },
      callback
    );
    function callback(response, status) {
      resolve(response);
    }
  });
  return distanceMatrixPromise;
}

export default getDistanceMatrix;
