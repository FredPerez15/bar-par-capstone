from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from models import db, User, Recipe, Ingredient, Inventory

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://bar_par_2cd4_user:8hBNqbTMIe4RUlHMJ3eTh1q87zhqM8S0@dpg-chihb1qk728hm23fp9g0-a.ohio-postgres.render.com/bar_par_2cd4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
db.init_app(app)

with app.app_context():
    db.create_all()
migrate = Migrate(app, db)
CORS(app)
api = Api(app)


class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            try:
                new_user = User(
                    username = data['username'],
                    email = data['email'],
                )
            except Exception as ex:
                return make_response({"errors": [ex.__str__()]}, 422)
            db.session.add(new_user)
            db.session.commit()

            response_dict = new_user.to_dict()

            response = make_response(
                response_dict,
                201,
            )
            return response
        else:
            return make_response(user.to_dict(), 200)    
api.add_resource(Login, '/login')

class Recipes(Resource):
    def get(self):
        recipe = [recipe.to_dict() for recipe in Recipe.query.all()]
        return recipe

    def post(self):
        data = request.get_json()
        try:
            new_rec = Recipe(
                name = data['name'],
                description = data['description'],
                user_id= data['user_id']
            )
            db.session.add(new_rec)
            db.session.commit()
            return make_response(new_rec.to_dict(), 201)
        except Exception as ex:
                return make_response({"errors": [ex.__str__()]}, 400)

api.add_resource(Recipes, '/recipes')

class RecipeById(Resource):
    def get(self, id):
        recipe_by_id = Recipe.query.filter_by(id=id).first()
        if not recipe_by_id:
            return make_response({"error": "Recipe not found"}, 404)
        return make_response(recipe_by_id.to_dict(), 200)
    
    def patch(self, id):
        data = request.get_json()
        recipe_by_id = Recipe.query.filter_by(id=id).first()
        if not recipe_by_id:
            return make_response({"error": "recipe not found"}, 400)
        for attr in data:
            setattr(recipe_by_id, attr, data[attr])
        db.session.add(recipe_by_id)
        db.session.commit()
        return make_response(recipe_by_id.to_dict(), 202)

    def delete(self, id):
        recipe_by_id = Recipe.query.filter_by(id=id).first()
        db.session.delete(recipe_by_id)
        db.session.commit()

api.add_resource(RecipeById, '/recipes/<int:id>')


class Ingredients(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_ing = Ingredient(
                name= data['name'],
                ing_type= data['ing_type'],
                par_level= data['par_level']
            )
            db.session.add(new_ing)
            db.session.commit()
            return make_response(new_ing.to_dict(), 201)
        except Exception as ex:
                return make_response({"errors": [ex.__str__()]}, 400)

api.add_resource(Ingredients, '/ingredients')


if __name__ == '__main__':
    app.run(debug=True)