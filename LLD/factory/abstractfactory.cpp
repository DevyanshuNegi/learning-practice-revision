// This is when we are creating 
// two franchises :
//      singh and king burger
// two products :
//      bread and garlig bread
// three tier
//      basic, standard and premium
// 


#include <iostream>
using namespace std;
#include <bits/stdc++.h>





class Burger
{
public:
    virtual void prepare() = 0;
};

class BasicB : public Burger
{
    void prepare() override
    {
        cout << "Basic" << endl;
    }
};
class StdB : public Burger
{
    void prepare() override
    {
        cout << "Std" << endl;
    }
};
class PremiumB : public Burger
{
    void prepare() override
    {
        cout << "Premium" << endl;
    }
};

class BasicWB : public Burger
{
    void prepare() override
    {
        cout << "Basic W" << endl;
    }
};
class StdWB : public Burger
{
    void prepare() override
    {
        cout << "Std W" << endl;
    }
};
class PremiumWB : public Burger
{
    void prepare() override
    {
        cout << "Premium W" << endl;
    }
};






class Garlic
{
public:
    virtual void prepare() = 0;
};

class BasicG : public Garlic
{
    void prepare() override
    {
        cout << "Basic" << endl;
    }
};
class StdG : public Garlic
{
    void prepare() override
    {
        cout << "Std" << endl;
    }
};
class PremiumG : public Garlic
{
    void prepare() override
    {
        cout << "Premium" << endl;
    }
};

class BasicWG : public Garlic
{
    void prepare() override
    {
        cout << "Basic W" << endl;
    }
};
class StdWG : public Garlic
{
    void prepare() override
    {
        cout << "Std W" << endl;
    }
};
class PremiumWG : public Garlic
{
    void prepare() override
    {
        cout << "Premium W" << endl;
    }
};


// class BurgerFactory
// {
//     // vector<Burger*> burgers;
// public:
//     virtual Burger *createBurger(string type) = 0;
// };

class Factory {
    public:
    virtual Burger *createBurger(string type) = 0;
    virtual Garlic *createGarlic(string type) = 0;
};


class SinghBurger : public Factory
{
public:
    Burger *createBurger(string type) override
    {
        if (type == "basic")
        {
            return new BasicB();
        }
        else if (type == "standard")
        {
            return new BasicB();
        }
        else if (type == "premium")
        {
            return new PremiumB();
        }
        else
        {
            cout << "invalid burer tuype " << endl;
            return NULL;
        }
    }
};

class KingBurger : public Factory
{
public:
    Burger *createBurger(string type)
    {
        if (type == "basic")
        {
            return new BasicWB();
        }
        else if (type == "standard")
        {
            return new BasicWB();
        }
        else if (type == "premium")
        {
            return new PremiumWB();
        }
        else
        {
            cout << "invalid burer tuype " << endl;
            return NULL;
        }
    }
};




int main()
{

    string type = "basic";

    // SinghBurger *bf;
    // Burger *burger = bf->createBurger(type);
    // burger->prepare(); 

    return 0;
}