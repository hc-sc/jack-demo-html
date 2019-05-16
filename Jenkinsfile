/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
	options { disableConcurrentBuilds() }   	
	
    stages {
		stage("Testing and Minification") {
			parallel{
				stage("Tests") {
					steps {
						sh '''
						grunt htmllint
						grunt mochaTest --force
						'''  
					}
				}	

				stage("Minify") {
					steps {
						sh '''
						grunt cssmin --force
						grunt uglify --force	
						'''  
					}
				}
			}
		}
						
		stage("Deploy") {
			steps {
				sh '''
				cat index.html
				'''
			}
		}	
		
		stage("Publish to Artifactory") {
            steps {
               	
				sh '''
				cat index.html
				'''
			
			}
		}
	}
}
