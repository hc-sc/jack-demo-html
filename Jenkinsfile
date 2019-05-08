pipeline {
    agent {
        label 'standardv2'
    }

    environment {
        containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
        containerRegistry = 'build.scs-lab.com:5000'
        containerRegistryPull = 'build.scs-lab.com'
    }

    stages {

        stage('Version Info') {
            steps {
                node("master") {
                    checkout scm
                    script {

                        //Get basic meta-data
                        versions = load './buildSrc/src/main/groovy/Version.groovy'
                        rootGroup = versions.getRootGroup()
                        rootVersion = versions.getRootVersion()
                        buildId = env.BUILD_ID
                        version = rootVersion + "." + (buildId ? buildId : "MANUAL-BUILD")
                        module = rootGroup


                        // Setup Artifactory connection
                        artifactoryServer = Artifactory.server 'default'
                        artifactoryDocker = Artifactory.docker server: artifactoryServer
                        buildInfo = Artifactory.newBuildInfo()

                    }
                }
            }
        }

      

        stage("Publish to Artifactory") {
            steps {
                script {
                    def buildInfoTemp
                    buildInfoTemp = artifactoryDocker.push "${containerRegistry}/php/${rootGroup}.phpserver:${version}", 'docker-local'
                    buildInfo.append buildInfoTemp
                    buildInfoTemp = artifactoryDocker.push "${containerRegistry}/php/${rootGroup}.mysql:${version}", 'docker-local'
                    buildInfo.append buildInfoTemp
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
                    id -> jiraComment body: "*Build Result ${resultString}* Module: ${module} Version: ${version} [Details|${env.BUILD_URL}]", issueKey: id
                }
            }
        }
    }
}
