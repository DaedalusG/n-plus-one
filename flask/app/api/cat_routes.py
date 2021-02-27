from flask import Blueprint, jsonify
from app.models import Cat, Owner, Toy

cat_routes = Blueprint('cats', __name__)


@cat_routes.route('/')
def cats():
    cats = Cat.query.all()
    return {"cats": [cat.to_dict() for cat in cats]}

# query(User).options(
#     contains_eager(User.orders).
#     contains_eager(Order.items))


@cat_routes.route('/owners')
def owners():
    cats = Cat.query.all()
    return {"cats": [cat.to_dict(expand=['owner']) for cat in cats]}

@cat_routes.route('/toys')
def toys():
    cats = Cat.query.all()
    return {"cats": [cat.to_dict(expand=['toys']) for cat in cats]}
