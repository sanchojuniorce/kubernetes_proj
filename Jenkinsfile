pipeline {
    agent any
    stages {
        stage('clone projeto'){
            steps {
                git branch: 'main', credentialsId: 'eduardo.teixeira', url: 'https://github.com/sanchojuniorce/kubernetes_proj'
              
            }
        }

        stage('Deploy the Application') { 
            steps {
                sh "docker compose down"
                sh "docker build . -t node_app -f docker/Dockerfile --no-cache"
                sh "docker run -d -p 3000:3000 node_app"
                sh "minikube image load node_app"
                sh "kubectl create deployment hello-node --image=registry.k8s.io/e2e-test-images/agnhost:2.39 -- /agnhost netexec --http-port=8080"
                sh "kubectl apply -f ./k8/deployments/deployment.yaml"
                sh "kubectl expose deployment myapp-deployment --type=LoadBalancer --port=3000"
                sh "minikube tunnel"
            }
        }
    }
}
// pipeline {
//     agent any
//     environment {
//         PROJECT_ID = '<<Your GCP Project ID>>'
//         CLUSTER_NAME = '<<Your GKE Cluster Name>>'
//         LOCATION = '<<Your GKE Cluster Location>>'
//         CREDENTIALS_ID = 'multi-k8s'
//     }
//     stages {
//         stage("Checkout code") {
//             steps {
//                 checkout scm
//             }
//         }
//         stage("Build image") {
//             steps {
//                 script {
//                     myapp = docker.build("<<Your DockerHub username>>/hello:${env.BUILD_ID}")
//                 }
//             }
//         }
//         stage("Push image") {
//             steps {
//                 script {
//                     docker.withRegistry('https://registry.hub.docker.com', 'dockerID') {
//                             myapp.push("latest")
//                             myapp.push("${env.BUILD_ID}")
//                     }
//                 }
//             }
//         }        
//         stage('Deploy to GKE') {
//             steps{
//                 sh "sed -i 's/hello:latest/hello:${env.BUILD_ID}/g' deployment.yaml"
//                 step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
//             }
//         }
//     }    
// }