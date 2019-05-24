const apikey = process.env.API_KEY;
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/package.json'),
        cssmin: {
            css: {
                src: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/style.css',
                dest: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/build-exec/style.min.css'
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
                dest: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master/build-exec/main.min.js'
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
                    archive: 'artifactory.tgz',
                    createEmptyArchive: false
                },
                files: [{
                    src: ['../ck_Builds_HelloWorld_HTML_master@tmp/artifactory'],
                    dest: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master',
                    filter: 'isFile'
                }]
            }
        },

        artdeploy: {
            options: {
                apiKey: apikey,
                repositoryPath: 'https://build.scs-lab.com/artifactory/HelloWorld_HTML/',
                targetPath: 'artifactory',
                packagePath: '../ck_Builds_HelloWorld_HTML_master/artifactory.tgz'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-artifactory-deploy');
}
