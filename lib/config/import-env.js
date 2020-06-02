"use strict";const dotenv = require('dotenv');

const path = `.env.${process.env.NODE_ENV || ''}`.replace(/[.]$/, '');
dotenv.config({ path })
