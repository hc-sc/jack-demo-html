pipeline {
    agent {
        label 'standardv1'
    }

    options { disableConcurrentBuilds() }

    environment {
        containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
        containerRegistry = 'build.scs-lab.com:5000'
        containerRegistryPull = 'build.scs-lab.com'
    }

    stages {

        stage('appmeta Info') {
            steps {
                node("master") {
                    checkout scm
                    script {

                        def properties = readProperties  file: 'appmeta.properties'

                        //Get basic meta-data
                        rootGroup = properties.root_group
                        rootVersion = properties.root_version
                        buildId = env.BUILD_ID
                        version = rootVersion + "." + (buildId ? buildId : "MANUAL-BUILD")
                        module = rootGroup

                        // Setup Artifactory connection
                        artifactoryServer = Artifactory.server 'default'
                        artifactoryDocker = Artifactory.docker server: artifactoryServer
                        //artifactoryGradle = Artifactory.newGradleBuild()
                        //artifactoryGradle.useWrapper = true
                        //artifactoryGradle.usesPlugin = true
                        //artifactoryGradle.deployer.deployArtifacts = true
                        //artifactoryGradle.deployer repo: 'gradle-local', server: artifactoryServer
                        //artifactoryGradle.resolver repo: 'gradle', server: artifactoryServer
                    }
                }
            }
        }

		stage("Deploy to Build") {
            steps {
                withCredentials([azureServicePrincipal('AZURE_JENKINS_PRINCIPLE')]) {
                    sh """
                    cd ./k8s
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

