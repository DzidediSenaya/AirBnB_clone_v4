$(document).ready(function () {
  const amenityIds = {};

  function updateAmenities () {
    const checkedAmenities = Object.values(amenityIds);
    const h4 = $('div.amenities h4');

    if (checkedAmenities.length > 0) {
      h4.text(checkedAmenities.join(', '));
    } else {
      h4.html('&nbsp;');
    }
  }

  function checkApiStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  }

  checkApiStatus();

  $('input[type="checkbox"]').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityIds[amenityId] = amenityName;
    } else {
      delete amenityIds[amenityId];
    }

    updateAmenities();
  });

  setInterval(checkApiStatus, 5000);
});
