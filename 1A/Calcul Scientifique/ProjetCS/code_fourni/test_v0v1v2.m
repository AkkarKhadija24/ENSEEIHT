clear all;
format long;

%%%%%%%%%%%%
% PARAMÈTRES
%%%%%%%%%%%%

% taille de la matrice symétrique
n = 200;

% type de la matrice (voir matgen_csad)
% imat == 1 valeurs propres D(i) = i
% imat == 2 valeurs propres D(i) = random(1/cond, 1) avec leur logarithmes
%                                  uniformément répartie, cond = 1e10
% imat == 3 valeurs propres D(i) = cond**(-(i-1)/(n-1)) avec cond = 1e5
% imat == 4 valeurs propres D(i) = 1 - ((i-1)/(n-1))*(1 - 1/cond) avec cond = 1e2


% tolérance
eps = 1e-8;
% nombre d'itérations max pour atteindre la convergence
maxit = 1000;

% on génère la matrice (1) ou on lit dans un fichier (0)

% méthode de calcul
v = 0; % subspace iteration v0

% taille du sous-espace (V0, v1, v2)
m = n-2;

% pourcentage de la trace que l'on veut atteindre (v1, v2, v3)
imat = 1;
genere = 0;
[W0, V0, flag0] = eigen_2023_bis(imat, n, v, m, eps, maxit, [], [], genere);
load('iter_v0');

% méthode de calcul

v = 1; % subspace iteration v3

% taille du sous-espace (V1, v2, v3)
m = n-2;

% pourcentage de la trace que l'on veut atteindre (v1, v2, v3)
percentage = 0.999;

genere = 0;
[W1, V1, flag1] = eigen_2023_bis(imat, n, v, m, eps, maxit, 0.999, [], genere);
load('iter_v1');

% méthode de calcul
v = 2; % subspace iteration v2
% nombre de valeurs propres cherchées (v0)
m = n-2;

[W2, V2, flag2] = eigen_2023_bis(imat, n, v, m, eps, maxit, 0.999, 4, genere);
load('iter_v2');

