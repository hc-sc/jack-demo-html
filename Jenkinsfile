/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
		   environment {
        	API_KEY = credentials('UserID_Artifactory')
		UserNameArt = credentials('UserID_Artifactory')
		PassArt = credentials('Pass_Artifactory')
    		}
	
	options { disableConcurrentBuilds() }   	

	
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
						sh '''

							grunt htmllint
							mocha
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
				// SonarQube Stage to be inserted here 
				// Other stages before building that can be done in parallel
			}
		}

	    
        stage("Publish to Artifactory") {
            when {
                branch 'master'
            }
            steps {
				//grunt compress
		    			sh '''
					ls
					
					grunt artifactory:client:publish
					'''
            }
        }
	}
}
