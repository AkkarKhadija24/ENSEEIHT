clear;
close all;
clc;

% Parametres pour l'affichage des donnees :
taille_ecran = get(0,'ScreenSize');
L = taille_ecran(3);
H = taille_ecran(4);

load donnees_train_3caracteristiques.mat;

% Donnees non filtrees :
X = X_train;
Y = Y_train;

% Parametres d'affichage :
pas = 0.002;
marge = 0.005;
valeurs_carac_1 = min(min(X(:,1)))-marge:pas:max(max(X(:,1)))+marge;
valeurs_carac_2 = min(min(X(:,2)))-marge:pas:max(max(X(:,2)))+marge;
valeurs_carac_3 = min(min(X(:,3)))-marge:pas:max(max(X(:,3)))+marge;
limites_affichage = [valeurs_carac_1(1) valeurs_carac_1(end) ...
                     valeurs_carac_2(1) valeurs_carac_2(end) ...
                     valeurs_carac_3(1) valeurs_carac_3(end)];
nom_carac_1 = 'Compacite';
nom_carac_2 = 'Contraste';
nom_carac_3 = 'Texture';
% Estimation du SVM avec noyau gaussien :
sigma = 0.006;					% Ecart-type du noyau gaussien
lambda = 10000;
[X_VS,Y_VS,Alpha_VS,c,code_retour] = SVM_3_souple(X,Y,sigma,lambda);

% Si l'optimisation n'a pas converge :
if code_retour ~= 1
	return;
end

% Regle de decision du SVM :
nb_1 = length(valeurs_carac_1);
nb_2 = length(valeurs_carac_2);
%nb_3 = length(valeurs_carac_3);
SVM_predict = zeros(nb_2, nb_1);
for i = 1:nb_1
	for j = 1:nb_2      
		    x_ijk = [valeurs_carac_1(i) ; valeurs_carac_2(j)];
		    SVM_predict(j,i) = sign(exp(-sum((X_VS(:,1:2)-x_ijk').^2,2)/(2*sigma^2))'*diag(Y_VS)*Alpha_VS-c);
    end
end


% Affichage des classes predites par le SVM :
% Affichage des deux nuages de points 3D :
figure('Name','Classification par SVM avec noyau gaussien','Position',[0.2*L,0.1*H,0.6*L,0.7*H]);
%[V1, V2, V3] = meshgrid(valeurs_carac_1, valeurs_carac_2);
%plot3(V1, V2, V3, SVM_predict);
[x_grid, y_grid] = meshgrid(valeurs_carac_1, valeurs_carac_2);
%surf(x_grid, y_grid, SVM_predict);
surf(x_grid, y_grid, SVM_predict, 'EdgeColor','none');
carte_couleurs = [.65 .65 .85 ; .85 .65 .65];
colormap(carte_couleurs);
xlabel(nom_carac_1,'FontSize',30);
ylabel(nom_carac_2,'FontSize',30);
zlabel(nom_carac_3,'FontSize',30);
set(gca,'FontSize',20);
axis(limites_affichage);
hold on;

% Affichage des points de l'ensemble d'apprentissage :
nb_carac = size(X,2);
ind_moins_1 = Y==-1;
ind_plus_1 = Y==1;
%plot3(X(ind_moins_1,1),X(ind_moins_1,2),(nb_carac+1)*ones(sum(ind_moins_1),1),...
	  %'bx','MarkerSize',10,'LineWidth',3);
%plot3(X(ind_plus_1,1),X(ind_plus_1,2),(nb_carac+1)*ones(sum(ind_plus_1),1),...
	  %'ro','MarkerSize',10,'LineWidth',3);
plot3(X(ind_moins_1,1),X(ind_moins_1,2),X(ind_moins_1,3), 'bx','MarkerSize',10,'LineWidth',3);
hold on;
plot3(X(ind_plus_1,1),X(ind_plus_1,2),X(ind_plus_1,3), 'ro','MarkerSize',10,'LineWidth',3);
% Les vecteurs de support sont entoures en noir :
plot3(X_VS(:,1),X_VS(:,2),X_VS(:,3),'ko','MarkerSize',20,'LineWidth',3);	

% Pourcentage de bonnes classifications des donnees de test :
load donnees_test_3caracteristiques.mat;
nb_donnees_test = size(X_test,1);
nb_classif_OK = 0;
for i = 1:nb_donnees_test
	x_i = X_test(i,:);
	prediction = sign(exp(-sum((X_VS-x_i).^2,2)/(2*sigma^2))'*diag(Y_VS)*Alpha_VS-c);
	if prediction==Y_test(i)
		nb_classif_OK = nb_classif_OK+1;
	end
end
fprintf('Pourcentage de bonnes classifications des donnes de test : %.1f %%\n',double(nb_classif_OK/nb_donnees_test*100));