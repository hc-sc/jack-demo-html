/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
	options { disableConcurrentBuilds() }   	
	
    environment {
        Art_Usr = credentials('UserID_Artifactory')
		Art_Pass = credentials('Pass_Artifactory')
        containerRegistry = 'build.scs-lab.com:5000'
        containerRegistryPull = 'build.scs-lab.com'
    }
	
    stages {
		stage("Update Server") {
			steps {
				sh '''
				cat index.html
				'''
			}
		}	
		// Testing and analysis stage
		stage("Testing") {
			parallel{	
				stage("Tests") {
					steps {
						sh 'grunt htmllint'
						sh 'mocha' 
					}
				}
				stage("Minify") {
					steps {
						sh	'grunt cssmin --force'
						sh	'grunt uglify --force'  
					}
				}
				// SonarQube Stage to be inserted here 
				// Other stages before building that can be done in parallel
			}
		}						
        stage("Publish to Artifactory") {
            when {
                branch 'master'
            }
            steps {
				ssh 'ls'
            }
        }
	}
}
