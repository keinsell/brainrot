kubectl create -f ./crds.yml -f ./common.yml -f ./operator.yml

# verify the rook-ceph-operator is in the `Running` state before proceeding
kubectl -n rook-ceph get pod

kubectl create -f ./cluster.yml

# Verify cluster
kubectl -n rook-ceph get pod

# Get pass
kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo

kubectl create -f ./dashboard-external-https.yaml