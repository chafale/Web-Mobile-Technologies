from flask import Flask  
app = Flask(__name__)  
 
@app.route('/home')  
def home():  
    return "hello, welcome to our website";  
  
if __name__ =="__main__":  
    app.run(host='localhost', port='8088', debug = True) 