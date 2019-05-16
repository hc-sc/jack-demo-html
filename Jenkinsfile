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
                script {
                    def buildInfoTemp
                    buildInfoTemp = artifactoryGradle.run rootDir: ".", buildFile: 'build.gradle', tasks: 'clean artifactoryPublish'
                    artifactoryServer.publishBuildInfo buildInfoTemp
                }
			}
		}
	}
}
