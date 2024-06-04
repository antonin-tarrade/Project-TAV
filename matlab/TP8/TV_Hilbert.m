function TV_Hilbert (input_image_path,output_image_path,nb_iter,epsilon,eta,mu_p,gamma)
% Mise en place de la figure pour affichage :
taille_ecran = get(0,'ScreenSize');
L = taille_ecran(3);
H = taille_ecran(4);
fig = figure('Name','Debruitage par variation totale',...
	'Position',[0.05*L,0.1*H,0.9*L,0.7*H]);
set(fig, 'Visible', 'off');
% Lecture de l'image u :
u = imread(input_image_path);
u = double(u);
[nb_lignes,nb_colonnes,nb_canaux] = size(u);
nb_pixels = nb_lignes*nb_colonnes;
u_max = max(u(:));

[f_x,f_y] = meshgrid(1:nb_colonnes,1:nb_lignes);
f_x = f_x/nb_colonnes-0.5;
f_y = f_y/nb_lignes-0.5;

% Filtre passe bas
% eta = 0.05;
Phi = 1./(1+(f_x.^2 + f_y.^2)./eta);


% Parametre pour garantir la differentiabilite de la variation totale :
% epsilon = 0.05;

% Operateur gradient :
e = ones(nb_pixels,1);
Dx = spdiags([-e e],[0 nb_lignes],nb_pixels,nb_pixels);
Dx(end-nb_lignes+1:end,:) = 0;
Dy = spdiags([-e e],[0 1],nb_pixels,nb_pixels);
Dy(nb_lignes:nb_lignes:end,:) = 0;

		
% Point fixe :
% mu_p = 5000;
% gamma = 3e-5;
iteration = 0;
affichage = 1;

% Initialisations
u_0 = u;
nb_pixels = nb_lignes*nb_colonnes;
u_0 = reshape(u_0,[nb_pixels nb_canaux]);
u_k = u_0;
% u_t = zeros(size(u));
% ub = u(:,:,:);
% ub = reshape(ub,N,[],nb_canaux);


while iteration < nb_iter

	% Incrementation du nombre d'iterations :
	iteration = iteration + 1;

	% Iteration :
		% Transformée de Fourier de u_k et de u
		TF_u_k = fftshift(fft2(u_k));
		TF_u = fftshift(fft2(u_0));
		% Calcul du terme de descente de gradient

		sub = (TF_u_k - TF_u).* Phi(:);
		term1 = real(ifft2(ifftshift(sub)));

		% Calcul des dérivées
		ux = Dx * u_k;
		uy = Dy * u_k;
		uxx = -Dx' * (Dx * u_k);
		uyy = -Dy' * (Dy * u_k);
		uxy = -Dx' * (Dy * u_k);

		norm_grad = ux.^2 + uy.^2 + epsilon;

		% Calcul de la divergence
		div = (uxx .* (uy.^2 + epsilon) + uyy .* (ux.^2 + epsilon) - 2 * ux .* uy .* uxy) ./ (norm_grad .^ (3/2));

		% Mise à jour de u_k
		u_kp1 = u_k - gamma * (term1 - mu_p * div);
		
		% Mise a jour de l'image courante u_k :
		u_k = u_kp1;
	
	
		pause(0.1)
		
		affichage = affichage + 1;
	end
	
	% Affichage de ls decomposition de l'image :
	subplot(1,2,1)
		imagesc(max(0,min(1,reshape(u_k,[nb_lignes nb_colonnes nb_canaux])/u_max)),[0 1])
		if nb_canaux==1
			colormap gray
		end
		axis image off
		title(['Texture (iteration ' num2str(iteration) ')'],'FontSize',20)
		
	subplot(1,2,2)
		imagesc(max(0,min(1,(reshape(u_0-u_k,[nb_lignes nb_colonnes nb_canaux])/u_max+1)/2)),[0 1])
		if nb_canaux==1
			colormap gray
		end
		axis image off
		title(['Structure (iteration ' num2str(iteration) ')'],'FontSize',20)    
		
	drawnow nocallbacks

	saveas(fig, output_image_path);
end
