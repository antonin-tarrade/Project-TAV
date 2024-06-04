function Y = TFCT(y,f_ech, N, D, fenetre)

    Y = buffer(y,N,N - D,'nodelay');
    
    if fenetre == "hann"
        Y = Y .* repmat(hann(N) , 1, size(Y,2));
    end
    
    Y = fft(Y);
    Y = Y(1:floor(size(Y,1)/2) + 1,:);

    axis xy;


end
