'use strict'

/* Deploy a website from templates + data to static pages. */
const api = require('mobv27-api/models')
const mongoose = require('mongoose')
const build = require('./build')
const publish = require('./publish')

const DEFAULT_DATABASE = 'mongodb://localhost:27017/mobyourlife'

const database = process.env.MOBYOURLIFE_DATABASE || DEFAULT_DATABASE

/* Main method for deploying the whole website. */
module.exports = (id) => {
  mongoose.connect(database)

  let about = getAbout(id)
  let q = [ about ]

  Promise.all(q)
    .then((values) => {
      let about = values[0]

      let content = []
      content.push(build.partial('index', { about: about }))

      Promise.all(content)
        .then((partials) => {
          build.pages(partials)
            .then((pages) => {
              publish(id, pages)
            })
        })
    })
}

function getAbout (id) {
  let promise = new Promise((resolve, reject) => {
    api.Fanpage.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
  return promise
}
