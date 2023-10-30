function [X_VS,Y_VS,Alpha_VS,c,code_retour] = SVM_3(X,Y,sigma)
n = length(X);
K = zeros(n,n);
sigma_carree2 = 2*sigma^2;
for i=1:n
    for j=1:n
        K(i,j)= exp(-norm(X(i,:)-X(j,:))^2/sigma_carree2);
    end
end
H = zeros(n,n);

for i=1:n
    for j=1:n
        H(j,i) = Y(i)*Y(j)*K(i,j);
    end
end
f = ones(n,1);

[alpha, ~, code_retour] = quadprog(H,-f,[],[],Y',0,zeros(n, 1),[]);
i = 1;
c = sum(alpha.*Y.*K(:,i)) - Y(i);
X_VS = X(alpha>1e-6, :);
Y_VS = Y(alpha>1e-6);
Alpha_VS = alpha(alpha>1e-6);

end