% Initialisation de Matlab
clear;
close all;
clc;
% Télechargement des deux fichiers contenant les deux messages
%load fichier1.mat
%load fichier2.mat
%load fichier3.mat
%load fichier4.mat
%load fichier5.mat
%load fichier6.mat
% Paramètres
Fi0 = rand*2*pi;
Fi1 = rand*2*pi;
bits = randi([0 1],[1 300]);
Fe = 48000;
F0 = 1180;
F1 = 980;
Te = 1 / Fe;
Ns = Fe * (1 / 300);
Ts = Ns * Te;
% Génération du signal NRZ(t)
NRZ =kron(2*bits - 1, ones(1, Ns));
% Traçage du NRZ(t)
figure;
plot((0 : Te : (length(NRZ) - 1) * Te), NRZ)
ylim([-2,2])
title('figure1 : signal NRZ(t)')
xlabel('Temps en secondes')
ylabel('Amplitude de NRZ(t)')
% La densité spectrale de puissance du signal NRZ(t) 
%S = (1 / Ns) * abs(fft(NRZ)) .^ 2;
Sdsp=pwelch(NRZ,[],[],[],Fe,'twosided') ;
%la densité spectrale de puissance théorique
f = linspace(-Fe/2,Fe/2,length(Sdsp));
St = (1/4)*(Ts*(sinc(f*Ts)).^2 );
St(length(Sdsp)/2) = St(length(Sdsp)/2) + 0.25;
% Traçage de la densité spectrale de puissance du signal NRZ(t)
figure;
f = linspace(-Fe/2,Fe/2,length(Sdsp));
fftshift(Sdsp);
semilogy(f,fftshift(Sdsp) , "red" );
hold on ;
semilogy(f,St,"blue");
hold off;
title('figure2 : signal Snrz')
xlabel('frequence en Hz')
ylabel('Amplitude de Snrz')
%% Génération du signal modulé en fréquence
% Génération du signal x
t = (0 : Te : (length(NRZ) - 1) * Te);
x1 = cos(2*pi*F1*t + Fi1);
x0 = cos(2*pi*F0*t + Fi0);
x = (1 - NRZ).*x0 + NRZ.*x1;
% Traçage du signal k) 
figure;
plot(t, x)
title('figure3 : signal x(k)')
xlabel('Temps en secondes')
ylabel('Amplitude de t)')
% Traçage de la densité spectrale de puissance du signal t)
Sx = pwelch(x,[],[],[],Fe,'twosided') ;
figure;
f=linspace(-Fe/2,Fe/2,length(Sx));
fftshift(Sx);
semilogy(f,fftshift(Sx));
title('figure4 : densité spectrale de puissance du signal t')
xlabel('Fréquence en Hz')
ylabel('densité spectrale de puissance du signal t)')
%%Canal de transmission à bruit additif, blanc et Gaussien
%signal bruité
SNR = 50 ;
Px = mean(abs(x).^2);
Pb = Px * 10^(-SNR/10) ;
B = sqrt(Pb) * randn(1,length(NRZ));
yb = x + B ;
figure;
plot((0 : Te : (length(NRZ) - 1) * Te), yb)
title('figure5 : signal yb)')
xlabel('Temps en secondes')
ylabel('Amplitude de yb')
%taux d'erreur
Terr = (yb - x)/300 ;
figure;
plot((0 : Te : (length(NRZ) - 1) * Te), Terr)
title('figure6 : taux d erreur')
xlabel('Temps en secondes')
ylabel('Amplitude de Terr')
%%Démodulation par Filtrage

F0f = 6000;
F1f = 2000;
%Synthèse du filtre passe-bas
N = 61 ;
Hpb = 2*(F0f/Fe)*sinc(2*(F0f/Fe)*(-(N-1)/2:(N-1)/2));
figure;
title('figure7 : filtre passe-bas')
xlabel('Temps en secondes')
ylabel('Amplitude de Hpb')
plot((-(N-1)/2:(N-1)/2)*Te,Hpb);
%Synthèse du filtre passe-haut 
H = 2*(F1f/Fe)*sinc(2*(F1f/Fe)*(-(N-1)/2:(N-1)/2));
Hph = -H;
Hph((N-1)/2 + 1) = 1-2*F1f/Fe;
figure;
title('figure8 : filtre passe-haut')
xlabel('Temps en secondes')
ylabel('Amplitude de Hph')
plot((-(N-1)/2:(N-1)/2)*Te,Hph);
%
DSPx = pwelch(Hpb,[],[],[],Fe , 'twosided');
f = linspace(-Fe/2, Fe/2 , length(Hph));
figure ;
semilogy(f,fftshift((Hpb.^2)/N));
%Filtrage
%% passe bas
yfb = filter(Hpb,1,yb);
figure(10);
plot(t,yfb);
%%passe haut
yfh = filter(Hph,1,yb);
figure(11);
plot(t,yfh);
%Tracés à réaliser:
%%1
plot((-(N-1)/2:(N-1)/2)*Te,Hpb);
hold on ;
plot(t,yfb);
hold off;
figure;
title('figure12 :filtre passe-bas')
xlabel('Temps en secondes')
ylabel('Amplitude de Hph')
%detection d'energie 
L= length(yfb)/Ns ;
S = reshape(yfb,Ns,L);
E = sum(abs(S.^2));
K = (max(E)-min(E))/2 ;
Energie = E > K ;
%calcul de taux d'erreur TEB
nb_err = zeros(1,L);
for i = 1:L 
    if E(i) > K 
        nbr_err(i) =1 ;
    else
        nbr_err(i()) =0 ;
    end
end
err = length(find(nb_err~= bits));
TEB = err/L ; 

%Modification du démodulateur
%Démodulateur de fréquence adapté à la norme V21
%%Contexte de synchronisation idéale

