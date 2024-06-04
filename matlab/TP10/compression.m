function [Y_modifie,taux_compression] = compression(Y, m)
    [~,I] = maxk(Y,m,1);
    Y_modifie = zeros(size(Y));
    for i=1:size(Y_modifie,2)
        Y_modifie(I(:,i),i) = Y(I(:,i),i);
    end
    taux_compression = (1 - nnz(Y_modifie) / numel(Y)) * 100;
end