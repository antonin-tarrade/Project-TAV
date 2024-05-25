from flask import Flask

def create_app():
    app = Flask(__name__)

    # Configurations
    app.config['UPLOAD_FOLDER'] = 'uploads'
    app.config['RESULT_FOLDER'] = 'results'

    # Enregistrer les blueprints/routes
    from .routes import main
    app.register_blueprint(main)

    return app
