#include <stdbool.h>
#include <unistd.h>
#ifndef _LISTPROCESSUS_H
#define _LISTPROCESSUS_H

// Les etats existant d'un processus
enum Etat{EnCours,Termine,Killed,suspendu};
typedef enum Etat Etat;

// L'enregistrement des commandes d'un processus
struct listProcess
{
    int id;         // L'identifiant d'un processus
    pid_t pid;      // Le pid d'un processus
    Etat etat;      // L'etat d'un processus
    char buf[200];  // Le tableau des commandes
};

typedef struct listProcess listProcess;

int lengthProcess(listProcess **tabProcess);

int positionProcess(listProcess **tabProcess, pid_t pidProcess);

pid_t pidProcess(listProcess **tabProcess, int idProcess);

bool isIn(listProcess **tabProcess, pid_t pidProcess);

void addProcess(listProcess **tabProcess, listProcess *process);

void deleteProcess(listProcess **tabProcess, pid_t pidProcess);

void editEtatProcess(listProcess **tabProcess, pid_t pid, Etat etat);

void afficherProcess(listProcess **tabProcess);

Etat etatProcess(listProcess **tabProcess, pid_t pidProcess);

#endif
