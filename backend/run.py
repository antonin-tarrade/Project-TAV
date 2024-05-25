from flask import Flask
from flask_cors import CORS
from app.routes import main
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
app.config['RESULT_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'results')

CORS(app, supports_credentials=True)

app.register_blueprint(main)

if __name__ == '__main__':
    app.run(debug=True)
