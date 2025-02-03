#include <stdio.h>
#include <stdlib.h>
#include <mpi.h>
#include "stretching_util.h"

#define M 255

int main(int argc, char** argv) {
    // Partie ajoutées pour la parallélisation
    MPI_Init(&argc, &argv);
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    const char* filename = "Maupiti.jpg";
    printf("Appuyez sur une touche...\n");

    // Début chargement de l'image 
    // (en parallèle, seul le processus 0 fera cette action)
    
    int nblines, nbcolumns;

    // récupération de la taille de l'image getImageDimensions(filename, &nblines, &nbcolumns);
    // Partie ajoutées pour la parallélisation
    // Seulement le processus 0 lit la taille de l'image
    if (rank == 0) {
        getImageDimensions(filename, &nblines, &nbcolumns);
    }
    // Le processus 0 diffuse la taille de l'image à tous les processus
    MPI_Bcast(&nblines, 1, MPI_INT, 0, MPI_COMM_WORLD);
    MPI_Bcast(&nbcolumns, 1, MPI_INT, 0, MPI_COMM_WORLD);

    // nombre de pixels (en parallèle seul le processus 0 aura cette information)
    int nbpixels = nblines * nbcolumns;

    // Allouer de la mémoire pour le tableau pixels(chacun pour ses pixels)
    //int* pixels = (int*) malloc(nbpixels * sizeof(int));
    int *pixels = (int*) malloc(nbpixels / size * sizeof(int));

    if (pixels == NULL) {
        printf("Erreur : allocation mémoire échouée.\n");
        // Fin
        MPI_Finalize();
        exit(1);
    }

    // Remplir le tableau pixels (seulement le processus 0)
    //fillPixels(filename, pixels, nblines, nbcolumns);
    int* all_pixels = NULL;
    if (rank == 0) {
        all_pixels = (int*) malloc(nbpixels * sizeof(int));
        fillPixels(filename, all_pixels, nblines, nbcolumns);
    }

    // Fin du chargement de l'image
    // Distribution de calcul 
    MPI_Scatter(all_pixels, nbpixels / size, MPI_INT, pixels, nbpixels / size, MPI_INT, 0, MPI_COMM_WORLD);

    // Calcul du min et du max des pixels(localement)
    
    int pix_min = pixels[0];
    int pix_max = pixels[0];
    //for (int i = 1; i < nbpixels; i++) {
    for (int i = 1; i < nbpixels / size; i++) {
        if (pixels[i] < pix_min) pix_min = pixels[i];
        if (pixels[i] > pix_max) pix_max = pixels[i];
    }
    // Fin du calcul du min et du max(localemnt)

    // Reduction pour calcul global de min/max
    int global_min, global_max;
    MPI_Reduce(&pix_min, &global_min, 1, MPI_INT, MPI_MIN, 0, MPI_COMM_WORLD);
    MPI_Reduce(&pix_max, &global_max, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);

    // Calcul de alpha, le paramètre pour les fonctions f_*(par le processus 0)
    //float alpha = 1 + (float)(pix_max - pix_min) / M;
    float alpha;
    if (rank == 0) {
        alpha = 1 + (float)(global_max - global_min) / M;
    }

    // Diffuser alpha à tous les processus par 0 
    MPI_Bcast(&alpha, 1, MPI_FLOAT, 0, MPI_COMM_WORLD);

    // Étirement du contraste pour tous les pixels avec la méthode choisie
    // (en parallèle, processus pairs => f_one, processus impairs => f_two)
    
    //for (int i = 0; i < nblines * nbcolumns; i++) {
    /*for (int i = 0; i < nblines / size; i++) {
        pixels[i] = f_one(pixels[i], alpha);
        // pixels[i] = f_two(pixels[i], alpha);
    }*/
    for (int i = 0; i < nbpixels / size; i++) {
        if (rank % 2 == 0) {
            pixels[i] = f_one(pixels[i], alpha);
        } else {
            pixels[i] = f_two(pixels[i], alpha);
        }
    }
    
    // Fin étirement

    // Sauvegarde de l'image (en parallèle seul le processus 0 effectuera cette action)

    // Collecter et rassembler tous les pixels traités
    MPI_Gather(pixels, nbpixels / size, MPI_INT, all_pixels, nbpixels / size, MPI_INT, 0, MPI_COMM_WORLD);
    if (rank == 0) {
        saveImage(all_pixels, nblines, nbcolumns, "image-grey2-stretched.png");
        free(all_pixels);
    }
    printf("Appuyez sur une touche...\n");
    //saveImage(pixels, nblines, nbcolumns, "image-grey2-stretched.png");

    free(pixels);

    // Fin sauvegarde
    MPI_Finalize();
    return 0;
}
