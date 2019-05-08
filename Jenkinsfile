/**
 *   Jenkins build script for Tomcat G1 template
 *
 */

pipeline {
	agent any	
    options { disableConcurrentBuilds() }

    stages {

        stage('appmeta Info') {
            steps {
                checkout scm
                script {

                    def properties = readProperties  file: 'appmeta.properties'

                    //Get basic meta-data
                    rootGroup = properties.root_group
                    rootVersion = properties.root_version
                    buildId = env.BUILD_ID
                    version = rootVersion + "." + (buildId ? buildId : "MANUAL-BUILD")
                    module = rootGroup
                }
            }
        }        

        stage("Deploy to Build") {
            when {
                branch 'master'
            }
            steps {
                //todo G1 deployment integration
                println("Need something to do here")
            }
        }

    }
}
