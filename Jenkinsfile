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
					when {
						 branch 'master'
					}
					steps {
						sh '''
						grunt htmllint
						grunt mochaTest --force
						'''  
					}
				}	

				stage("Minify") {
					when {
						branch 'master'
					}
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
			when {
				branch 'master'
			}
			steps {
				sh '''
				cat index.html
				'''
			}
		}	
		
		stage("Publish to Artifactory") {
            steps {
                rtPublishBuildInfo (
                    serverId: SERVER_ID
                )
            }
        }
	}
}
