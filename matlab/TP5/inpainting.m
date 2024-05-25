function u = inpainting(D,u_0,u_k,lambda,Dx,Dy,epsilon) 

    N = size(u_k,1);
    Wk = spdiags(1./sqrt((Dx * u_k).^2 + (Dy * u_k).^2 + epsilon),0,N,N);
    W_omegaD = spdiags(1 - D(:),0,N,N);
    Ak = W_omegaD - lambda * (-Dx' * Wk * Dx - Dy' * Wk * Dy);
    b = W_omegaD * u_0;

    u = Ak \ b;
end