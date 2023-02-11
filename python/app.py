import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import bcrypt
import sqlite3

from sqlalchemy import create_engine

db = SQLAlchemy()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///mydatabase.sqlite'
db.init_app(app)


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  password = db.Column(db.String, nullable=False)
  google_id = db.Column(db.String, nullable=True, unique=True)
  email = db.Column(db.String, nullable=False)
  name = db.Column(db.String, nullable=False)
  is_admin = db.Column(db.Boolean, nullable=False)
  religious_centers = db.relationship('ReligiousCenter', backref='user', lazy=True)
  reviews = db.relationship('Review', backref='user', lazy=True)

class ReligiousCenter(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  lat = db.Column(db.Float, nullable=False)
  lng = db.Column(db.Float, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  desc = db.Column(db.String)
  image_bytes = db.Column(db.String)
  reviews = db.relationship('Review', backref='religious_center', lazy=True)    

class Review(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  religious_center_id = db.Column(db.Integer, db.ForeignKey('religious_center.id'), nullable=False)
  mark = db.Column(db.Integer, nullable=False)
  review_text = db.Column(db.String, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

with app.app_context():
    db.create_all()

#CRUD users
@app.route('/users', methods=['POST'])
def create_user():
  data = request.get_json()
  user1 = User.query.filter_by(google_id=data['google_id']).first()
  if(user1):
    return jsonify({'message': 'User with such google_id exists.', 'user_google_id': data['google_id']}), 404
  new_user = User( password=bcrypt.hashpw((data['password']).encode(), bcrypt.gensalt()),
                   google_id=data['google_id'], 
                   email=data['email'], 
                   name=data['name'], 
                   is_admin = data['is_admin'])
  db.session.add(new_user)
  db.session.commit()
  return jsonify({'message': 'Successfully created user.', 'user_id': new_user.id}), 201

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
  user = User.query.get(user_id)
  if user:
    jsonUser = [{
      "password" : "****",
      "google_id" : user.google_id,
      "email" : user.email,
      "name" : user.name,
      "is_admin" : user.is_admin,
      "id" : user.id,
      "religious_centers" : user.religious_centers,
      "reviews" : user.reviews
    }]
    return jsonify({'user': jsonUser}), 200
  return jsonify({'message': 'User not found.'}), 404

@app.route('/users/<int:user_id>', methods=['PUT'])
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
def get_user_religious_centers(user_id):
  user = User.query.get(user_id)
  if user:
    data=[]
    religious_centers = ReligiousCenter.query.filter_by(user_id=user.id).all()
    for centre in religious_centers:
      jsonCentre = [{ 
        "id" : centre.id,
        "name" : centre.name,
        "lat" : centre.lat,
        "lng" : centre.lng,
        "user_id" : centre.user_id,
        "desc" : centre.desc,
        "image_bytes" : centre.image_bytes,
        }]
      data.append(jsonCentre)
    return jsonify({'religious_centers': data}), 200
  return jsonify({'message': 'User not found.'}), 404

@app.route('/users/<int:user_id>/reviews', methods=['GET'])
def get_user_reviews(user_id):
  user = User.query.get(user_id)
  if user:
    data = []
    reviews = Review.query.filter_by(user_id=user.id).all()
    for rev in reviews:
      jsonReview= [{
        "id" : rev.id,
        "religious_center_id" : rev.religious_center_id,
        "mark" : rev.mark,
        "review_text" : rev.review_text,
        "user_id" : rev.user_id
    }]
    data.append(jsonReview)
    return jsonify({'reviews': data}), 200
  return jsonify({'message': 'User not found.'}), 404

#CRUD religious_centers
@app.route('/religious_centers', methods=['POST'])
def create_religious_center():
  data = request.get_json()
  new_center = ReligiousCenter(name=data['name'], lat=data['lat'], lng=data['lng'], user_id=data['user_id'], desc=data['desc'], image_bytes=data['image_bytes'])
  db.session.add(new_center)
  db.session.commit()
  return jsonify({'message': 'Successfully created religious center.','center_id': new_center.id}), 201

@app.route('/religious_centers/<int:center_id>', methods=['GET'])
def get_religious_center(center_id):
  center = ReligiousCenter.query.get(center_id)
  if center:
      jsonCentre = [{ 
        "id" : center.id,
        "name" : center.name,
        "lat" : center.lat,
        "lng" : center.lng,
        "user_id" : center.user_id,
        "desc" : center.desc,
        "image_bytes" : center.image_bytes,
      }]
      print("hej!")
      return jsonify({'religious_center': jsonCentre}), 200
  return jsonify({'message': 'Religious center not found.',}), 404

@app.route('/religious_centers/<int:center_id>', methods=['PUT'])
def update_religious_center(center_id):
  center = ReligiousCenter.query.get(center_id)
  if center:
    data = request.get_json()
    center.name = data['name']
    center.lat = data['lat']
    center.lng = data['lng']
    center.user_id = data['user_id']
    center.desc = data['desc']
    center.image_bytes = data['image_bytes']
    db.session.commit()
    return jsonify({'message': 'Successfully updated religious center.', 'religious_center': center.__dict__}), 200
  return jsonify({'message': 'Religious center not found.'}), 404

@app.route('/religious_centers/<center_id>', methods=['DELETE'])
def delete_religious_center(center_id):
  center = ReligiousCenter.query.get(center_id)
  if center:
    db.session.delete(center)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted religious center.'}), 200
  return jsonify({'message': 'Religious center not found.'}), 404

@app.route('/religious_centers/<int:center_id>/reviews', methods=['GET'])
def get_religious_center_reviews(center_id):
  center = ReligiousCenter.query.get(center_id)
  if center:
    data = []
    reviews = Review.query.filter_by(religious_center_id=center_id).all()
    for rev in reviews:
      jsonReview= [{
        "id" : rev.id,
        "religious_center_id" : rev.religious_center_id,
        "mark" : rev.mark,
        "review_text" : rev.review_text,
        "user_id" : rev.user_id
      }]
      data.append(jsonReview)
    return jsonify({'reviews': data}), 200
  return jsonify({'message': 'Religious center not found.'}), 404

#CRUD review
@app.route('/reviews', methods=['POST'])
def create_review():
  data = request.get_json()
  new_review = Review(religious_center_id=data['religious_center_id'], mark=data['mark'], review_text=data['review_text'], user_id=data['user_id'])
  db.session.add(new_review)
  db.session.commit()
  return jsonify({'message': 'Successfully created review.', 'review_id': new_review.id}), 201

@app.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
  review = Review.query.get(review_id)
  if review:
    jsonReview = [{
        "id" : review.id,
        "religious_center_id" : review.religious_center_id,
        "mark" : review.mark,
        "review_text" : review.review_text,
        "user_id" : review.user_id
      }]
    return jsonify({'review': jsonReview}), 200
  return jsonify({'message': 'Review not found.'}), 404

@app.route('/reviews/<int:review_id>', methods=['PUT'])
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
def delete_review(review_id):
  review = Review.query.get(review_id)
  if review:
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted review.'}), 200
  return jsonify({'message': 'Review not found.'}), 404

print("ok")
if __name__ == '__main__':
    app.run()