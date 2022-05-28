/* eslint-disable @typescript-eslint/no-var-requires */

const { createKnexConfig } = require('./src/knex/knex-config')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const config = createKnexConfig()

module.exports = {
	development: config,
	production: config,
}
