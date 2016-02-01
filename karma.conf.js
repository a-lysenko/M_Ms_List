module.exports = function (config) {
    var vendors = [
        'public/libs/angular/angular.js',
        'public/libs/angular-route/angular-route.js',
        'public/libs/angular-mocks/angular-mocks.js',
        'public/libs/angular-bootstrap/ui-bootstrap.js',
        'public/libs/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/libs/angular-animate/angular-animate.js',
        'public/libs/angularjs-toaster/toaster.js'
    ];

    var source = [
        'public/components/**/*.module.js',

        'public/components/**/!(*.spec).js',
        'public/components/**/*.spec.js'
    ];

    config.set({

        basePath: '',

        files: [].concat(vendors, source),

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        reporters: ['dots', 'coverage'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        preprocessors: {
            'public/components/**/!(*.spec).js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'lcov',
            dir : 'coverage/'
        }
    });
};
