/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
    stages {

	stage("Tests") {
		 when {
                branch 'master'
            }
            steps {
		sh '''
		grunt htmllint
		grunt cssmin --force
		grunt uglify --force
		//grunt mocha --force
		'''  
	    }
	    }
	    
	    stage("Deploy") {
            when {
                branch 'master'
            }
            steps {
                    println("File has been updated to")
		    sh '''
          			sudo ls -al
				locate -i index.html
				cat index.html	
                    '''
			}
        
        }                
    
	}
}
