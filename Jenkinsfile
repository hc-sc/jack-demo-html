pipeline {
    agent {
        docker {
            image 'my-apache2'
            args '-v $HOME/.m2:/root/.m2'
        }
    }
    stages {
        stage('update files') {
            steps {
                sh 'docker restart apache2'
            }
        }
    }
}
