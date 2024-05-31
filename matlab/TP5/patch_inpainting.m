function patch_inpainting (input_image_path,output_image_path,t,T,D_img_base64)

% Lecture de l'image :
u_0 = double(imread(input_image_path));
[nb_lignes,nb_colonnes,nb_canaux] = size(u_0);
u_max = max(u_0(:));

% Conversion du masque en base64 en fichier
D_img_path = 'D_img.png';
output_D_path = base64ToImage(D_img_base64, D_img_path);
D = imread(output_D_path) > 0;
D = D(:,:,1);
u_k = u_0;
for c = 1:nb_canaux
	u_k(:,:,c) = (~D).*u_k(:,:,c);
end

% Initialisation de la frontiere de D :
delta_D = frontiere(D);
indices_delta_D = find(delta_D > 0);
nb_points_delta_D = length(indices_delta_D);

% % Parametres :
% t = 9;			% Voisinage d'un pixel de taille (2t+1) x (2t+1)
% T = 50;			% Fenetre de recherche de taille (2T+1) x (2T+1)

% Tant que la frontiere de D n'est pas vide :
while nb_points_delta_D > 0

	% Pixel p de la frontiere de D tire aleatoirement :
	indice_p = indices_delta_D(randi(nb_points_delta_D));
	[i_p,j_p] = ind2sub(size(D),indice_p);

	% Recherche du pixel q_chapeau :
	[existe_q,bornes_V_p,bornes_V_q_chapeau] = d_min(i_p,j_p,u_k,D,t,T);

	% S'il existe au moins un pixel q eligible :
	if existe_q

		% Rapie�age et mise a jour de D :
		[u_k,D] = rapiecage(bornes_V_p,bornes_V_q_chapeau,u_k,D);

		% Mise a jour de la frontiere de D :
		delta_D = frontiere(D);
		indices_delta_D = find(delta_D > 0);
		nb_points_delta_D = length(indices_delta_D);

		% % Affichage de l'image resultat :
		% subplot(1,2,2)
		% imagesc(max(0,min(1,u_k/u_max)),[0 1])
		% axis image off
		% title('Image resultat','FontSize',20)
		% if nb_canaux == 1
		% 	colormap gray
		% end
		% drawnow nocallbacks
	end
	imwrite(max(0,min(1,u_k/u_max)),output_image_path);
end
