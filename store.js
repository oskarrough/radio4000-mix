// Helpers to make it easier to work with the Radio4000 Firebase database.
// Copy/pasta https://github.com/internet4000/radio4000-js-sdk/blob/master/index.js

const fetchAndParse = url =>
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // Catch resolved promise with empty value. Like non-existing slug or id.
      if (!Object.keys(data).length) throw new Error('Not found')
      return data
    })

const toObject = (obj, id) => Object.assign(obj, {id})

const toArray = data => Object.keys(data).map(id => toObject(data[id], id))

function fetchChannels(max) {
  let url = 'https://radio4000.firebaseio.com/channels.json'
  if (max) url = url + `?orderBy="created"&limitToFirst=${max}`
  return fetchAndParse(url).then(toArray)
}

export default {fetchChannels}
