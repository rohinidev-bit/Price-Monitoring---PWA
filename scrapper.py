import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db=firestore.client()

db.collection('devices').add({'name':'John','age':40})
def my_function(fname):
  print(fname + " Refsnes")




