function outputFilePath = base64ToImage(base64, outputFileName)
     % Construct the output file path in the uploads/matlab directory
    outputFilePath = fullfile('.', 'uploads', 'matlab', outputFileName);

    % Remove data URI scheme if exists
    base64 = regexprep(base64, '^data:image/\w+;base64,', '');

    % Convert base64 string to uint8 array
    uint8arr = uint8(typecast(org.apache.commons.codec.binary.Base64.decodeBase64(uint8(base64)), 'uint8'));

    % Write to file
    fileID = fopen(outputFilePath, 'wb');  % 'wb' for binary writing
    fwrite(fileID, uint8arr, 'uint8');
    fclose(fileID);
end