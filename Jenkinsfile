/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent any
    options { disableConcurrentBuilds() }
	
    environment {
		SSHCredentials = credentials('AZURE_SSH')
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

        stage("Deploy") {
            when {
                branch 'master'
            }
            steps {
				withCredentials(('AZURE_SSH')) {
                    sh '''
						ssh -i mradwan@majic-student.canadacentral.cloudapp.azure.com
						sudo -i
						cd
						cd apache2
						git pull https://github.scs-lab.com/Jack/HelloWorld_HTML.git
                    '''
                }
                println("Need something to do here")
			}
        
        }                
    }
}
