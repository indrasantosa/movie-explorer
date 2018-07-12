const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/discover', (req, res) => {
      return app.render(req, res, '/', req.query)
    })

    server.get('/tv/:id', (req, res) => {
      return app.render(req, res, '/tvs', { id: req.params.id })
    })

    server.get('/tv/:tvId/season/:seasonId', (req, res) => {
      return app.render(req, res, '/seasons', { 
        tvId: req.params.tvId,
        seasonId: req.params.seasonsId
      })
    })

    server.get('/tv/:tvId/season/:seasonId/episode/:episodeId', (req, res) => {
      return app.render(req, res, '/episodes', { 
        tvId: req.params.tvId,
        seasonId: req.params.seasonsId,
        episodeId: req.params.episodeId
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })