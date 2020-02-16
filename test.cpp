// c++ --std=c++11 test.cpp -o test $(pkg-config --cflags --libs libmongocxx) -Wl,-rpath,/usr/local/lib

#include <cstdint>
#include <iostream>
#include <vector>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/stdx.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/instance.hpp>

using namespace std;
using namespace bsoncxx;
using bsoncxx::builder::stream::close_array;
using bsoncxx::builder::stream::close_document;
using bsoncxx::builder::stream::document;
using bsoncxx::builder::stream::finalize;
using bsoncxx::builder::stream::open_array;
using bsoncxx::builder::stream::open_document;
using bsoncxx::stdx::string_view;

int main(int, char**) {
    // Setup connection
    mongocxx::instance instance{}; // This should be done only once.
    mongocxx::uri uri("mongodb://eosio:yoshi@35.243.232.253/Patients");
    mongocxx::client conn(uri);

    // Setup db connection
    mongocxx::database db = conn["Patients"];
    mongocxx::collection collection = db["test"];

//    // Create a document
//    document doc{};
//    doc << "hello" << "world";
//
//    // Insert a document into the collection
//    auto result = collection.insert_one(doc.view());

    // Fetch all documents in the collection
    auto cursor = collection.find({});
    for (auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
    }

//    auto find_builder = bsoncxx::builder::stream::document{};
//    auto find_query = find_builder
//        << "_id" << open_document
//            << "$oid" << "5e4908f357a5fb27506e0c52"
//        << close_document
//        << finalize;

    // Fetch one document based on "_id"
    auto read_result = collection.find_one(
        bsoncxx::builder::stream::document{}
            << "_id" << bsoncxx::oid{stdx::string_view{"5e4908f357a5fb27506e0c52"}}
        << finalize);
    if (read_result) {
        cout << bsoncxx::to_json(*read_result) << endl;
    } else {
        cout << "Could not find document" << endl;
    }
}

