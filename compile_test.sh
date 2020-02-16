c++ --std=c++11 test.cpp -o test $(pkg-config --cflags --libs libmongocxx) -Wl,-rpath,/usr/local/lib
