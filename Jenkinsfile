/**
 *   Jenkins build script for Tomcat G1 template
 *
 */

pipeline {
	agent any
    options { disableConcurrentBuilds() }

    environment {
        containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
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
				withCredentials([azureServicePrincipal('AZURE_JENKINS_PRINCIPLE')]) {
                sh 'ssh -i #NOT SURE WHAT GOES HERE# bbhowmik@majic-student.canadacentral.cloudapp.azure.com'
		sh 'cd apache2'
		sh 'git clone https://github.scs-lab.com/Jack/HelloWorld_HTML.git HelloWorld_HTML'
		sh 'cd HelloWorld_HTML'
		sh 'make'
                    
                }
				//todo G1 deployment integration
                println("Need something to do here")

			}
        
        }                
    }
}
