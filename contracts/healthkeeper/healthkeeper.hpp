#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT healthkeeper : public contract {
  public:
    using contract::contract;

    healthkeeper( name receiver, name code, datastream<const char*> ds ):contract(receiver, code, ds),
                       _users(receiver, receiver.value) {}

    ACTION login(name username);
    ACTION clear();
	ACTION access(name username);

  private:
    TABLE user_info {
      name    user;

      auto primary_key() const { return user.value; }
    }
    typedef multi_index<name("users"), user_info> users_table;

    users_table _users;
};
