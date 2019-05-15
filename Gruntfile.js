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
      		all: {
        		src: ['test/test.html'],
      		},
     		options: {
       		 	run: true
      		}
    	}

       });

grunt.loadNpmTasks('grunt-mocha');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-html');
grunt.loadNpmTasks('grunt-contrib-uglify');
}
