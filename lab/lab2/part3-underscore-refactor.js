(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 4 — (Optional, stretch goal)

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;


  // clean data
  newSchools = _.each(schools, function(fools) {
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (_.isString(fools.ZIPCODE)) {
      split = fools.ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      fools.ZIPCODE = normalized_zip;
    }
    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
    if (_.isNumber(fools.GRADE_ORG)) {  // if number
      fools.HAS_KINDERGARTEN = fools.GRADE_LEVEL < 1;
      fools.HAS_ELEMENTARY = 1 < fools.GRADE_LEVEL < 6;
      fools.HAS_MIDDLE_SCHOOL = 5 < fools.GRADE_LEVEL < 9;
      fools.HAS_HIGH_SCHOOL = 8 < fools.GRADE_LEVEL < 13;
    } else {  // otherwise (in case of string)
      fools.HAS_KINDERGARTEN = fools.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      fools.HAS_ELEMENTARY = fools.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      fools.HAS_MIDDLE_SCHOOL = fools.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      fools.HAS_HIGH_SCHOOL = fools.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  });

  // filter data
  newSchools = _.each(schools, function(fools) {
    isOpen = fools.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (fools.TYPE.toUpperCase() !== 'CHARTER' ||
                fools.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (fools.HAS_KINDERGARTEN ||
                fools.HAS_ELEMENTARY ||
                fools.HAS_MIDDLE_SCHOOL ||
                fools.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = fools.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(fools.ZIPCODE) >= 0;
    fools.filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
                      return fools;});
var filtered_schools = _.filter(schools, function(fools)
{return fools.filter_condition == true;});
var rejected_schools = _.filter(schools, function(fools)
{return fools.filter_condition == false;});

  console.log('Included:', filtered_schools.length);
  console.log('Excluded:', rejected_schools.length);

  // main loop
  var color;
  _.each(filtered_schools, function(fools){
    isOpen = fools.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (fools.TYPE.toUpperCase() !== 'CHARTER' ||
                fools.TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = fools.ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (fools.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (fools.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': fools.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([fools.Y, fools.X], pathOpts)
      .bindPopup(fools.FACILNAME_LABEL)
      .addTo(map);
  });

})();
