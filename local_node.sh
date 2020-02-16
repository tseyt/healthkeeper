nodeos -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --contracts-console

# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n hackcewitwal2 --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > local_healthkeeper_wallet_password.txt
# unlock wallet
cleos wallet unlock -n hackcewitwal2 --password $(cat local_healthkeeper_wallet_password.txt)
# Owner key for hackcewitwal2 wallet
cleos wallet import -n hackcewitwal2 --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for hackcewitwal2 wallet
cleos wallet import -n hackcewitwal2 --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N
# Import hackcewitacc private key
cleos wallet import -n hackcewitwal2 --private-key 5JXsXPMcm9VSFagXrka2x4ihYS1sfdZQPBxm4CsN9GpDMdZoCpN
# Import johndoemd123 private key
cleos wallet import -n hackcewitwal2 --private-key 5J3bbRR6rdMqRW48vbzYf74Dnd6GV63nNYZbrzX8aoargd6icCS

# create account for hackcewitacc with above wallet's public keys
cleos create account eosio hackcewitacc EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9
