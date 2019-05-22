/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
	options { disableConcurrentBuilds() }   	
	
    environment {
        Art_Usr = credentials('UserID_Artifactory')
		Art_Pass = credentials('Pass_Artifactory')
        containerRegistry = 'build.scs-lab.com:5000'
        containerRegistryPull = 'build.scs-lab.com'
    }
	
    stages {
		stage("Update Server") {
			steps {
				sh '''
				cat index.html
				'''
			}
		}	
					
        stage("Publish to Artifactory") {
            when {
                branch 'master'
            }
            steps {
				sh 'grunt artifactory'
            }
        }
	}
}
