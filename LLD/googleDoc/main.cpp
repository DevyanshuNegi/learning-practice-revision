#include <iostream>
#include <bits/stdc++.h>

using namespace std;


class DocumentElement{
    public:
    virtual void render() = 0;
};

class TextElement: public DocumentElement{
    public:
    void render() override {
        cout << "rendering the text" << endl;
    }
};

class ImageElement: public DocumentElement{
    public:
    void render() override {
        cout << "rendering the image" << endl;
    }
};


class Document {
    vector<DocumentElement*> docElements;
    
    public:
    void addElement(DocumentElement &de) {
        docElements.push_back(&de);
    }

};

class Persistence {
    public:
    virtual void save() = 0;

};

class saveToFile:public Persistence {
    public:
    void save() override{
        cout  << "saving to file " << endl;
    }
};

class saveToDB: public Persistence {
    public:
    void save() override{
        cout << "saving to DB" << endl;
    }
};



class DocumentEditor {
    Document doc;
    // Persistence* db;

    public:
    void addText() {
        
    }
};


int main() {

}