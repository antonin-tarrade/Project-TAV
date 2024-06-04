function [Y_modifie, taux_compression] = compression_decimation(Y, m, df)
    df = double(df);
    % Décimer le sonagramme Y
    Y_decimated = Y(1:df:end, 1:df:end);
    Y_modifie_decimated = zeros(size(Y_decimated));
    for col = 1:size(Y_decimated, 2)
        [~, indices] = maxk(Y_decimated(:, col), m);
        Y_modifie_decimated(indices, col) = Y_decimated(indices, col);
    end
    % Reconstituer le sonagramme avec des zéros aux positions supprimées
    Y_modifie = zeros(size(Y));
    Y_modifie(1:df:end, 1:df:end) = Y_modifie_decimated * df;

    % Calculer le taux de compression
    taux_compression = (1 - nnz(Y_modifie) / numel(Y)) * 100;
    
end