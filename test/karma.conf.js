module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
	    'bower_components/angular/angular.js',
		  'bower_components/angular-classy/angular-classy.js',
      'compat.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'examples/todomvc/js/app.js',
      'examples/todomvc/js/*/*.js',
		  'test/unit/*.js'
    ],
    autoWatch: true,
    singleRun: true,
    browsers: [
      // 'Firefox',
      'PhantomJS'
    ]
  });
};

