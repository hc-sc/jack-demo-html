/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
	options { disableConcurrentBuilds() }   	
	
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
                    artifactoryGradle = Artifactory.newGradleBuild()
                    artifactoryGradle.useWrapper = true
                    artifactoryGradle.usesPlugin = true
                    artifactoryGradle.deployer.deployArtifacts = true
                    artifactoryGradle.deployer repo: 'gradle-local', server: artifactoryServer
                    artifactoryGradle.resolver repo: 'gradle', server: artifactoryServer
                }
            }
        }
		
		
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
                script {
                    def buildInfoTemp
                    buildInfoTemp = artifactoryGradle.run rootDir: ".", buildFile: 'build.gradle', tasks: 'clean artifactoryPublish'
                    artifactoryServer.publishBuildInfo buildInfoTemp
                }
			}
		}
	}
}
