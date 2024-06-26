function title = shazam(numero_morceau,debut_extrait,duree_extrait)
	% Chargement des paramètres (voir parametres.m)
	load parametres;

	% Chargement de la base de données :
	load bdd;

	% Lecture d'un fichier audio tiré aléatoirement :
	% numero_morceau = randi(length(fichiers));
	% Get the full path of the current script
	full_path = mfilename('fullpath');

	% Split the full path into path and file name
	[path, ~, ~] = fileparts(full_path);

	% Add '/shazam/base_maxi' to the path
	addpath(fullfile(path, 'Shazam', 'base_maxi'));
	audio_file_path = fullfile(path, 'Shazam', 'base_maxi', fichiers(numero_morceau).name);
	[y, f_ech] = audioread(audio_file_path);

	% Extrait de durée duree_extrait, tiré aléatoirement :
	% duree_extrait = 15;
	y = extrait(y, f_ech,debut_extrait,duree_extrait);

	% Création d'un bruit (blanc ou de parole) :
	% y_bruit_blanc = randn(size(y));
	% [y_bruit_parole, ~] = audioread('../matlab/TP11/Morceaux/talking.mp3');
	% y_bruit_parole = extrait(y_bruit_parole, f_ech, duree_extrait);

	% Ajout du bruit (blanc et/ou de parole) :
	SNR = 1;			% Rapport signal sur bruit
	% y = ajout_bruit(y, y_bruit_blanc, SNR);
	% y = ajout_bruit(y, y_bruit_parole, SNR);

	% Ré-échantillonage à 2*f_max
	y = resample(y, 2*f_max, f_ech);
	f_ech = 2*f_max;

	% Calcul du sonagramme :
	[Y,valeurs_t,valeurs_f] = TFCT(y, f_ech, n_fenetre, n_decalage, fenetre);
	S = 20*log10(abs(Y)+eps);

	% Calcul des pics spectraux :
	[pics_t, pics_f] = pics_spectraux(S, eta_t, eta_f, epsilon);

	% Calcul des paires de pics spectraux :
	paires = appariement(pics_t, pics_f, n_v, delta_t, delta_f);

	% Calcul des identifiants :
	identifiants = indexation(paires);

	% Récupération des empreintes présentes dans la base de données :
	resultats = recherche_avancee(identifiants,paires(:,3), bdd);

	% Recherche du meilleur résultat :
	[C,ia,ic] = unique(resultats,'rows','stable');
	h = accumarray(ic,1);
	[m,ind] = max(h);
	numero_reconnu = C(ind,1);
	if numero_reconnu==numero_morceau
		fprintf('Le morceau "%s" a ete correctement reconnu !\n',fichiers(numero_morceau).name(1:end-4));
		title = fichiers(numero_morceau).name(1:end-4);
	else
		fprintf('Le morceau "%s" n''a pas ete reconnu !\n',fichiers(numero_morceau).name(1:end-4));
		title = 'Inconnu';
	end

end