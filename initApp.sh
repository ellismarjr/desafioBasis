#!/bin/bash

if [ "$#" -lt 1 ]
then
	echo "Usage mode: $0 start|stop"
	echo "Example $0 start"
	echo "Example $0 stop"
else
  if [ $1 = "start" ]
  then
    echo "Starting database..."
  else
    echo "Stopping database..."
  fi
  sudo docker $1 desafioBasis
fi
