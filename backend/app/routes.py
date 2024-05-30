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


# Map TP numbers to MATLAB function names
matlab_functions = {
    1: 'grayscale_image',
    6: 'GVF',
    3: 'function_for_tp3',
    4: 'function_for_tp4',
    5: 'function_for_tp5',
}

@main.route('/upload/TP<int:tp_number>', methods=['POST'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True) # Allow only from localhost:3000
def upload_file(tp_number):
    if 'image' not in request.files:
        return jsonify({'error': 'No file data'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)


    # Construct the path to the MATLAB function for the given TP number
    matlab_path = os.path.join(matlab_dir, f'TP{tp_number}')

    # Add the MATLAB function path
    eng.addpath(matlab_path, nargout=0)

    # Extract the arguments from the request
    args = request.form.getlist('args')

    # Convert the arguments to numbers
    args = list(map(float, args))
    # print the arguments
    print(len(args))
    for arg in args:
        print("arg" + arg.__str__() + "\n")

    

    # Call the appropriate MATLAB function to process the image
    matlab_function = matlab_functions[tp_number]
    result_path = os.path.join(current_app.config['RESULT_FOLDER'], 'result_' + filename)
    getattr(eng, matlab_function)(file_path, result_path,*args, nargout=0)


    response = jsonify({'processed_image_url': '/results/' + 'result_' + filename})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000") # Allow CORS
    response.headers.add('Access-Control-Allow-Credentials', 'true') # Allow credentials
    # # Delete the uploaded image
    # os.remove(file_path)
    return response

@main.route('/results/<filename>', methods=['GET'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True) # Allow only from localhost:3000
def get_result_image(filename):
    file_path = os.path.join(current_app.config['RESULT_FOLDER'], filename);
    response = send_file(file_path)
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000") # Allow CORS
    response.headers.add('Access-Control-Allow-Credentials', 'true') # Allow credentials
    #  # Delete the uploaded result
    # os.remove(file_path)
    return response
