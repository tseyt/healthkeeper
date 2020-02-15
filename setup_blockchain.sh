#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

if [ ! -e "initialized" ]
then

  echo "=== setup wallet: eosiomain ==="
  # First key import is for eosio system account
  cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
  cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

  echo "=== setup wallet: hackcewitwal ==="
  # key for eosio account and export the generated password to a file for unlocking wallet later
  cleos wallet create -n hackcewitwal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > healthkeeper_wallet_password.txt
  # Owner key for hackcewitwal wallet
  cleos wallet import -n hackcewitwal --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
  # Active key for hackcewitwal wallet
  cleos wallet import -n hackcewitwal --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N

  # create account for hackcewitacc with above wallet's public keys
  cleos create account eosio hackcewitacc EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9

fi

echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
./deploy_contract.sh healthkeeper hackcewitacc hackcewitwal $(cat healthkeeper_wallet_password.txt)

echo "=== create user accounts ==="
# script for create data into blockchain
./create_accounts.sh

echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "initialized"
