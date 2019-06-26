pipeline {
	agent {
		label 'jack-demo-html'
	}

	environment {
		API_KEY = credentials('UserID_Artifactory')
	}

	options {
		disableConcurrentBuilds()
	}

	stage("Testing") {
		stage("Tests") {
			steps {
				sh '''
				grunt htmllint
				mocha
				'''  
			}
		}
	}

	stage("production-build") {
		when{
			branch 'master'
		}
		steps {
			sh '''
			npm run build - prod 
            '''  
		}
	}

	stage("Publish to Artifactory") {
		when {
			branch 'master'
		}
		steps {
			sh '''
			
			'''
		}
	}
}