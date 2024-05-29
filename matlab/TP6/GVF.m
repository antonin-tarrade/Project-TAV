function GVF (input_image_path,output_image_path,nb_iter,mu_gvf,lambda_gvf)

	% Lecture et affichage de l'image a segmenter :
	I = imread(input_image_path);
	[nb_lignes,nb_colonnes,nb_canaux] = size(I);
	if nb_canaux==3
		I = rgb2gray(I);
	end
	I = double(I);
	I = I/max(I(:));
	% figure('Name','Champ de force externe');
	% subplot(1,2,1);
	% imagesc(I);
	% colormap gray;
	% axis image off;
	% title('Image a segmenter','FontSize',20);

	% % Parametres : 
	% nb_iter = 300;
	% % Parametre des équations de diffusions généralisées :
	% mu_gvf = 2;
	% lambda_gvf = 0.01;


	% Champ de force externe :
	[Ix,Iy] = gradient(I);
	Eext = -(Ix.*Ix+Iy.*Iy);
	[Fx0,Fy0] = gradient(Eext);


	% Itération : 
	Fx = Fx0;
	Fy = Fy0;
	for k =1:nb_iter 
		Fx = Fx - lambda_gvf * (norm([Fx0,Fy]').^2 * (Fx  - Fx0) - mu_gvf * del2(Fx));
		Fy = Fy - lambda_gvf * (norm([Fy0,Fy]').^2 * (Fy  - Fy0) - mu_gvf * del2(Fy));
	end



	% Normalisation du champ de force externe pour l'affichage :
	norme = sqrt(Fx.*Fx+Fy.*Fy);
	Fx_normalise = Fx./(norme+eps);
	Fy_normalise = Fy./(norme+eps);

	% Affichage du champ de force externe GVF:
	% Create a new figure
	f = figure;
	% Make the figure invisible
	set(f, 'Visible', 'off');
	imagesc(I);
	colormap gray;
	axis image off;
	hold on;
	pas_fleches = 5;
	taille_fleches = 1;
	[x,y] = meshgrid(1:pas_fleches:nb_colonnes,1:pas_fleches:nb_lignes);
	Fx_normalise_quiver = Fx_normalise(1:pas_fleches:nb_lignes,1:pas_fleches:nb_colonnes);
	Fy_normalise_quiver = Fy_normalise(1:pas_fleches:nb_lignes,1:pas_fleches:nb_colonnes);
	hq = quiver(x,y,Fx_normalise_quiver,Fy_normalise_quiver,taille_fleches);
	set(hq,'LineWidth',1,'Color',[1,0,0]);
	title('Champ de force externe elementaire','FontSize',20);

	% Save the figure to a file at the requested path
	print(f,output_image_path, '-dpng');
end
