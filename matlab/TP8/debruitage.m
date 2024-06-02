function u = debruitage(b,u_k,lambda,Dx,Dy,epsilon) 

    [N,~,nb_canaux] = size(u_k);
    for i=1:nb_canaux
        Wk = spdiags(1./sqrt((Dx * u_k(:,:,i)).^2 + (Dy * u_k(:,:,i)).^2 + epsilon),0,N,N);

        Ak = speye(N) - lambda * (-Dx' * Wk * Dx - Dy' * Wk * Dy);

        u(:,:,i) = Ak \ b;
    end
end