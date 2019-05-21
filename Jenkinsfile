/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
	options { disableConcurrentBuilds() }   	
	
    environment {
        containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
        containerRegistry = 'build.scs-lab.com:5000'
        containerRegistryPull = 'build.scs-lab.com'
        appUri = 'cfg-classification-webapp'
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
                script {
                    
					def buildInfoTemp
                    buildInfoTemp = artifactoryGradle.run rootDir: ".", buildFile: 'build.gradle', tasks: 'clean artifactoryPublish'
                    artifactoryServer.publishBuildInfo buildInfoTemp
                }
            }
        }
	}
}
