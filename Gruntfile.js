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
                    // Mocha
                    mocha: {
                        test: {
                            options: {
                                reporter: 'Spec',
                                run: true,
                                captureFile: 'results.txt', // Optionally capture the reporter output to a file
                                quiet: false, // Optionally suppress output to standard out (defaults to false)
                                clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
                                clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
                                noFail: false, // Optionally set to not fail on failed tests (will still fail on other errors)
                            },
                            src: ['tests/tests.js'],
                        }
                    },
                    artifactory: {
                        options: {
                            url: 'https://build.scs-lab.com/artifactory/webapp/#/home',
                            repository: 'HelloWorld_HTML',
                            username: $Art_Usr,
                            password: $Art_Pass
                        },
                        client: {
                            files: [{
                                    src: ['/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master@tmp/artifactory'] }],
                                    options: {
                                        id: 'com.mycompany.js:built-artifact:tgz',
                                        version: 'my-version',
                                        path: 'dist/'
                                        parameters: [
                                            'build.name=built-artifact',
                                            'version=my-version',
                                            'vcs.revision=my-revision',
                                        ]
                                    }
                                }
                            }

                        });

                    grunt.loadNpmTasks('grunt-mocha');
                    grunt.loadNpmTasks('grunt-contrib-cssmin');
                    grunt.loadNpmTasks('grunt-html');
                    grunt.loadNpmTasks('grunt-contrib-uglify');
                    grunt.loadNpmTasks('grunt-artifactory-publish');
                }
