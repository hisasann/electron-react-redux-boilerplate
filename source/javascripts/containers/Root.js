import Env from '../env/env'

if (Env.envName === 'product') {
  module.exports = require('./Root.prod')
} else {
  module.exports = require('./Root.dev')
}
