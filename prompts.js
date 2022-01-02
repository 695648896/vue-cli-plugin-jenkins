// prompts.js

module.exports = [
    {
      type: 'input',
      name: 'company',
      message: 'please input your company as default config',
      validate: input => !!input,
      default: 'en'
    }

  ]