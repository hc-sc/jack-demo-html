/**
 *   Jenkins build script for Tomcat G1 template
 *
 */

pipeline {

    options { disableConcurrentBuilds() }

    environment {
        containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
        containerRegistry = 'build.scs-lab.com:5000'
        containerRegistryPull = 'build.scs-lab.com'
    }

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
