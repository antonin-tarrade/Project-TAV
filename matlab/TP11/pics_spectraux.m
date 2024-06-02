function [pics_t, pics_f] = pics_spectraux(S, eta_t, eta_f, epsilon)
    J = imdilate(S,strel('rectangle',[eta_f eta_t]));
    [pics_f, pics_t] = find(abs(J - S) == 0 & S >= epsilon);
end