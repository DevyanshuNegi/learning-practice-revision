#include <iostream>
#include <bits/stdc++.h>

using namespace std;


// class Product {
//     int price;
//     string name;
//     public:
//     Product (int p, string n):price p, name n {}
// }

class Product {
    int price;
    string name;
    public:
    Product(int p, string n) : price(p), name(n) {}
};

class SaveToDB {
    public:
    void save() {
        cout << "Saved " << endl;
    }
};

class Cart {
    vector<Product*> prods;

    public:
    void addToCart(Product* p) {
        prods.push_back(p);
    }

    const vector<Product*>& getProds() {
        return prods;
    }


}

