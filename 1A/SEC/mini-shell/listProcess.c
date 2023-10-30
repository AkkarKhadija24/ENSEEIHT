#include <stdio.h>    /* entrées sorties */
#include <unistd.h>   /* fork, ...*/
#include <stdlib.h>   /* exit */
#include <string.h>
#include "listProcess.h"

int lengthProcess(listProcess **tabProcess)
{
    int j = 0;
    while (tabProcess[j] != NULL){
        j++;
    }
    return j;
}

int positionProcess(listProcess **tabProcess, pid_t pidProcess)
{
    int j = 0;
    int position = -1;   // sinon
    while (tabProcess[j] != NULL){
        if (tabProcess[j]->pid == pidProcess){
            position = j;
            break;
        }
        j++;
    }
    return position;
}

pid_t pidProcess(listProcess **tabProcess, int idProcess)
{
    int j = 0;
    int pidProcess = -1;
    while (tabProcess[j] != NULL){
        if (tabProcess[j]->id == idProcess){
            pidProcess = tabProcess[j]->pid;
            break;
        }
        j++;
    }
    return pidProcess;
}

bool isIn(listProcess **tabProcess, pid_t pidProcess)
{
    return (positionProcess(tabProcess,pidProcess) != -1);
}

void addProcess(listProcess **tabProcess, listProcess *process)
{
    if (!(isIn(tabProcess, process->pid))){
        int len = lengthProcess(tabProcess);
        tabProcess[len] = malloc(512);
        tabProcess[len]->etat = EnCours;
        tabProcess[len]->id = process->id;
        tabProcess[len]->pid = process->pid;
        strcpy(tabProcess[len]->buf, process->buf);
    }
}

void deleteProcess(listProcess **tabProcess, pid_t pidProcess)
{
    if (isIn(tabProcess, pidProcess)){
        int len = lengthProcess(tabProcess);
        int position = positionProcess(tabProcess, pidProcess);
        for (int i = position+1; i < len; i++)
        {
            *(tabProcess[i-1]) = *(tabProcess[i]);
        }
        free(tabProcess[len-1]);
        tabProcess[len-1] = NULL;
        tabProcess = calloc(len-1, sizeof(tabProcess));
    }
}

void editEtatProcess(listProcess **tabProcess, pid_t pid, Etat etat)
{
    if (isIn(tabProcess, pid)){
        int position = positionProcess(tabProcess, pid);
        tabProcess[position-1]->etat = etat;
    }
}

void afficherProcess(listProcess **tabProcess)
{
    int len = lengthProcess(tabProcess);
    if (len > 0){
        printf("id\t pid\t etat\t\tbuf\n");
        for (int i = 0; i < len; i++)
        {
            int id = tabProcess[i]->id;
            int pid = tabProcess[i]->pid;
            Etat e = tabProcess[i]->etat;
            char *etat;
            switch (e)
            {
            case EnCours:
                etat = "Encours";
                break;
            case Termine:
                etat = "Termine";
                break;
            case suspendu:
                etat = "suspendu";
                break;
            case Killed:
                etat = "Killed";
                break;
            default:
                NULL;
                break;
            }
            printf("[%d]\t %d\t %s\t", id, pid, etat);
            if( tabProcess[i]->etat = Killed){
                printf("\t");
            }
            printf("%s\n", tabProcess[i]->buf);
        }
        
    } else {
        printf(" La liste des processus est vide\n");
    }
}

Etat etatProcess(listProcess **tabProcess, pid_t pidProcess)
{
    Etat etat;
    if (isIn(tabProcess, pidProcess)){
        int position = positionProcess(tabProcess, pidProcess);
        etat = tabProcess[position]->etat;
    }
    return etat;
}
