/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
    stages {
	    //stage("Grunt Tasks") {
		//}
	    

	stage("Tests") {
		 when {
                branch 'master'
            }
            steps {

		sh 'ls'
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
