#include <iostream>
using namespace std;

class Burger{
    public:
    virtual void prepare() = 0;
    // again you forgot to write the destructor logic
    virtual ~Burger() {}
};

class SmallBurger: public Burger{
    public:
    void prepare() override {
        cout << "preparing small burger " << endl;
    }
};

class LargeBurger: public Burger{
    public:
    void prepare() override {
        cout << "preparing large burger" << endl;
    }
};

class Pizza{
    public:
    virtual void prepare() = 0;
    virtual ~Pizza() {}
};

class SmallPizza: public Pizza{
    public:
    void prepare() override {
        cout<< "preparing small pizza " << endl;
    }
};

class LargePizza: public Pizza{
    public:
    void prepare() override {
        cout << "preparing large pizza " << endl;
    }
};




class SmallSpecialBurger: public Burger{
    public:
    void prepare() override {
        cout << "preparing smallSpecial burger " << endl;
    }
};

class LargeSpecialBurger: public Burger{
    public:
    void prepare() override {
        cout << "preparing largeSpecial burger" << endl;
    }
};


class SmallSpecialPizza: public Pizza{
    public:
    void prepare() override {
        cout<< "preparing smallSpecial pizza " << endl;
    }
};

class LargeSpecialPizza: public Pizza{
    public:
    void prepare() override {
        cout << "preparing largeSpecial pizza " << endl;
    }
};




class Factory{
    public:
    virtual Pizza* createPizza(string size) = 0;
    virtual Burger* createBurger(string size) = 0;

    virtual ~Factory() {}
};


class FactoryNormal : public Factory{

    public:
    Pizza* createPizza(string size) {
        if(size == "small") {
            return new SmallPizza;
        } else {
            return new LargePizza;
        }
    }

    Burger* createBurger(string size) {
        if(size == "small") {
           return new SmallBurger; 
        } else {
            return new LargeBurger;
        }
    }
};

class FactorySpecial : public Factory{

    public:
    Pizza* createPizza(string size) {
        if(size == "small") {
            return new SmallPizza;
        } else {
            return new LargePizza;
        }
    }

    Burger* createBurger(string size) {
        if(size == "small") {
           return new SmallSpecialBurger; 
        } else {
            return new LargeSpecialBurger;
        }
    }
};




int main() {
    FactoryNormal f;
    FactorySpecial sf;

    Burger* b = f.createBurger("small");
    Pizza* p = f.createPizza("large");
 
    b->prepare();
    p->prepare();

    delete b;
    delete p;


    Burger* specialBurger = sf.createBurger("small");
    specialBurger->prepare();
    return 0;
}
