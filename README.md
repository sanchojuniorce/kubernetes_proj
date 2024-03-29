# Build Image
docker build . -t node_app -f docker/Dockerfile

# Verify LoadBalancer if not installed, execute command:
kubectl create deployment hello-node --image=registry.k8s.io/e2e-test-images/agnhost:2.39 -- /agnhost netexec --http-port=8080


# Execute Kubectl
kubectl apply -f ./k8/deployments/deployment.yaml

# Checking Pod
kubectl get pods

# Verify log pod
kubectl logs myapp-deployment-6fb68c7f5d-zdc76

# Destroy deployments, services, pods, daemonset

kubectl delete deployments --all
kubectl delete services --all
kubectl delete pods --all
kubectl delete daemonset --all