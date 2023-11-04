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

  function getPlacesFromAPI () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        displayPlaces(data);
      }
    });
  }

  function displayPlaces (places) {
    const sectionPlaces = $('section.places');
    sectionPlaces.empty();

    for (const place of places) {
      const article = $('<article></article>');

      const titleBox = $('<div class="title_box"></div>');
      titleBox.append($('<h2>' + place.name + '</h2>'));
      titleBox.append($('<div class="price_by_night">$' + place.price_by_night + '</div>'));

      const information = $('<div class="information"></div>');
      information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
      information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
      information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');

      const description = $('<div class="description">' + place.description + '</div>');

      article.append(titleBox);
      article.append(information);
      article.append(description);

      sectionPlaces.append(article);
    }
  }

  checkApiStatus();
  getPlacesFromAPI();
  updateAmenities();

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
