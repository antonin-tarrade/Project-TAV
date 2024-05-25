function [u_k, D] = rapiecage(bornes_V_p, bornes_V_q_chapeau, u_k, D)

    % Extraction des voisinages de p et de q_chapeau
    V_p = u_k(bornes_V_p(1,:),bornes_V_p(2,:),:);
    V_q_chapeau = u_k(bornes_V_q_chapeau(1,:),bornes_V_q_chapeau(2,:),:);

    % Rapiéçage en remplaçant les pixels manquants de V(p) par ceux de V(q_chapeau)
    mask_missing = V_p == 0; % masque pour les pixels manquants dans V(p)
    V_p(mask_missing) = V_q_chapeau(mask_missing); % remplacement

    % Mise à jour de l'image u_k
    u_k(bornes_V_p(1,:), bornes_V_p(2,:),:) = V_p;

    % Mise à jour de D : marquer les pixels patchés comme complétés
    D(bornes_V_p(1,:), bornes_V_p(2,:)) = 0;

end
