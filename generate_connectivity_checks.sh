#!/bin/bash

while true; do
    #sleep 0.5
    curl http://localhost:8080/connectivity/check
    echo ""
done