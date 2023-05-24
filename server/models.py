from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy


db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-created_at', '-updated_at', 'recipes')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String)
    cocktail_bar = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    recipes = db.relationship('Recipe', backref='user', cascade='all, delete, delete-orphan')

    @validates('username')
    def valid_username(self, key, username):
        if not username:
            raise ValueError('Username is required')
        return username

    @validates('email')
    def valid_email(self, key, email):
        if not email:
            raise ValueError('Email is required')
        return email

    @validates('password')
    def valid_pword(self, key, pword):
        if not pword:
            raise ValueError('Password is required')
        return pword

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    serialize_rules = ('-created_at', '-updated_at', '-inventories', '-user', 'ingredients')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    inventories = db.relationship('Inventory', backref='recipe', cascade='all, delete, delete-orphan')
    ingredients = association_proxy('inventories', 'recipe')

    @validates('name')
    def valid_username(self, key, name):
        if not name:
            raise ValueError('Name is required')
        return name

class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    serialize_rules = ('-created_at', '-updated_at', '-recipe_id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ing_type = db.Column(db.String, nullable=False)
    par_level = db.Column(db.Integer)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @validates('name')
    def valid_username(self, key, name):
        if not name:
            raise ValueError('Name is required')
        return name

    @validates('ing_type')
    def valid_username(self, key, ing_type):
        if not ing_type:
            raise ValueError('Type of Ingredient is required')
        return ing_type

class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventories'

    serialize_rules = ('-created_at', '-updated_at', '-recipe_id', '-recipes', '-ingredients')

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id')) 
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @validates('quantity')
    def valid_username(self, key, quantity):
        if not quantity:
            raise ValueError('Quantity is a required field')
        return quantity
    