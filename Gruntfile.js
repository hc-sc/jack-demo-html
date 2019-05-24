const apikey = process.env.API_KEY;
const usrArt = process.env.UserNameArt;
const passArt = process.env.PassArt;

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
                    archive: 'artifacts.tgz',
                    createEmptyArchive: false
                },
                files: [{
                    src: ['../ck_Builds_HelloWorld_HTML_master@tmp/artifactory'],
                    dest: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master',
                    filter: 'isFile'
                }]
            }
        },
//         artifactory: {
//   target: {
//     url: 'https://build.scs-lab.com/artifactory/',
//     repository: 'HelloWorld_HTML/',
//     username: 'bbhowmik',
//     password: 'changeme'
//   },
//   client: {
//     files: [
//       { src: ['../ck_Builds_HelloWorld_HTML_master@tmp/artifactory'] }
//     ],
//     options: {
//      // id: 'com.mycompany.js:built-artifact:tgz',
//       version: 'my-version',
//       path: '/home/mradwan/jenkins/jenkins/workspace/ck_Builds_HelloWorld_HTML_master'
//     }
//   }
// }
       artdeploy: {
           options: {
               apiKey: apikey,
               repositoryPath: 'https://build.scs-lab.com/artifactory/HelloWorld_HTML/',
               targetPath: 'artifacts.tgz',
               packagePath: '../ck_Builds_HelloWorld_HTML_master/artifacts.tgz'
           }
       }
    });
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-artifactory-deploy');
    grunt.loadNpmTasks('grunt-artifactory-publish');
}
