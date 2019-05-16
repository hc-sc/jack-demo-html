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
                node("master") {
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
                        //artifactoryGradle = Artifactory.newGradleBuild()
                        //artifactoryGradle.useWrapper = true
                        //artifactoryGradle.usesPlugin = true
                        //artifactoryGradle.deployer.deployArtifacts = true
                        //artifactoryGradle.deployer repo: 'gradle-local', server: artifactoryServer
                        //artifactoryGradle.resolver repo: 'gradle', server: artifactoryServer
                    }
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
						grunt mocha --force
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
				sudo ls -al
				locate -i index.html
				cat index.html
				'''
			}
		}	
		
		stage("Publish to Artifactory") {
            steps {
                script {
                    def buildInfoTemp
                    buildInfo = Artifactory.newBuildInfo()
                    buildInfoTemp = artifactoryDocker.push "${containerRegistry}/java/${rootGroup}.javaserver:${version}"
                    buildInfo.append buildInfoTemp
                    buildInfoTemp = artifactoryDocker.push "${containerRegistry}/java/${rootGroup}.postgres:${version}"
                    buildInfo.append buildInfoTemp
                    artifactoryServer.publishBuildInfo buildInfo
                }
            }
        }
	}
}
