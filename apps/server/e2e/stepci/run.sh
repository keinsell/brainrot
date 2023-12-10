rtx x nodejs@20 -- node -v && stepci run ./account.workflow.yml
#docker run \
#       -v "$(pwd)"/.:/tests \
#       ghcr.io/stepci/stepci \
#       tests/account.workflow.yml