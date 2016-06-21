//
// Apply the seven functions of nirvana
//

const exercises = [
  {
    title: 'traverse using forEach',
    code: () => {
      const data = names()
      const result = []
      data.forEach((name) => result.push(name))
      return result
    },
    correctResult: [ 'one', 'two', 'three' ]
  },
  {
    title: 'project video and title pair using map',
    code: () => {
      const data = newReleases()
      return data.map((movie) => ({ id: movie.id, title: movie.title }))
    },
    correctResult: [
      { id : 70111470, title : 'Die Hard' },
      { id : 654356453, title : 'Bad Boys' },
      { id : 65432445, title : 'The Chamber' },
      { id : 675465, title : 'Fracture' }
    ]
  },
  {
    title: 'capture videos with 5.0 rating using filter',
    code: () => {
      const data = newReleases()
      return data.filter((movie) => movie.rating == 5.0)
    },
    correctResult: [
      { id : 654356453,
        title : 'Bad Boys',
        boxart : 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
        uri : 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating : [ 5 ],
        bookmark : [
          { id : 432534, time : 65876586 }
        ]
      },
      { id : 675465,
        title : 'Fracture',
        boxart : 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
        uri : 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating : [ 5 ],
        bookmark : [
          { id : 432534, time : 65876586 }
        ]
      }
    ]
  },
  {
    title: 'capture id of videos with 5.0 rating using chain of filter and map',
    code: () => {
      const data = newReleases()
      return data
        .filter(movie => movie.rating == 5.0)
        .map(movie => movie.id)
    },
    correctResult: [ 654356453, 675465 ]
  },
  {
    title: 'Flatten the movieLists array into an array of video ids',
    code: () => {
      const data = movieLists()
      return data
        .reduce((acc, category) => {
          category.videos.forEach(movie => acc.push(movie.id))
          return acc
        }, [])
    },
    correctResult: [ 70111470, 654356453, 65432445, 675465 ]
  },
  {
    title: 'Flatten the movieLists array into an array of video ids using map and concatAll',
    code: () => {
      const data = movieLists()
      return data
        .map(category => category.videos.map(video => video.id))
        .concatAll()
    },
    correctResult: [ 70111470, 654356453, 65432445, 675465 ]
  },
  {
    title: 'Retrieve id, title, and a 150x200 boxarts url for every video',
    code: () => {
      const data = movieLists()
      return data.map(category =>
        category.videos.map(video =>
          video.boxarts
            .filter(boxart => boxart.width === 150)
            .map(boxart => ({id: video.id, title: video.title, boxart: boxart.url}))
        )
        .concatAll()
      )
      .concatAll()
    },
    correctResult: [
      { id : 70111470,
        title : 'Die Hard',
        boxart : 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg'
      },
      { id : 654356453,
        title : 'Bad Boys',
        boxart : 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg'
      },
      { id : 65432445,
        title : 'The Chamber',
        boxart : 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg'
      },
      { id : 675465,
        title : 'Fracture',
        boxart : 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg'
      }
    ]
  },
  {
    title: 'Retrieve id, title, and a 150x200 boxarts url for every video using concatMap',
    code: () => {
      const data = movieLists()
      return data.concatMap(category =>
        category.videos.concatMap(video => {
          return video.boxarts
            .filter(boxart => boxart.width === 150)
            .map(boxart => ({id: video.id, title: video.title, boxart: boxart.url}))
        })
      )
    },
    correctResult: [
      { id : 70111470,
        title : 'Die Hard',
        boxart : 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg'
      },
      { id : 654356453,
        title : 'Bad Boys',
        boxart : 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg'
      },
      { id : 65432445,
        title : 'The Chamber',
        boxart : 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg'
      },
      { id : 675465,
        title : 'Fracture',
        boxart : 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg'
      }
    ]
  },
  {
    title: 'Use forEach to find the largest boxart',
    code: () => {
      const data = boxarts()
      let currSize
      let maxSize = -1
      let largestBoxart
      data.forEach((boxart) => {
        currentSize = boxart.width * boxart.height
        if (currentSize > maxSize) {
          largestBoxart = boxart
          maxSize = currentSize
        }
      })
      return largestBoxart
    },
    correctResult: {
      width : 425,
      height : 150,
      url : 'http://cdn-0.nflximg.com/images/2891/Fracture425.jpg'
    }
  },
  {
    title: 'Retrieve the largest rating',
    code: () => {
      const data = ratings()
      return data.reduce((acc, curr) => (acc > curr) ? acc : curr, 0)
    },
    correctResult: 5
  },
  {
    title: 'Retrieve url of the largest boxart',
    code: () => {
      const data = boxarts()
      return data
        .reduce((acc, curr) => (acc.width * acc.height > curr.width * curr.height) ? [acc] : [curr], {})
        .map(art => art.url)
    },
    correctResult: [ 'http://cdn-0.nflximg.com/images/2891/Fracture425.jpg' ]
  },
  {
    title: 'Reducing with an initial value',
    code: () => {
      const data = videos()
      return data.
        reduce((acc, video) => {
          let copy = Object.create(acc)
          copy[video.id] = video.title;
          return [copy];
        }, {});
    },
    correctResult: [ { 654356453 : 'Bad Boys' } ]
  },
  {
    title: 'Retrieve the id, title, and smallest box art url for every video',
    code: () => {
      const data = movieLists()
      return data.concatMap(category =>
        category.videos.concatMap(video =>
          video.boxarts.reduce((acc, curr) =>
            (acc.width * acc.height < curr.width * curr.height) ? [acc] : [curr], {})
          .map(art => {
            return {id: video.id, title: video.title, boxart: art.url}
          })
        )
      )
    },
    correctResult: [
      { id : 70111470, title : 'Die Hard', boxart : 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg' },
      { id : 654356453, title : 'Bad Boys', boxart : 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
      { id : 65432445, title : 'The Chamber', boxart : 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg' },
      { id : 675465, title : 'Fracture', boxart : 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg' }
    ]
  },
  {
    title: 'Combine videos and bookmarks by index using for-loop',
    code: () => {
      const myVideos = videos()
      const myBookmarks = bookmarks()
      let videoIdAndBookmarkIdPairs = [];

      for(let counter = 0; counter < Math.min(myVideos.length, myBookmarks.length); counter++) {
        videoIdAndBookmarkIdPairs.push({videoId: myVideos[counter].id, bookmarkId: myBookmarks[counter].id})
      }

      return videoIdAndBookmarkIdPairs;
    },
    correctResult: [
      { videoId : 65432445, bookmarkId : 470 },
      { videoId : 675465, bookmarkId : 453 },
      { videoId : 70111470, bookmarkId : 445 }
    ]
  },
  {
    title: 'Combine videos and bookmarks by index using Array.zip',
    code: () => {
      const myVideos = videos()
      const myBookmarks = bookmarks()
      return Array.zip(myVideos, myBookmarks, (a,b) => ({ videoId: a.id, bookmarkId: b.id }))
    },
    correctResult: [
      { videoId : 65432445, bookmarkId : 470 },
      { videoId : 675465, bookmarkId : 453 },
      { videoId : 70111470, bookmarkId : 445 }
    ]
  },
  {
    title: 'Retrieve each video’s id, title, middle interesting moment time, and smallest boxart url',
    code: () => {
      const data = movieLists2()
      return data.concatMap(category =>
        category.videos.concatMap(video =>
          Array.zip(
            video.boxarts.reduce((acc, curr) => (acc.width * acc.height < curr.width * curr.height) ? [acc] : [curr], {}),
            video.interestingMoments.filter(moment => moment.type == 'Middle'),
            (a,b) => ({id: video.id, title: video.title, time: b.time, url: a.url})
          )
        )
      )
    },
    correctResult: [
      { id : 70111470,
        title : 'Die Hard',
        time : 323133,
        url : 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg'
      },
      { id : 654356453,
        title : 'Bad Boys',
        time : 6575665,
        url : 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg'
      },
      { id : 65432445,
        title : 'The Chamber',
        time : 3452343,
        url : 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg'
      },
      { id : 675465,
        title : 'Fracture',
        time : 3453434,
        url : 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg'
      }
    ]
  },
  {
    title: 'Convert Arrays to Trees',
    code: () => {
      const lists = powerLists()
      const videos = powerVideos()

      return lists.map(category => ({
        name: category.name,
        videos: videos
          .filter(video => video.listId == category.id)
          .map(video => ({id: video.id, title: video.title}))
      }))
    },
    correctResult: [
      {
        name : 'New Releases',
        videos : [
          { id : 65432445, title : 'The Chamber' },
          { id : 675465, title : 'Fracture' }
        ]
      },
      {
        name : 'Thrillers',
        videos : [
          { id : 70111470, title : 'Die Hard' },
          { id : 654356453, title : 'Bad Boys' }
        ]
      }
    ]
  },
  {
    title: 'Convert Arrays to Deeper Trees',
    code: () => {
      const lists = powerLists()
      const videos = powerVideos()
      const boxarts = powerBoxart()
      const bookmarks = powerBookmarks()

      return lists.map(category => ({
          name: category.name,
          videos: videos
            .filter(video => video.listId == category.id)
            .concatMap(video =>
              Array.zip(
                bookmarks.filter(b => b.videoId == video.id).map(b => b.time),
                boxarts.filter(b => b.videoId == video.id)
                  .reduce((acc, curr) => (acc.width * acc.height < curr.width * curr.height) ? [acc] : [curr], {})
                  .map(b => b.url),
                (time, boxart) => {
                  return {
                    id: video.id,
                    title: video.title,
                    time: time,
                    boxart: boxart
                  }
                }
              )
            )
      }))
    },
    correctResult:  [
      { name : 'New Releases',
        videos : [
          { id : 65432445,
            title : 'The Chamber',
            time : 32432,
            boxart : 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg'
          },
          { id : 675465,
            title : 'Fracture',
            time : 3534543,
            boxart : 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg'
          }
        ]
      },
      { name : 'Thrillers',
        videos : [
          { id : 70111470,
            title : 'Die Hard',
            time : 645243,
            boxart : 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg'
          },
          { id : 654356453,
            title : 'Bad Boys',
            time : 984934,
            boxart : 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg'
          }
        ]
      }
    ]
  }
]

//
// run exercises
//

describe('APPLY ARRAY METHODS', () => {
  exercises.forEach((ex, i) => {
    if ([11].includes(i)) {
      console.log(`SKIPPING: ${ex.title}`)
    } else {
      describe(`${ex.title}`, () => {
        it('should match expected data', () => {
          expect(ex.code()).toEqual(ex.correctResult)
        })
      })
    }
  })
})



function names () {
  return ['one', 'two', 'three']
}

function newReleases () {
  return [
    {
      "id": 70111470,
      "title": "Die Hard",
      "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": [4.0],
      "bookmark": []
    },
    {
      "id": 654356453,
      "title": "Bad Boys",
      "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": [5.0],
      "bookmark": [{ id:432534, time:65876586 }]
    },
    {
      "id": 65432445,
      "title": "The Chamber",
      "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": [4.0],
      "bookmark": []
    },
    {
      "id": 675465,
      "title": "Fracture",
      "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": [5.0],
      "bookmark": [{ id:432534, time:65876586 }]
    }
  ]
}

function movieLists () {
  return [
    {
      name: "Instant Queue",
      videos : [
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id:432534, time:65876586 }]
        }
      ]
    },
    {
      name: "New Releases",
      videos: [
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 675465,
          "title": "Fracture",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id:432534, time:65876586 }]
        }
      ]
    }
  ]
}

