import $ from 'jquery';
import debounce from 'lodash/debounce';

// Count number of times the button element been clicked
let ClickCount = 0;

export function updateCounter() {
  ClickCount += 1;
  $('#count').text(`${ClickCount} clicks on the button`);
}

$(document).ready( () => {
  const elements = [
    $('<p>').text('Holberton Dashboard'),
    $('<p>').text('Dashboard data for the students'),
    $('<button>').text('Click here to get started'),
    $('<p id="count">'),
    $('<p>').text('Copyright - Holberton School'),
  ];

  $('body').append(...elements);

  $('#start-btn').on('click', debounce(updateCounter, 500));
});
