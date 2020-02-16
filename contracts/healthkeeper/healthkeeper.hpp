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
      string      payfone_api = "\"requestId\": \"3456789\", \"status\": 0, \"description\": \"Success.\", \"response\": \"transactionId\": \"12176093234\", \"payfoneAlias\": \"A1A4305C4VKRKKXC7E7DD87FE14E4E1C90MEKQZAWR09PEA304825FCC2081ADEB4A19F5D9961899A8F6G3DEA37A0783170BCFE2EEA9999AB6885E9BE5\", \"phoneNumber\": \"13472674163\", \"lineType\": \"Mobile\", \"carrier\": \"T-Mobile USA\", \"countryCode\": \"US\", \"isBaselined\": true, \"trustScore\": 1000";

      auto primary_key() const { return username.value; }
    };
    typedef multi_index<name("users"), user_info> users_table;

    users_table _users;
};
