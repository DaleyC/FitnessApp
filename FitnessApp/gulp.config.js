module.exports = function () {
    var root = './wwwroot/';
    var rootApp = root + 'app/';
    var server = './wwwroot/app/';
    var temp = './.tmp/';
    var config = {

        /** 
        * File paths
        * */
        alljs: [
            rootApp + '**/*.js',
            './*.js',
            '!' + '**/scripts/**'
        ]
    };
    return config;
};