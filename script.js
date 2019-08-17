const GITHUB_URL = "https://api.github.com/";

// Get Github list
function getGithubList(userHandle) { 
  // -setup query
  const params = {
    type: "owner",
    sort: "created",
    direction: "asc",
  };
  // -put url together (FormatQueryParams)
  const queryString = formatQueryParams(params);
  const url = `${GITHUB_URL}users/${userHandle}/repos?${queryString}`;
  // -FETCH
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

// Display results
function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-results-list').empty();

  for (let obj in responseJson) {
    $('.js-results-list').append(
      `<li><h3>${responseJson[obj].name}</h3>
      <p><a href="${responseJson[obj].html_url}">View Repository</a></p>
      <p>Description: ${responseJson[obj].description}</p>
      </li>`
    );
  }

  $('.js-results').removeClass('hidden');
}

// Watch for event submit on button
// (send info to function)
function watchForm() {
  $('.js-form').submit(event => {
    event.preventDefault();
    const userHandle = $('.js-user-handle').val();

    $('.js-user-handle').val('');
    getGithubList(userHandle);
  });
}

// Jquery watch form
$(watchForm);