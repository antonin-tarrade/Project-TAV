from flask import Blueprint, request, jsonify, send_file, current_app
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
    5: 'patch_inpainting',
    6: 'GVF',
    8: 'TV_Hilbert',
    10: 'compression_avance',
    11: 'shazam',
}

def call_matlab_function(hasResult,tp_number,*args):
    # Construct the path to the MATLAB function for the given TP number
    matlab_path = os.path.join(matlab_dir, f'TP{tp_number}')

    # Add the MATLAB function path
    eng.addpath(matlab_path, nargout=0)

    # Call the appropriate MATLAB function
    matlab_function = matlab_functions[tp_number]
    result = getattr(eng, matlab_function)(*args, nargout=1) if hasResult else getattr(eng, matlab_function)(*args,nargout=0)
    return result

@main.route('/upload/TP<int:tp_number>', methods=['POST'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)
def upload_file(tp_number):
    if 'image' not in request.files:
        return jsonify({'error': 'No file data'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Extract the arguments from the request
    args = request.form.getlist('args')

    # Convert the arguments to numbers
    args = list(map(float, args))

    # Extract the additional arguments from the request
    addArgs = request.form.getlist('additionalArgs')

    # Convert the arguments to images
    addArgs = list(map(str, addArgs))

    # Append the additional arguments to the arguments list
    args = args + addArgs

    result_path = os.path.join(current_app.config['RESULT_FOLDER'], 'result_' + filename)

    call_matlab_function(False,tp_number, file_path, result_path, *args)

    response = jsonify({'processed_image_url': '/results/' + 'result_' + filename})

    return response

@main.route('/results/<filename>', methods=['GET'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)
def get_result_image(filename):
    file_path = os.path.join(current_app.config['RESULT_FOLDER'], filename)
    return send_file(file_path)

@main.route('/music/<int:music_number>', methods=['GET'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)
def get_music(music_number):
    music_files = os.listdir(current_app.config['MUSIC_FOLDER'])
    if music_number >= len(music_files):
        return jsonify({'error': 'Music number out of range'}), 400
    music_files.sort()
    music_file = music_files[music_number - 1]
    music_path = os.path.join(current_app.config['MUSIC_FOLDER'], music_file)
    return send_file(music_path)

@main.route('/shazam/', methods=['GET'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)
def shazam():
    # Extract the arguments from the request
    args = request.args.getlist('args')
    # Convert the arguments to numbers
    args = list(map(float, args))
    result = call_matlab_function(True,11,*args)
    return jsonify({'title' : result})

@main.route('/audio/', methods=['POST'])
@cross_origin(origins='http://localhost:3000', supports_credentials=True)
def audio():

    if 'audio' not in request.files:
        return jsonify({'error': 'No file data'}), 400

    file = request.files['audio']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Extract the arguments from the request
    args = request.form.getlist('args')
    # Convert the arguments to numbers
    args = list(map(float, args))
    result_path = current_app.config['RESULT_FOLDER']
    result_path_audio = os.path.join(result_path,'result_' + filename)
    result_path_img = os.path.join(result_path,'result_' + filename + '_img.png')
    taux = call_matlab_function(True,10,file_path,result_path_img,result_path_audio,*args)

    return jsonify({'audio_url': '/results/' + 'result_' + filename
                    ,'image_url': '/results/' + 'result_' + filename + '_img.png',
                    'taux' : taux})