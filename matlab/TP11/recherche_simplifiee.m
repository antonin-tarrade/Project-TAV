function resultats = recherche_simplifiee(identifiants, bdd)
    resultats = [];
    for i=1:size(identifiants,1)
        id = identifiants(i);
        if bdd.isKey(id)
            morceau = bdd(id);
            resultats = [resultats; morceau(:,2)];
        end
    end
end