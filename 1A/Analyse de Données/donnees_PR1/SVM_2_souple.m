function [X_VS,w,c,code_retour] = SVM_2_souple(X,Y,lambda)
n = size(X,1);
H = zeros(n,n);

for i=1:n
    xi = X(i,:);
    for j=1:n
        xj = X(j,:);
        H(i,j) = Y(i)*Y(j)*xi*xj';
        H(j,i) = H(i,j);
    end
end
f = -ones(n,1);
lambdaVector = lambda*ones(n,1);
[alpha, ~, code_retour] = quadprog(H,f,[],[],Y',0,zeros(n, 1),lambdaVector);
X_VS = X(alpha >1e-6,:);
Y_VS = Y(alpha >1e-6);
Alpha_VS = alpha(alpha>1e-6);
S=find(alpha>1e-6);
w=zeros(size(X_VS,2),1);
for i=1:length(X_VS)
    w=w+Alpha_VS(i)*Y_VS(i)*X_VS(i,:)';
end
%w = X_VS'* (Y_VS.*Alpha_VS);
i = 1;
c = 0;
while i <= size(X_VS, 1)
    if Alpha_VS(i) < lambda
        c = w' * X_VS(i, :)' - Y_VS(i);
        break;
    else
        i = i + 1;
    end
end
%c = w'*X_VS(i,:)' - 1/Y_VS(i);
       
end