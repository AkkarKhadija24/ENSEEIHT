function [X_VS, w, c, exitflag] = SVM_1(X_app, Y_app)
    % Paramètres du problème
    n = size(X_app, 1); % Nombre de points d'apprentissage
    H = diag([1 1 0]);
    f = zeros(3,1); 
    A = repmat(Y_app, 1, 3) .* [-X_app, ones(n,1)] ; % Matrice A pour les contraintes
    b = -ones(n,1); % Vecteur b pour les contraintes
    
    
    % Résolution du problème d'optimisation quadratique
    
    [we, ~, exitflag] = quadprog(H, f, A, b);
    
    % Extraction des variables d'intérêt
    w = we(1:2); % Vecteur w
    c = we(3); % Paramètre c
    ind = Y_app.*(X_app*w-c) - 1 < 1e-6 ;
    X_VS = X_app(ind, :); % Vecteurs de support
    
end