module.exports = function () {
    var client = './client/';
    var clientApp = client + 'app/';
    var report = "./report/";
    var config = {

        /** 
        * File paths
        * */
        alljs: [
            clientApp + '**/*.js'
        ],
        report: report
        /*
         * Karma and testing settings
         */

    };

    config.karma = getKarmaOptions();

    return config;

    /////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                './client/scripts/jquery-3.1.1.min.js',
                './client/scripts/angular-1.5.8.min.js',
                //'./client/scripts/sinon.js',
                './client/scripts/bard.min.js',
                clientApp + 'app.js',
                clientApp + '**/*.js',
                clientApp + 'exerciseTracker/**/*.js'
                ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary' }
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};