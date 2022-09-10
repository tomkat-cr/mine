const Dotenv = require('dotenv-webpack');

module.exports = env => {
    return {
        plugins: [
            new Dotenv({
                path: `./environments/.env${env.file ? `.${env.file}` : ''}`
            }),
        ]
    };
};
