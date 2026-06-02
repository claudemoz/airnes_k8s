#!/bin/bash

SECRET_NAME="api-secrets"

kubectl create secret generic "$SECRET_NAME" \
  --from-env-file=../backend/.env

echo "Secret api $SECRET_NAME créé avec succès !"