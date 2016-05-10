const EPOCHS = {
  year:   31536000,
  month:  2592000,
  day:    86400,
  hour:   3600,
  minute: 60
};

const getDuration = (seconds) => {
  for (let epoch of Object.keys(EPOCHS)) {
    const interval = Math.floor(seconds / EPOCHS[epoch]);
    if (interval >= 1) {
      return { interval: interval, epoch: epoch };
    }
  }
};

const timeAgo = (date) => {
  var timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
  var {interval,epoch} = getDuration(timeAgoInSeconds);
  var suffix = interval === 1 ? '' : 's';
  return `${interval} ${epoch}${suffix} ago`;
};

function getFeed() {
  axios.get('https://api.github.com/users/geowarin/events')
  .then((feed) => {
    return _(feed.data)
    //.filter((item) => item.repo != undefined)
    .map((item) => {
      if (item.type === 'WatchEvent') {
        const name = item.repo.name;
        return `${timeAgo(item.created_at)}, I watched <a href='https://github.com/${name}'>${name}</a>`
      }
      if (item.type === 'CreateEvent') {
        const name = item.repo.name;
        return `${timeAgo(item.created_at)}, I created <a href='https://github.com/${name}'>${name}</a>`
      }
    })
    .filter((item) => item != null)
    .value()
  })
  .then((links) => {
    links.forEach((link) => {
      $('#feed').append(`<li>${link}</li>`)
    })
  })
  axios.get('https://api.github.com/users/geowarin/starred', {headers: {
    'Accept': 'application/vnd.github.v3.star+json'
  }})
  .then((feed) => {
    return _(feed.data)
    //.filter((item) => item.repo != undefined)
    .map((item) => {
      const name = item.repo.full_name;
      return `${timeAgo(item.starred_at)}, I starred <a href='https://github.com/${name}'>${name}</a>`
    })
    .filter((item) => item != null)
    .value()
  })
  .then((links) => {
    links.forEach((link) => {
      $('#feed').append(`<li>${link}</li>`)
    })
  })
}
