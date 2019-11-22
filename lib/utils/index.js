'use strict';

const Register = require('file-register');
const lib = new Register();

lib.register(__dirname);
module.exports = lib;
