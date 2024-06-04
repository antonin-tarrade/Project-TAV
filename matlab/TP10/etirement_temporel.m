function y_modifie = etirement_temporel(y, f_ech,proportion)
    N = 1024;
    D = 256;
    fenetre = "hann";
    Y = TFCT(y,f_ech, N, D, fenetre);
    Yp = Y;
    C = 1:proportion:size(Y,2);
    phi = angle(Y(:,1));
    for i = 1:length(C)
        c = floor(C(i));
        alpha = C(i) - c;
        rho = (1 - alpha) * abs(Y(:,c)) + alpha * abs(Y(:,c + 1));
        Yp(:,i) = rho .* exp(1i * phi);
        dphi = angle(Y(:,c + 1)) - angle(Y(:,c));
        phi = phi + dphi;
    end
    y_modifie = ITFCT(Yp,f_ech, N, D, fenetre);
end