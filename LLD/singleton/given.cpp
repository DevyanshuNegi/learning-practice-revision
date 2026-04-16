#include <iostream>
using namespace std;

class Singleton {
    Singleton() { cout << "Instance Created\n"; }
    ~Singleton() = default;

    // prevent copying/moving
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
    Singleton(Singleton&&) = delete;
    Singleton& operator=(Singleton&&) = delete;

public:
    // thread-safe, lazy-initialized (C++11+)
    static Singleton& getInstance() {
        static Singleton instance;
        return instance;
    }
};

int main() {
    Singleton& s1 = Singleton::getInstance();
    Singleton& s2 = Singleton::getInstance();

    cout << (&s1 == &s2) << endl; // prints 1
}
