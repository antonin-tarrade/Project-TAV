function taux = compression_avance(input_audio_path,output_img_path,ouput_audio_path,m,df)
	taille_ecran = get(0,'ScreenSize');
	L = taille_ecran(3);
	H = taille_ecran(4);

	% Lecture d'un fichier audio :
	[y, f_ech] = audioread(input_audio_path);
	y = mean(y, 2);

	% Calcul de la transformée de Fourier à court terme :
	N = 2048;					% Nombre d'échantillons de la fenêtre
	D = 512;					% Nombre d'échantillons entre positions successives de la fenêtre
	fenetre = 'hann';				% Type de la fenêtre : 'rect' ou 'hann'
	Y = TFCT(y, f_ech, N, D, fenetre);

	% Affichage du sonagramme original, en guise de comparaison :
	fig = figure(Name='Modification du spectrogramme', Position=[0,0,L,0.6*H]);
	set(fig, 'Visible', 'off');
	valeurs_t = (0 : size(Y, 2) - 1) * D / f_ech;	% Instant correspondant à chaque colonne
	valeurs_f = (0 : size(Y, 1) - 1) * f_ech / N;	% Fréquence correspondant à chaque ligne
	S = 20 * log10(abs(Y));				% Module au carré de la TFCT en décibels
	subplot(1,2,1);
	imagesc(valeurs_t, valeurs_f, S, [-60, 40]);
	axis xy;
	set(gca, FontSize=20);
	xlabel('Temps ($s$)', Interpreter='Latex', FontSize=30);
	xlabel('Frequence ($Hz$)', Interpreter='Latex', FontSize=30);
	title('Sonagramme original', FontSize=20);

	% Ajout d'un effet :
	% taux_compression = 0;
	% Y_modifie = passe_bas(Y, valeurs_f, 1000);
	% Y_modifie = passe_haut(Y, valeurs_f, 1000);
	% [Y_modifie,taux_compression] = compression(Y, 100);
	[Y_modifie,taux_compression] = compression_decimation(Y,m,df);

	% Affichage de la TFCT reconstituée :
	S_modifie = 20 * log10(abs(Y_modifie));		% Sonagramme modifié en décibels
	subplot(1,2,2);
	imagesc(valeurs_t,valeurs_f,S_modifie, [-60, 40]);
	axis xy;
	set(gca, FontSize=20);
	xlabel('Temps ($s$)', Interpreter='Latex', FontSize=30);
	xlabel('Frequence ($Hz$)', Interpreter='Latex', FontSize=30);
	if taux_compression==0
		title('Sonagramme reconstitué', FontSize=20);
	else
		title(['Taux de compression = ' num2str(taux_compression)], FontSize=20);
	end

	saveas(fig, output_img_path);
	audiowrite(ouput_audio_path,y,f_ech);
	taux = taux_compression;

end

