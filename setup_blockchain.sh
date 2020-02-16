#!/usr/bin/env bash

echo "=== setup blockchain accounts and smart contract ==="

endpoint="http://jungle2.cryptolions.io:80"

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

if [ -e "initialized" ]
then

  echo "=== unlock wallet: hackcewitwal2 ==="
  # Owner key for hackcewitwal2 wallet
  cleos -u ${endpoint} wallet unlock -n hackcewitwal2 --password $(cat healthkeeper_wallet_password.txt)
 
  # create account for hackcewitacc with above wallet's public keys
  cleos -u ${endpoint} create account eosio hackcewitacc EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9

else

  echo "=== setup wallet: hackcewitwal2 ==="
  # key for eosio account and export the generated password to a file for unlocking wallet later
  cleos -u ${endpoint} wallet create -n hackcewitwal2 --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > healthkeeper_wallet_password.txt
  # unlock wallet
  cleos -u ${endpoint} wallet unlock -n hackcewitwal2 --password $(cat healthkeeper_wallet_password.txt)
  # Owner key for hackcewitwal2 wallet
  cleos -u ${endpoint} wallet import -n hackcewitwal2 --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
  # Active key for hackcewitwal2 wallet
  cleos -u ${endpoint} wallet import -n hackcewitwal2 --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N
  # Import hackcewitacc private key
  cleos -u ${endpoint} wallet import -n hackcewitwal2 --private-key 5JXsXPMcm9VSFagXrka2x4ihYS1sfdZQPBxm4CsN9GpDMdZoCpN
  # Import johndoemd123 private key
  cleos -u ${endpoint} wallet import -n hackcewitwal2 --private-key 5J3bbRR6rdMqRW48vbzYf74Dnd6GV63nNYZbrzX8aoargd6icCS

  # create account for hackcewitacc with above wallet's public keys
  cleos -u ${endpoint} create account eosio hackcewitacc EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9

fi

echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
./deploy_contract.sh healthkeeper hackcewitacc hackcewitwal2 $(cat healthkeeper_wallet_password.txt)

echo "=== create user accounts ==="
# script for create data into blockchain
./create_accounts.sh

echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "initialized"

cleos -u "http://jungle2.cryptolions.io:80" push transaction '{"delay_sec":0,"max_cpu_usage_ms":0,"actions":[{"account":"hackcewitacc","name":"clear","data":{},"authorization":[{"actor":"hackcewitacc","permission":"active"}]}]}'