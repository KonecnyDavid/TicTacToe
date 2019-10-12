var path = require('path');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'public'),
        filename: 'main.js'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    mode:'development',
}