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
                    
		println("HTML Validation")
		sh 'grunt htmllint'
		println("CSS minifying")
		sh 'grunt cssmin'
		println("JS minify and Uglify")
		sh 'grunt uglify'    
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
