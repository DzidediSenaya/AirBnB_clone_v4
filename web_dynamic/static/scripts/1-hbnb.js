$(document).ready(function () {
  const amenityIds = {};

  // Function to update the h4 tag with checked amenities
  function updateAmenities () {
    const checkedAmenities = Object.values(amenityIds);
    const h4 = $('div.amenities h4');

    if (checkedAmenities.length > 0) {
      h4.text(checkedAmenities.join(', '));
    } else {
      h4.html('&nbsp;');
    }
  }

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      // If the checkbox is checked, store the Amenity ID
      amenityIds[amenityId] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID
      delete amenityIds[amenityId];
    }

    // Update the h4 tag with the list of Amenities checked
    updateAmenities();
  });
});
