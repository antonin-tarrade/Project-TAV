clear;
close all;

% Lecture de l'image u :
u = imread('Images/Barbara.png');
u = double(im2gray(u));
[nb_lignes,nb_colonnes] = size(u);

% Calcul du spectre s de l'image u :
s = fft2(u);
s = fftshift(s);			% Permet de positionner l'origine (0,0) au centre

[f_x,f_y] = meshgrid(1:nb_colonnes,1:nb_lignes);
f_x = f_x/nb_colonnes-0.5;
f_y = f_y/nb_lignes-0.5;
etha = 0.05;

selection = sqrt(f_x.^2 + f_y.^2) < etha;

% Calcul du spectre filtre :
s_filtre = selection.*s;

% Calcul de l'image filtree :
u_filtre = real(ifft2(ifftshift(s_filtre)));

% Mise en place de la figure pour affichage :
taille_ecran = get(0,'ScreenSize');
L = taille_ecran(3);
H = taille_ecran(4);
figure('Name','Decomposition par modification du spectre','Position',[0.2*L,0,0.8*L,H]);

% Affichage des images u, u_filtre et u-u_filtre :
subplot(2,3,1);
affichage(u,'$x$','$y$','Image');
subplot(2,3,2);
affichage(u_filtre,'$x$','$y$','Image filtree');
subplot(2,3,3);
affichage(u-u_filtre,'$x$','$y$','Image complementaire');

% Affichage du logarithme du module des spectres s, s_filtre et s-s_filtre :
subplot(2,3,4);
affichage(log(abs(s)),'$f_x$','$f_y$','Spectre');
subplot(2,3,5);
affichage(log(abs(s_filtre)),'$f_x$','$f_y$','Spectre filtre');
subplot(2,3,6);
affichage(log(abs(s-s_filtre)),'$f_x$','$f_y$','Spectre complementaire');
