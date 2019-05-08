/**
 *   Jenkins build script for Tomcat G1 template
 *
 */

pipeline {
	agent any	
    options { disableConcurrentBuilds() }

    environment {
        containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
        containerRegistry = 'build.scs-lab.com:5000'
        version = "3.0.${env.BUILD_ID}"
    }

    stages {
        
		stage('Environment Setup') {
            steps {
                checkout scm
                script{
                    artifactoryServer = Artifactory.server 'default'
                    artifactoryDocker = Artifactory.docker server: artifactoryServer
                    buildInfo = Artifactory.newBuildInfo()
                }
            }
        }
		
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

        stage("Update HTML ile") {
            when {
                branch 'master'
            }
		
            steps {
		     withCredentials([azureServicePrincipal('AZURE_JENKINS_PRINCIPLE')]) {
                    sh """
                        cd ./k8s
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID
                        az account set -s $AZURE_SUBSCRIPTION_ID
                        az aks get-credentials --resource-group SolutionsEnablement-Clusters --name build
                        ./phpserver.sh ${containerRegistryPull} ${rootGroup} ${version} ${buildId}
                        ./phpserver.sh ${containerRegistryPull} ${rootGroup} ${version} ${buildId} | kubectl create --namespace=build -f - 
                    """
                }
	    
        
                //todo G1 deployment integration
                println("Need something to do here")
            }
        }

    }
}
