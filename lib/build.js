'use strict'

/* Lower level deployment tasks. */
const fs = require('fs')
const handlebars = require('handlebars')

module.exports = { }

/* Deploy partial with data. */
module.exports.partial = (name, args) => {
  let promise = new Promise((resolve, reject) => {
    loadTemplate(`partials/${name}`, (err, html) => {
      if (err) {
        reject(err)
      } else {
        let template = handlebars.compile(html)
        let result = template(args)

        resolve({
          name: name,
          body: result
        })
      }
    })
  })
  return promise
}

/* Deploy pages from partials. */
module.exports.pages = (partials) => {
  let promise = new Promise((resolve, reject) => {
    loadTemplate('layout', (err, html) => {
      if (err) {
        reject(err)
      } else {
        let template = handlebars.compile(html)
        let pages = []

        partials.forEach((item) => {
          pages.push({
            name: item.name,
            body: template(item)
          })
        })

        resolve(pages)
      }
    })
  })
  return promise
}

/* Load template from file. */
function loadTemplate (name, cb) {
  let relative = `../templates/starter/${name}.html`
  let filename = require.resolve(relative)

  fs.readFile(filename, (err, data) => {
    if (data) {
      data = data.toString()
    }

    cb(err, data)
  })
}
