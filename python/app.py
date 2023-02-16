import os
from flask import Flask, abort, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import bcrypt
import sqlite3
from requests import Session
from sqlalchemy import create_engine

db = SQLAlchemy()
app = Flask(__name__)
app.secret_key = "unsafe.secret"
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///mydatabase.sqlite'
db.init_app(app)

_GOOGLE_CLIENT_ID_ = "852644168320-677khcsl54gigpuifr81gqqrp9rin0s3.apps.googleusercontent.com"



cors = CORS(app)
#flow = Flow.from_cleint_secrets_file()

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  password = db.Column(db.String, nullable=False)
  google_id = db.Column(db.String, nullable=True, unique=True)
  email = db.Column(db.String, nullable=False)
  name = db.Column(db.String, nullable=False)
  is_admin = db.Column(db.Boolean, nullable=False)
  religious_centers = db.relationship('ReligiousCenter', backref='user', lazy=True)
  reviews = db.relationship('Review', backref='user', lazy=True)

class ReligionType(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  desc = db.Column(db.String, nullable=True) 
  image = db.Column(db.String, nullable=True)

class ReligiousCenter(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  lat = db.Column(db.Float, nullable=False)
  lng = db.Column(db.Float, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  desc = db.Column(db.String)
  image = db.Column(db.String)
  religion_type_id = db.Column(db.Integer, db.ForeignKey('religion_type.id'), nullable=False)
  reviews = db.relationship('Review', backref='religious_center', lazy=True)    

class ReligiousAnnouncment(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  religious_center_id = db.Column(db.Integer, db.ForeignKey('religious_center.id'), nullable=False)
  religious_center = db.relationship('ReligiousCenter', backref=db.backref('announcements', lazy=True))
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  user = db.relationship('User', backref=db.backref('announcements', lazy=True))
  announcment = db.Column(db.String)

class Review(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  religious_center_id = db.Column(db.Integer, db.ForeignKey('religious_center.id'), nullable=False)
  mark = db.Column(db.Integer, nullable=False)
  review_text = db.Column(db.String, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

with app.app_context():
    db.create_all()

def login_is_required(function):
  def wrapper(*args, **kwargs):
    if "google_id" not in session:
      return abort(401) # dokonaj aborcji na nieautoryzowanym użytkowniku
    else:
      return function(*args, **kwargs)
  wrapper.__name__ = function.__name__
  return wrapper

#CRUD users
@app.route('/users', methods=['POST'])
def create_user():
  data = request.get_json()
  user1 = User.query.filter_by(google_id=data['google_id']).first()
  if(user1):
    return jsonify({'message': 'User with such google_id exists.', 'user_google_id': data['google_id']}), 422
  new_user = User( password=bcrypt.hashpw((data['password']).encode(), bcrypt.gensalt()),
                   google_id=data['google_id'], 
                   email=data['email'], 
                   name=data['name'], 
                   is_admin = data['is_admin'])
  db.session.add(new_user)
  db.session.commit()
  return jsonify({'message': 'Successfully created user.', 'user_id': new_user.id}), 201

@app.route('/users/<int:user_id>', methods=['GET'])
#@login_is_required
def get_user(user_id):
  user = User.query.get(user_id)
  if user:
    jsonUser = {
      "password" : "****",
      "google_id" : user.google_id,
      "email" : user.email,
      "name" : user.name,
      "is_admin" : user.is_admin,
      "id" : user.id,
    }
    response = jsonify({'reviews': jsonUser})
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response, 200
  response = jsonify({'message': 'User not found.'})
  response.headers.add("Access-Control-Allow-Credentials", "true")
  return response, 404

@app.route('/users/<int:user_id>', methods=['PUT'])
#@login_is_required
def update_user(user_id):
  user = User.query.get(user_id)
  if user:
    data = request.get_json()
    user.password = bcrypt.hashpw((data['password']).encode(), bcrypt.gensalt())
    user.email = data['email']
    user.name = data['name']
    user.is_admin = data['is_admin']
    db.session.commit()
    return jsonify({'message': 'Successfully updated user.', 'user': user.__dict__}), 200
  return jsonify({'message': 'User not found.'}), 404

@app.route('/users/<int:user_id>/religious_centers', methods=['GET'])
#@login_is_required
def get_user_religious_centers(user_id):
  user = User.query.get(user_id)
  if user:
    data=[]
    religious_centers = ReligiousCenter.query.filter_by(user_id=user.id).all()
    for centre in religious_centers:
      
      jsonCentre = { 
        "id" : centre.id,
        "name" : centre.name,
        "lat" : centre.lat,
        "lng" : centre.lng,
        "user_id" : centre.user_id,
        "user": user,
        "desc" : centre.desc,
        "image" : centre.image,
        }
      data.append(jsonCentre)
    return jsonify({'religious_centers': data}), 200
  return jsonify({'message': 'User not found.'}), 404

@app.route('/users/<int:user_id>/reviews', methods=['GET'])
#@login_is_required
def get_user_reviews(user_id):
  user = User.query.get(user_id)
  if user:
    data = []
    reviews = Review.query.filter_by(user_id=user.id).all()
    for rev in reviews:
      jsonReview= {
        "id" : rev.id,
        "religious_center_id" : rev.religious_center_id,
        "mark" : rev.mark,
        "review_text" : rev.review_text,
        "user_id" : rev.user_id
      }
      data.append(jsonReview)
    return jsonify({'reviews': data}), 200
  return jsonify({'message': 'User not found.'}), 404

@app.route('/users', methods=['GET'])
#@login_is_required
def get_all_users():
  users = User.query.all()
  data = []
  for user in users:
    jsonUsers={
    "id" : user.id,
    "password" :  "****",
    "google_id" : user.google_id,
    "email" : user.email,
    "name" : user.name,
    "is_admin" : user.is_admin
    }
    data.append(jsonUsers)
  return jsonify({'users': data}), 200

#CRUD religious_centers
@app.route('/religious_centers', methods=['POST'])
#@login_is_required
def create_religious_center():
  data = request.get_json()
  new_center = ReligiousCenter(name=data['name'], lat=data['lat'], lng=data['lng'], user_id=data['user_id'], desc=data['desc'], image=data['image'], religion_type_id=data["religion_type_id"])
  db.session.add(new_center)
  db.session.commit()
  return jsonify({'message': 'Successfully created religious center.','center_id': new_center.id}), 201

@app.route('/religious_centers/<int:center_id>', methods=['GET'])
#@login_is_required
def get_religious_center(center_id):
  center = ReligiousCenter.query.get(center_id)
  if center:
      type = ReligionType.query.get(center.religion_type_id)
      user = User.query.get(center.user_id)
      jsonCentre = { 
        "id" : center.id,
        "name" : center.name,
        "lat" : center.lat,
        "lng" : center.lng,
        "user_name" : user.name,
        "user_id" : center.user_id,
        "desc" : center.desc,
        "image" : center.image,
        "religion_type_id" : center.religion_type_id,
        "type_name" : type.name
      }
      return jsonify({'religious_center': jsonCentre}), 200
  return jsonify({'message': 'Religious center not found.',}), 404

@app.route('/religious_centers/<int:center_id>', methods=['PUT'])
#@login_is_required
def update_religious_center(center_id):
  center = ReligiousCenter.query.get(center_id)
  if center:
    data = request.get_json()
    center.name = data['name']
    center.lat = data['lat']
    center.lng = data['lng']
    center.user_id = data['user_id']
    center.desc = data['desc']
    center.image= data['image']
    db.session.commit()
    return jsonify({'message': 'Successfully updated religious center.', 'religious_center': center.__dict__}), 200
  return jsonify({'message': 'Religious center not found.'}), 404

@app.route('/religious_centers/<center_id>', methods=['DELETE'])
#@login_is_required
def delete_religious_center(center_id):
  center = ReligiousCenter.query.get(center_id)
  if center:
    db.session.delete(center)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted religious center.'}), 200
  return jsonify({'message': 'Religious center not found.'}), 404

@app.route('/religious_centers/<int:center_id>/religion_type', methods=['GET'])
#@login_is_required
def get_religious_center_reviews(center_id):
  center = ReligiousCenter.query.get(center_id)
  if center:
    data = []
    reviews = Review.query.filter_by(religious_center_id=center_id).all()
    for rev in reviews:
      jsonReview= {
        "id" : rev.id,
        "religious_center_id" : rev.religious_center_id,
        "mark" : rev.mark,
        "review_text" : rev.review_text,
        "user_id" : rev.user_id
      }
      data.append(jsonReview)
    return jsonify({'reviews': data}), 200
  return jsonify({'message': 'Religious center not found.'}), 404

@app.route('/religious_centers', methods=['GET'])
def get_all_religion_centers():
  religion_centers = ReligiousCenter.query.all()
  data = []
  for religion_center in religion_centers:
    type = ReligionType.query.get(religion_center.religion_type_id)
    user = User.query.get(religion_center.user_id)
    jsonReligionCentres={
    "id" : religion_center.id,
    "name" : religion_center.name,
    "lat" : religion_center.lat,
    "lng" : religion_center.lng,
    "user_id" : religion_center.user_id,
    "user_name" : user.name,
    "desc" : religion_center.desc,
    "image" : religion_center.image,
    "religion_type_id" : religion_center.religion_type_id,
    "religion_type" : type.name
    }
    data.append(jsonReligionCentres)
  return jsonify({'religion_centers': data}), 200

#CRUD review
@app.route('/reviews', methods=['POST'])
#@login_is_required
def create_review():
  data = request.get_json()
  center = ReligiousCenter.query.get(data['religious_center_id'])
  if center:
    new_review = Review(religious_center_id=data['religious_center_id'], mark=data['mark'], review_text=data['review_text'], user_id=data['user_id'])
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Successfully created review.', 'review_id': new_review.id}), 201
  else:
    return jsonify({'message': 'Incorrect! this religious_centre does not exist in our environemtn.', 'religious_centre_id': data['religious_center_id']}), 404

@app.route('/reviews/<int:review_id>', methods=['GET'])
#@login_is_required
def get_review(review_id):
  review = Review.query.get(review_id)
  if review:
    jsonReview = {
        "id" : review.id,
        "religious_center_id" : review.religious_center_id,
        "mark" : review.mark,
        "review_text" : review.review_text,
        "user_id" : review.user_id
      }
    return jsonify({'review': jsonReview}), 200
  return jsonify({'message': 'Review not found.'}), 404

@app.route('/reviews/<int:review_id>', methods=['PUT'])
#@login_is_required
def update_review(review_id):
  review = Review.query.get(review_id)
  if review:
    data = request.get_json()
    review.religious_center_id = data['religious_center_id']
    review.mark = data['mark']
    review.review_text = data['review_text']
    review.user_id = data['user_id']
    db.session.commit()
    return jsonify({'message': 'Successfully updated review.', 'review':review.__dict__}), 200
  return jsonify({'message': 'Review not found.'}), 404

@app.route('/reviews/<int:review_id>', methods=['DELETE'])
#@login_is_required
def delete_review(review_id):
  review = Review.query.get(review_id)
  if review:
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted review.'}), 200
  return jsonify({'message': 'Review not found.'}), 404

@app.route('/reviews', methods=['GET'])
#@login_is_required
def get_all_reviews():
  reviews = Review.query.all()
  if reviews:
    data = []
    for review in reviews:
      json_reviews={
          "id" : review.id,
          "religious_center_id" : review.religious_center_id,
          "mark" : review.mark,
          "review_text" : review.review_text,
          "user_id" : review.user_id
        }
      data.append(json_reviews)
    return jsonify({'reviews': data}), 200
  return jsonify({'message': 'No reviews found.'}), 404
#CRUD religious_types
@app.route('/religion_types', methods=['POST'])
#@login_is_required
def create_religion_type():
  data = request.get_json()
  new_religion_type = ReligionType(name=data['name'])
  db.session.add(new_religion_type)
  db.session.commit()
  return jsonify({'message': 'Successfully created religion type.', 'religion_type_id': new_religion_type.id}), 201

@app.route('/religion_types/<int:religion_type_id>', methods=['GET'])
#@login_is_required
def get_religion_type(religion_type_id):
  religion_type = ReligionType.query.get(religion_type_id)
  if religion_type:
    jsonRelType = {
        "id" : religion_type.id,
        "name" : religion_type.name
      }
    return jsonify({'religion_type': jsonRelType}), 200
  return jsonify({'message': 'Religion type not found.'}), 404

@app.route('/religion_types/<int:religion_type_id>', methods=['PUT'])
#@login_is_required
def update_religion_type(religion_type_id):
  religion_type = ReligionType.query.get(religion_type_id)
  if religion_type:
    data = request.get_json()
    religion_type.name = data['name']
    religion_type.desc = data['desc']
    religion_type.image = data['image']
    db.session.commit()
    return jsonify({'message': 'Successfully updated religion type.', 'religion_type': religion_type.__dict__}), 200
  return jsonify({'message': 'Religion type not found.'}), 404

@app.route('/religion_types/<int:religion_type_id>', methods=['DELETE'])
#@login_is_required
def delete_religion_type(religion_type_id):
  religion_type = ReligionType.query.get(religion_type_id)
  if religion_type:
    db.session.delete(religion_type)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted religion type.'}), 200
  return jsonify({'message': 'Religion type not found.'}), 404

@app.route('/religion_types', methods=['GET'])
#@login_is_required
def get_all_religion_types():
  religion_types = ReligionType.query.all()
  if religion_types:
    data = []
    for religion_type in religion_types:
      json_religion_types={
          "id" : religion_type.id,
          "name" : religion_type.name,
        }
      data.append(json_religion_types)
    return jsonify({'religion_types': data}), 200
  return jsonify({'message': 'No religion types found.'}), 404
#########################################################################
print("ok")
if __name__ == '__main__':
    app.run()


@app.route("/login", methods=['POST'])
def login():
    session["google_id"]="test"
    response = jsonify({'message': 'You are now logged in.', 'google id': session["google_id"]})
    response.status_code = 201
    return response, 201

@app.route("/logout", methods=['GET'])
def logout():
  session.clear()
  return jsonify({'message': 'You have logout' }), 201

@app.route("/login-test", methods=['GET'])
def loginTest():
   if "google_id" not in session:
     return jsonify({'message': 'You are not logged'}), 401
   else:
     return jsonify({'message': 'You are logged as', 'google id': session["google_id"] }), 201

@app.route("/callback")
def callback():
  pass