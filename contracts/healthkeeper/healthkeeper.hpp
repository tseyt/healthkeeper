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
    ACTION accesspdata(name username, uint16_t patient_id);

  private:
    TABLE user_info {
      name        username;
      uint16_t    patient_id = 1;

      auto primary_key() const { return username.value; }
    };
    typedef multi_index<name("users"), user_info> users_table;

    users_table _users;
};
