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
    }
	
    stages {
		
		stage('appmeta Info') {
            steps {
                checkout scm
                script {

                    def properties = readProperties  file: 'appmeta.properties'

                    //Get basic meta-data
                    rootGroup = properties.root_group
                    rootVersion = properties.root_version
                    buildId = env.BUILD_ID
                    version = rootVersion + "." + (buildId ? buildId : "MANUAL-BUILD")
                    module = rootGroup

                    // Setup Artifactory connection
                    artifactoryServer = Artifactory.server 'default'
                    artifactoryDocker = Artifactory.docker server: artifactoryServer
                    buildInfo = Artifactory.newBuildInfo()
                }
            }
        }

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
            steps{
				script {
                    def buildInfoTemp
                    buildInfoTemp = artifactoryDocker.push "${containerRegistry}/fm/fc/fc-webapp:${version}", 'docker-local'
                    buildInfo.append buildInfoTemp
                }
			}
		}
	}
}
