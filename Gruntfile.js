module.exports = function(grunt){

grunt.initConfig({
	pkg: grunt.file.readJSON('/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/package.json'),
        cssmin: {
			css: {
				src: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/style.css',
				dest: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/style.min.css'
                },
           },
	htmllint: {
    			all: ['/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/index.html']
           },
	
	uglify: {
		options : {
		banner : "/*! app.min.js file */\n"
		},
 		build:{
  			src : '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/main.js', 
			dest: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/main.min.js'
		},	
	},
	    // Mocha
     mocha: {
      test: {
        options: {
          reporter: 'Spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
          noFail: false, // Optionally set to not fail on failed tests (will still fail on other errors)
		run: true,
        },
        src: ['tests/testrunner.html']
      }
    }

       });

grunt.loadNpmTasks('grunt-mocha');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-html');
grunt.loadNpmTasks('grunt-contrib-uglify');
}
