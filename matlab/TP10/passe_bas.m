function Y_modifie = passe_bas(Y, valeurs_f, fc)

    mask = valeurs_f > fc;
    Y_modifie = Y;
    Y_modifie(mask,:) = 0;

end