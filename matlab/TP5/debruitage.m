function u = debruitage(b,u_k,lambda,Dx,Dy,epsilon) 

    N = size(u_k,1);
    Wk = spdiags(1./sqrt((Dx * u_k).^2 + (Dy * u_k).^2 + epsilon),0,N,N);

    Ak = speye(N) - lambda * (-Dx' * Wk * Dx - Dy' * Wk * Dy);

    u = Ak \ b;
end