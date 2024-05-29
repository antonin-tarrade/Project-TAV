function [x,y] = iteration(x,y,Fx,Fy,gamma,A)

   ind = sub2ind(size(Fx),round(y),round(x));

   Bx = - gamma * Fx(ind);
   By = - gamma * Fy(ind);
    
   x = A * x + Bx;
   y = A * y + By;

end

