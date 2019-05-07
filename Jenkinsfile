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

        stage('HA Proxy - Common') {
            steps {
                sh """
                    docker build -t haproxy-common ./common/
                """
            }
        }
        stage('HA Proxy - Open') {
            steps {
                sh """
                    docker login -u ${containerRegistryCredentials_USR} -p ${containerRegistryCredentials_PSW} ${
                    containerRegistry
                }
                    echo "done"
                    docker build -t haproxy:${version}-open ./open/
                    docker tag haproxy:${version}-open ${containerRegistry}/jack/haproxy:${version}-open
                """
                script {
                    def buildInfoTemp
                    buildInfoTemp = artifactoryDocker.push "${containerRegistry}/jack/haproxy:${version}-open", 'docker-local'
                    buildInfo.append buildInfoTemp
                }
            }
        }

        stage('HA Proxy - Secure (TLS)') {
            steps {
                sh """
                    docker login -u ${containerRegistryCredentials_USR} -p ${containerRegistryCredentials_PSW} ${
                    containerRegistry
                }
                    echo "done"
                    docker build -t haproxy:${version}-secure ./secure/
                    docker tag haproxy:${version}-secure ${containerRegistry}/jack/haproxy:${version}-secure
                """
                script {
                    def buildInfoTemp
                    buildInfoTemp = artifactoryDocker.push "${containerRegistry}/jack/haproxy:${version}-secure", 'docker-local'
                    buildInfo.append buildInfoTemp
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