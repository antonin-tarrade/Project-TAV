function resultats = recherche_avancee(identifiants, paires, bdd)
    resultats = [];
    for i = 1:size(identifiants, 1)
        id = identifiants(i);
        if bdd.isKey(id)
            morceaux = bdd(id);
            for j = 1:size(morceaux, 1)
                numero_morceau = morceaux(j, 2);
                temps_paire = morceaux(j, 1);  
                delta_t = temps_paire - paires(i); 
                resultats = [resultats; numero_morceau, delta_t];
            end
        end
    end
end
