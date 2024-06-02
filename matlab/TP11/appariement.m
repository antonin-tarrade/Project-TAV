    function paires = appariement(pics_t, pics_f, n_v, delta_t, delta_f)
    paires = [];
    for i=1:size(pics_t,1) 
        mi = pics_t(i);
        mj = pics_t(i+1:end);
        ki = pics_f(i);
        kj = pics_f(i+1:end);
        pics = (mj - mi > 0 & mj - mi <= delta_t & abs(ki - kj) <= delta_f);
        indices = find(pics,n_v);
        new_paire = [ki * ones(size(indices,1),1) kj(indices) mi * ones(size(indices,1),1) mj(indices)];
        paires = [paires; new_paire];
     
    end
end