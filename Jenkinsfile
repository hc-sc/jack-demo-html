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
		      				
                    				ls -lah
						//cd
						//sudo -i
						//cd
						//cd apache2
						//git pull https://github.scs-lab.com/Jack/HelloWorld_HTML.git
                    '''
                println("Need something to do here")
			}
        
        }                
    
	}
}
