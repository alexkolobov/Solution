#include <iostream>
#include <string>
#include <nan.h>

using namespace std;
using namespace v8;

void Compare(const Nan::FunctionCallbackInfo<v8::Value>& info) {

  if (info.Length() < 2) {
    Nan::ThrowTypeError("Wrong number of arguments");
    return;
  }
	
  String::Utf8Value arg0 (info[0]->ToString());
  String::Utf8Value arg1 (info[1]->ToString());
  

  string s0 = string(*arg0);
  string s1 = string(*arg1);
  
  int f = s0.compare(s1);
  
  Local<Number> res = Nan::New(f);
  info.GetReturnValue().Set(res);
}

void Init(v8::Local<v8::Object> exports) {
  exports->Set(Nan::New("compare").ToLocalChecked(),
               Nan::New<v8::FunctionTemplate>(Compare)->GetFunction());
}

NODE_MODULE(addon, Init)