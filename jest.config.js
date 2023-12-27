// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',  // Utilise l'environnement jsdom pour simuler le DOM
  preset: 'ts-jest',
  transform: {
    '^.+\\.js$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
