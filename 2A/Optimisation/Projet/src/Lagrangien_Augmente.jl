using LinearAlgebra
include("../src/newton.jl")
include("../src/Regions_De_Confiance.jl")
"""

Approximation d'une solution au problème 

    min f(x), x ∈ Rⁿ, sous la c c(x) = 0,

par l'algorithme du lagrangien augmenté.

# Syntaxe

    x_sol, f_sol, flag, nb_iters, μs, λs = lagrangien_augmente(f, gradf, hessf, c, gradc, hessc, x0; kwargs...)

# Entrées

    - f      : (Function) la ftion à minimiser
    - gradf  : (Function) le gradient de f
    - hessf  : (Function) la hessienne de f
    - c      : (Function) la c à valeur dans R
    - gradc  : (Function) le gradient de c
    - hessc  : (Function) la hessienne de c
    - x0     : (Vector{<:Real}) itéré initial
    - kwargs : les options sous formes d'arguments "keywords"
        • max_iter  : (Integer) le nombre maximal d'iterations (optionnel, par défaut 1000)
        • tol_abs   : (Real) la tolérence absolue (optionnel, par défaut 1e-10)
        • tol_rel   : (Real) la tolérence relative (optionnel, par défaut 1e-8)
        • λ0        : (Real) le multiplicateur de lagrange associé à c initial (optionnel, par défaut 2)
        • μ0        : (Real) le facteur initial de pénalité de la c (optionnel, par défaut 10)
        • τ         : (Real) le facteur d'accroissement de μ (optionnel, par défaut 2)
        • algo_noc  : (String) l'algorithme sans c à utiliser (optionnel, par défaut "rc-gct")
            * "newton"    : pour l'algorithme de Newton
            * "rc-cauchy" : pour les régions de confiance avec pas de Cauchy
            * "rc-gct"    : pour les régions de confiance avec gradient conjugué tronqué

# Sorties

    - x_sol    : (Vector{<:Real}) une approximation de la solution du problème
    - f_sol    : (Real) f(x_sol)
    - flag     : (Integer) indique le critère sur lequel le programme s'est arrêté
        • 0 : convergence
        • 1 : nombre maximal d'itération dépassé
    - nb_iters : (Integer) le nombre d'itérations faites par le programme
    - μs       : (Vector{<:Real}) tableau des valeurs prises par μk au cours de l'exécution
    - λs       : (Vector{<:Real}) tableau des valeurs prises par λk au cours de l'exécution

# Exemple d'appel

    f(x)=100*(x[2]-x[1]^2)^2+(1-x[1])^2
    gradf(x)=[-400*x[1]*(x[2]-x[1]^2)-2*(1-x[1]) ; 200*(x[2]-x[1]^2)]
    hessf(x)=[-400*(x[2]-3*x[1]^2)+2  -400*x[1];-400*x[1]  200]
    c(x) =  x[1]^2 + x[2]^2 - 1.5
    gradc(x) = 2*x
    hessc(x) = [2 0; 0 2]
    x0 = [1; 0]
    x_sol, _ = lagrangien_augmente(f, gradf, hessf, c, gradc, hessc, x0, algo_noc="rc-gct")

"""
function lagrangien_augmente(f::Function, gradf::Function, hessf::Function, 
        c::Function, gradc::Function, hessc::Function, x0::Vector{<:Real}; 
        max_iter::Integer=1000, tol_abs::Real=1e-10, tol_rel::Real=1e-8,
        λ0::Real=2, μ0::Real=10, τ::Real=2, algo_noc::String="rc-gct")

    #
    n = length(x0)
    x_sol = x0
    f_sol = f(x_sol)
    flag  = -1
    μs = [μ0] # vous pouvez faire μs = vcat(μs, μk) pour concaténer les valeurs
    λs = [λ0]
    xk = x0
    mu = μ0
    lambda = λ0
    i = 0
    betha = 0.9
	alpha = 0.1
	etha_t = 0.1258925
    epsilon0 = 1/μ0
	epsilon = 1/mu
    etha = etha_t/(mu^alpha)
    tho = τ

    while flag == -1
        # Mise à jour de i
        i += 1
        # Calcule de la fonction Langrangien 
        lagx(x) = f(x) + lambda' * c(x) + (mu/2) * (norm(c(x)))^2
        # Calcule du gradient du lagrangien
        grad_lag(x) = gradf(x) + lambda' * gradc(x) + mu * gradc(x) * c(x)
        # Calcule du hessienne du lagrangien
        hess_lag(x) = hessf(x) + lambda' * hessc(x) + mu * hessc(x) * c(x) + mu * gradc(x) * gradc(x)'     
        
        # Mise à jour de x
        if algo_noc == "newton"
            # Algorithme de newton
            xk, _  = newton(lagx,grad_lag, hess_lag,xk, tol_abs=epsilon,tol_rel = 0, epsilon = 0)
        elseif algo_noc == "rc-cauchy"
            # Algorithme de regions_de_confiance(cauchy)
            xk, _ = regions_de_confiance(lagx, grad_lag, hess_lag, xk, tol_abs=epsilon, tol_rel=0, epsilon=0, algo_pas= "cauchy")
        elseif algo_noc == "rc-gct"
            # Algorithme de regions_de_confiance(gct)
            xk, _ = regions_de_confiance(lagx, grad_lag, hess_lag, xk, tol_abs=epsilon, tol_rel=0, epsilon=0, algo_pas= "gct")
        else
            error("NotImplementedError")
        end 

        
        # Mise à jour des variables multiplicateurs
        if (norm(c(xk)) <= etha)
            lambda = lambda + mu * c(xk)
            epsilon = epsilon/mu
            etha = etha/(mu^betha)
        else 
            mu = tho * mu
            epsilon = epsilon0/mu
            etha = etha_t/(mu^alpha)
        end
        
        # Test de convergence 

        # Le lagrangien (non augmenté)
        gradLag(x,lamb) = gradf(x) + lamb' * gradc(x)

        # Critères d'arrét 
        cn1 = max(tol_rel * norm(gradLag(x0, lambda)), tol_abs)
        cn2 = max(tol_rel * norm(c(x0)), tol_abs)

        if norm(gradLag(xk,lambda)) <= cn1 && norm(c(xk)) <= cn2
            flag = 0
        elseif i >= max_iter
            flag = 1   
        end

        λs = vcat(λs, lambda)
        μs = vcat(μs, mu)
        x_sol = xk
        f_sol = f(x_sol)

    end # end while

    return x_sol, f_sol, flag, i, μs, λs

end
