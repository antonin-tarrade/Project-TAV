function [existe_q, bornes_V_p, bornes_V_q_chapeau] = d_min(i_p, j_p, u, D, t, T)
    d_min = inf;
    [ux,uy] = size(D);
    upx = max(i_p-t,1):min(i_p+t,ux);
    upy = max(1,j_p-t):min(uy,j_p+t);
    up = u(upx,upy,:);
    mask = ~D(upx,upy);
    bornes_V_p = [upx;upy];
    bornes_V_q_chapeau = [];
    existe_q = false;
    % Calcul des bornes de F(p)
    for i = max(1, i_p - T) : min(size(D, 1), i_p + T)
        for j = max(1, j_p - T) : min(size(D, 2), j_p + T)
            % Conditions limites
            Cx = i > t && i < ux - t && abs(i - i_p) > t;
            Cy = j > t && j < uy - t && abs(j - j_p) > t;
            vx = max(i-t,1):min(i+t,ux);
            vy = max(j-t,1):min(j+t,uy);
            onBorder = sum(D(vx,vy),"all") == 0;
            if Cx && Cy && onBorder
                vqx = vx;
                vqy = vy;
                uq = u(vqx,vqy,:);
                s = sum(abs(up-uq).^2,3);
                d = sum(s(mask),'all');
                if d < d_min
                    existe_q = true;
                    d_min = d;
                    bornes_V_q_chapeau = [vqx;vqy];
                end

            end
        end
    end
end

