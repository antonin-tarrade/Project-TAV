from flask import Flask
from flask_cors import CORS
from app.routes import main
import os

# Get the directory of the current script
current_script_dir = os.path.dirname(os.path.abspath(__file__))

# Get the parent directory of the current script
parent_dir = os.path.dirname(current_script_dir)

# Construct the path to the music folder
music_folder_path = os.path.join(parent_dir, 'matlab', 'TP11', 'Shazam', 'base_maxi')

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(current_script_dir, 'uploads')
app.config['RESULT_FOLDER'] = os.path.join(current_script_dir, 'results')
app.config['MUSIC_FOLDER'] = music_folder_path

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(main)

if __name__ == '__main__':
    app.run(debug=True)
