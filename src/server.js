const app = require('./app')
const http = require('http')

class Server {
  constructor () {
    this.instance = http.createServer(app)
    this._port = process.env.PORT
  }

  start () {
    this.instance.listen(this._port)
    console.log(`Server started on port ${this.port}`)
  }

  get port () {
    if (!this.instance.listening) {
      throw new Error('Server not started')
    }
    return this.instance.address().port
  }
}

module.exports = Server
