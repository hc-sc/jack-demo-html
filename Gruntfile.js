module.exports = function(grunt) {

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
            options: {
                banner: "/*! app.min.js file */\n"
            },
            build: {
                src: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/main.js',
                dest: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/main.min.js'
            },
        },
        mocha: {
            test: {
                options: {
                    reporter: 'Spec',
                    run: true,
                    captureFile: 'results.txt',
                    quiet: false,
                    clearRequireCache: false,
                    clearCacheFilter: (key) => true,
                    noFail: false,
                },
                src: ['tests/tests.js'],
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'home/',
                src: ['../ck_Builds_HelloWorld_HTML_master@tmp'],
                dest: './tmp'
            }
        }

    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-artifactory-publish');
}
