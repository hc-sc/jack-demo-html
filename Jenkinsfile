/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
    options { disableConcurrentBuilds() }
	
    //environment {
	//containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
      //  containerRegistry = 'build.scs-lab.com:5000'
	//containerRegistryPull = 'build.scs-lab.com'
       // version = "3.0.${env.BUILD_ID}"
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
                    sh '''
						sudo -i
						cd
						cd apache2
						git pull https://github.scs-lab.com/Jack/HelloWorld_HTML.git
                    '''
                println("Need something to do here")
			}
        
        }                
    }
}
