# Ecrire les tests de l'algorithme du pas de Cauchy
using Test

function tester_cauchy(cauchy::Function)

	@testset "Pas de Cauchy" begin
        @test 1==1
    end

    @testset "test g1" begin
        println("\n\nExemple1")
        g1 = [0.0 ; 0.0]
        H1 = [7.0 1.0; 1.0 2.0]
        s = cauchy(g1, H1, 1.0)
        println("Cauchy g1 H1\n",s,"\n")   
    end

    @testset "test g2" begin
        printstyled("\nMyTest 1\n", bold=true, color=:yellow)
        g2 = [3.0 ; 1.5]
        H2 = [3.0 0.5; 0.5 1.0]
        println("Cauchy g2 H2\nSolution : ",cauchy(g2, H2, 1.0),"\n")
    end

    @testset "test g2" begin
        printstyled("\nMyTest 2\n", bold=true, color=:yellow)
        g3 = [6.1; 2.1]
        H3 = [7.1 0; 0 2.1]
        println("Cauchy g3 H3\nSolution : ",cauchy(g3, H3, 0.1),"\n")
    end
    @testset "test g2" begin
        printstyled("\nMyTest 3\n", bold=true, color=:yellow)
        g4 = [-2.1; 1.1]
        H4 = [-2.1 0; 0 19]
        println("Cauchy g4 H4\nSolution : ", cauchy(g4, H4, 0.1),"\n\n")
    end

end