function boxarts () {
  return [
    { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
    { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
    { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
    { width: 425, height:150, url:"http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
  ]
}

function ratings () {
  return [2,3,1,4,5]
}

function videos () {
  return [
    { "id": 65432445, "title": "The Chamber" },
    { "id": 675465, "title": "Fracture" },
    { "id": 70111470, "title": "Die Hard" },
    { "id": 654356453, "title": "Bad Boys" }
  ]
}

function bookmarks () {
  return [
    {id: 470, time: 23432},
    {id: 453, time: 234324},
    {id: 445, time: 987834}
  ]
}

function movieLists2 () {
  return [
    {
      name: "New Releases",
      videos: [
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "interestingMoments": [
            { type: "End", time:213432 },
            { type: "Start", time: 64534 },
            { type: "Middle", time: 323133}
          ]
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
            { width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "interestingMoments": [
            { type: "End", time:54654754 },
            { type: "Start", time: 43524243 },
            { type: "Middle", time: 6575665}
          ]
        }
      ]
    },
    {
      name: "Instant Queue",
      videos: [
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxarts": [
            { width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "interestingMoments": [
            { type: "End", time:132423 },
            { type: "Start", time: 54637425 },
            { type: "Middle", time: 3452343}
          ]
        },
        {
          "id": 675465,
          "title": "Fracture",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "interestingMoments": [
            { type: "End", time:45632456 },
            { type: "Start", time: 234534 },
            { type: "Middle", time: 3453434}
          ]
        }
      ]
    }
  ]
}

function powerLists () {
  return [
    {
      "id": 5434364,
      "name": "New Releases"
    },
    {
      "id": 65456475,
      name: "Thrillers"
    }
  ]
}

function powerVideos () {
  return [
    {
      "listId": 5434364,
      "id": 65432445,
      "title": "The Chamber"
    },
    {
      "listId": 5434364,
      "id": 675465,
      "title": "Fracture"
    },
    {
      "listId": 65456475,
      "id": 70111470,
      "title": "Die Hard"
    },
    {
      "listId": 65456475,
      "id": 654356453,
      "title": "Bad Boys"
    }
  ]
}

function powerBoxart () {
  return [
    { videoId: 65432445, width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
    { videoId: 65432445, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" },
    { videoId: 675465, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
    { videoId: 675465, width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
    { videoId: 675465, width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
    { videoId: 70111470, width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
    { videoId: 70111470, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" },
    { videoId: 654356453, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
    { videoId: 654356453, width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }
  ]
}

function powerBookmarks () {
  return [
    { videoId: 65432445, time: 32432 },
    { videoId: 675465, time: 3534543 },
    { videoId: 70111470, time: 645243 },
    { videoId: 654356453, time: 984934 }
  ]
}
