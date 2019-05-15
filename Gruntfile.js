module.exports = function(grunt)

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
        cssmin: {
			css: {
				src: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/style.css',
				dest: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/style.min.css'
                }
           }
       });



grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-html');
grunt.loadNpmTasks('grunt-contrib-concat');
