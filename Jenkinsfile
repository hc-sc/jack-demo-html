/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
	options { disableConcurrentBuilds() }   	
	
    environment {
        API_KEY = credentials('UserID_Artifactory')
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
				sh '''
					ls
					grunt compress
					ls
					'''
            }
        }
	}
}
