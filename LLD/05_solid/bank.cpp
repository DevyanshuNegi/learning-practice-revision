#include <iostream>
#include <bits/stdc++.h>

using namespace std;


class DepositOnlyAcc{
    string name;
    int amount;

    public:
    DepositOnlyAcc(string n):name(n) {}

    virtual void deposite(int a);
};

class WithdrawableAcc: public DepositOnlyAcc {

    public:
    virtual void withdraw(int a);
}

class CurrentAcc: public WithdrawableAcc {

    public:

}