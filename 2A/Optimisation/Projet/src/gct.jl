using LinearAlgebra
"""
Approximation de la solution du problème 

    min qₖ(s) = s'gₖ + 1/2 s' Hₖ s, sous la contrainte ‖s‖ ≤ Δₖ

# Syntaxe

    s = gct(g, H, Δ; kwargs...)

# Entrées

    - g : (Vector{<:Real}) le vecteur gₖ
    - H : (Matrix{<:Real}) la matrice Hₖ
    - Δ : (Real) le scalaire Δₖ
    - kwargs  : les options sous formes d'arguments "keywords", c'est-à-dire des arguments nommés
        • max_iter : le nombre maximal d'iterations (optionnel, par défaut 100)
        • tol_abs  : la tolérence absolue (optionnel, par défaut 1e-10)
        • tol_rel  : la tolérence relative (optionnel, par défaut 1e-8)

# Sorties

    - s : (Vector{<:Real}) une approximation de la solution du problème

# Exemple d'appel

    g = [0; 0]
    H = [7 0 ; 0 2]
    Δ = 1
    s = gct(g, H, Δ)

"""
function gct(g::Vector{<:Real}, H::Matrix{<:Real}, Δ::Real; 
    max_iter::Integer = 100, 
    tol_abs::Real = 1e-10, 
    tol_rel::Real = 1e-8)

    n = length(g)   
    s = zeros(n)
    sj = zeros(n)
    gj = g
    pj = -g

    # Notre modèle
    q(s) = g' * s + 0.5 * s' * H * s
    
    for j = 1:max_iter

        kj = pj' * H * pj
        if kj < 0 
            # sigmaj = la racine de ∥sj + σ*pj∥ = ∆ => a*σ² + b*σ + c = 0
            a = norm(pj)^2
            b =  2 * sj' * pj
            c = norm(sj)^2 - Δ^2 
            d = sqrt(b^2 - 4*a*c)
            r1 = (-b - d) / (2*a)
            r2 = (-b + d) / (2*a)

            # TRouver la valeur de q(sj + σpj ) la plus petite
            if q(sj + r1*pj) > q(sj + r2*pj)
                sigmaj = r2
            else 
                sigmaj = r1
            end
            s = sj + sigmaj*pj
            break
        end

        alphaj = (gj' * gj)/kj
        if norm(sj + alphaj*pj) >= Δ 
            # sigmaj = la racine de ∥sj + σ*pj∥ = ∆ => a*σ² + b*σ + c = 0
            a = norm(pj)^2
            b =  2 *sj' * pj
            c = norm(sj) ^ 2 - Δ ^ 2 
            d = sqrt(b ^ 2 - 4*a*c)
            r1 = (-b - d) / (2*a)
            r2 = (-b + d) / (2*a)

            # TRouver la racine positive parmi r1 et r2
            if r1 > 0
                sigmaj = r1
            elseif r2 > 0
                sigmaj = r2
                s = sj + sigmaj*pj
                break
            end
        end
        sj = sj + alphaj*pj
        gjp1 = gj + alphaj*H*pj
        betaj = (gjp1' * gjp1)/(gj'*gj)
        pj = -gjp1 + betaj*pj

        if norm(gjp1) <= tol_abs*norm(g)
            s = sj
            break
        end # if
        gj = gjp1
    end #end for
   return s
end
