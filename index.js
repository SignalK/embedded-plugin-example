const packageJson = require('./package')
const id = packageJson.name.replace(/[-@/]/g, '_')
const {name, description} = packageJson

module.exports = function (app) {
  const onStop = []
  let state = 'initial state'

  function start(configuration) {
    state = `yes, I'm started`
    let interval = setInterval(() => {
      app.debug('Running ', new Date())
    }, 5000)
    onStop.push(() => clearInterval(interval))
  }

  function stop() {
    onStop.forEach((f) => {
      try {
        f()
      } catch (e) {
        app.error(e)
      }
    })
    state = `now I'm stopped`
  }

  const schema = {}

  function registerWithRouter(router) {
    router.get('/doit', (req, res, next) => {
      app.debug('Handling request', req)
      res.json({
        message: 'Got it!',
        state, 
        timestamp: new Date().toISOString()
      })
    })
  }

  return {
    id,
    name,
    description,
    start,
    stop,
    schema,
    registerWithRouter
  }
}