// just create a private constructor
// creates a static instance (getInstance) 
// that return sthe same instance every time.

 
#include <iostream>
#include <mutex>

using namespace std;


class Burger {
    static Burger* burger;
    static mutex mtx;
    
    Burger() {
        cout << "Creating an object" << endl;
    }

    public:
    static Burger* createBurger() {

        if(burger == NULL) {
            // Locking to make it thread safe
            lock_guard<mutex> lock(mtx); 
            if(burger == NULL) {
                burger = new Burger();
            }
        }
        return burger;
    }
};

//  idhar bs burger mai null val dal rhe hai oor kuch nahi
//  C++ mai outside the class hi dal skte hai
Burger* Burger::burger = NULL;


int main() {
    Burger* b = Burger::createBurger();
    Burger* a = Burger::createBurger();

    cout << (a==b) << endl;

}