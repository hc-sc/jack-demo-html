pipeline {
	agent any	
    options { disableConcurrentBuilds() }

    stages {

        stage('appmeta Info') {
            steps {
                checkout scm
                script {

                    def properties = readProperties  file: 'appmeta.properties'

                    //Get basic meta-data and store it 
                    rootGroup = properties.root_group
                    rootVersion = properties.root_version
                    buildId = env.BUILD_ID
                    version = rootVersion + "." + (buildId ? buildId : "MANUAL-BUILD")
                    module = rootGroup
                }
            }
        }        

        stage("Update HTML File") {
            when {
                branch 'master'
            }
            steps {
                sh """ 
		  docker stop apache2
		"""
            }
        }

    }
}
