/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
    stages {
        
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
                println("Need something to do here")
			}
        
        }                
    
	}
}
