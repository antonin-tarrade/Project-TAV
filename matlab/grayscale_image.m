function grayscale_image(input_image_path, output_image_path)
    % Read the image
    img = imread(input_image_path);
    % Convert the image to grayscale
    gray_img = rgb2gray(img);
    % Save the grayscale image
    imwrite(gray_img, output_image_path);
end
