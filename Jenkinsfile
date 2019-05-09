/**
 *   Jenkins build script for Tomcat G1 template
 *
 */

pipeline {
	agent any
    options { disableConcurrentBuilds() }
	
    environment {
		SSHCredentials = credentials('SSH_Cred')
        containerRegistry = 'build.scs-lab.com:5000'
        version = "3.0.${env.BUILD_ID}"
    }
	
	
    stages {
        
		stage('Environment Setup') {
            steps {
                checkout scm
                script{
                    artifactoryServer = Artifactory.server 'default'
                    artifactoryDocker = Artifactory.docker server: artifactoryServer
                    buildInfo = Artifactory.newBuildInfo()
                }
            }
        }
		
		stage('appmeta Info') {
            steps {
                checkout scm
                script {

                    def properties = readProperties  file: 'appmeta.properties'

                    //Get basic meta-data and store it 
                    rootGroup = properties.root_group
                    rootVersion = properties.root_version
                    buildId = env.BUILD_ID
                    version = rootVersion + "." + (buildId ? buildId : "MANUAL-BUILD")
                    module = rootGroup
                }
            }
        }        

        stage("Deploy") {
            when {
                branch 'master'
            }
		
            steps {

					withCredentials([SSHCredentials(credentialsId: 'amazon', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
					sh 'echo $PASSWORD'
					echo USERNAME
					echo "username is $USERNAME"
				}
				//todo G1 deployment integration
                println("Need something to do here")

			}
        
        }                
    }
}
