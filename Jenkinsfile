pipeline {
    agent {
        label 'standardv1'
    }

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
                    // Setup Artifactory connection
                    artifactoryServer = Artifactory.server 'default'
                    artifactoryDocker = Artifactory.docker server: artifactoryServer
                    buildInfo = Artifactory.newBuildInfo()
                }
            }
        }

      
        stage("Publish to Artifactory") {
            steps {
                script {
                    artifactoryServer.publishBuildInfo buildInfo
                }
            }
        }
		
		stage("Deploy to Build") {
            steps {
                withCredentials([azureServicePrincipal('AZURE_JENKINS_PRINCIPLE')]) {
                    sh """
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID
                    az account set -s $AZURE_SUBSCRIPTION_ID
                    az aks get-credentials --resource-group SolutionsEnablement-Clusters --name build
                    ./javaserver.sh ${containerRegistryPull} ${rootGroup} ${version} ${buildId}
                    ./javaserver.sh ${containerRegistryPull} ${rootGroup} ${version} ${buildId} | kubectl create --namespace=build -f - 
                """
                }
            }
		}
	}
	
    post {
        always {
            script {
                resultString = "None"
            }
        }
        success {
            script {
                resultString = "Success"
            }
        }
        unstable {
            script {
                resultString = "Unstable"
            }
        }
        failure {
            script {
                resultString = "Failure"
            }
        }
        cleanup {
            emailext body: "<p>See build result details at: <a href='${env.JOB_URL}'>${env.JOB_URL}</a></p>", mimeType: 'text/html; charset=UTF-8', recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'DevelopersRecipientProvider'], [$class: 'UpstreamComitterRecipientProvider'], [$class: 'RequesterRecipientProvider']], replyTo: 'no-reply@build.scs-lab.com', subject: "${currentBuild.fullDisplayName} ${resultString}"
            script {
                jiraIssueSelector(issueSelector: [$class: 'DefaultIssueSelector'])
                        .each {
                    id -> jiraComment body: "*Build Result ${resultString}* Docker: #${version} [Details|${env.BUILD_URL}]", issueKey: id
                }
            }
        }
    }
}
