from flask import Blueprint, request, jsonify, send_file, current_app, make_response
import matlab.engine
import os
from werkzeug.utils import secure_filename
from flask_cors import cross_origin

main = Blueprint('main', __name__)

# Start MATLAB engine
eng = matlab.engine.start_matlab()
# Get the absolute path to the directory containing the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the MATLAB functions
matlab_dir = os.path.join(script_dir, '../../matlab')

# Add the MATLAB function path
eng.addpath(matlab_dir, nargout=0)

@main.route('/upload', methods=['POST'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True) # Allow only from localhost:3000
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file data'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Call MATLAB function to process the image
    result_path = os.path.join(current_app.config['RESULT_FOLDER'], 'result_' + filename)
    eng.grayscale_image(file_path, result_path, nargout=0)

    response = jsonify({'processed_image_url': '/results/' + 'result_' + filename})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000") # Allow CORS
    response.headers.add('Access-Control-Allow-Credentials', 'true') # Allow credentials
    return response

@main.route('/results/<filename>', methods=['GET'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True) # Allow only from localhost:3000
def get_result_image(filename):
    response = send_file(os.path.join(current_app.config['RESULT_FOLDER'], filename))
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000") # Allow CORS
    response.headers.add('Access-Control-Allow-Credentials', 'true') # Allow credentials
    return response
