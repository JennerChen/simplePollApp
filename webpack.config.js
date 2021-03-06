var webpack = require('webpack');
var path = require('path');
// var buildPath = path.resolve(__dirname, 'src/www');
// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
    entry: './js/router.js',
    resolve: {
        // 当require时,下列字符不用写后缀
        extensions: ['', '.js', '.md', '.txt','.jsx','.json'],
    },
    output: {
        filename: 'build/bundle.js'
    },
    devtool:"#cheap-module-source-map",
    module: {
        loaders: [{
                test: [/\.js$/,/\.jsx$/],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react','stage-1']
                }
            }, {
                test: [/\.json$/],
                loader: 'json-loader'
            },{
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=/[path][name].[ext]'
            } // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    externals: {
        "jquery":"jQuery",
        "d3":"d3",
        "Bmob":"Bmob"
    }
};
