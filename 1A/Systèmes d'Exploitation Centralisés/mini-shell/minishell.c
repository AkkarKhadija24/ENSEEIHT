#include <stdio.h>    /* entrées sorties */
#include <unistd.h>   /* fork, ...*/
#include <stdlib.h>   /* exit */
#include <signal.h>   /* traitement des signaux */
#include <sys/wait.h>
#include <fcntl.h>
#include "readcmd.h"
#include "listProcess.h"

// L a liste des processus qu'on traite
listProcess ** tabProcess;  
// Le processus encours d'execution
pid_t pidProces = 0;
// Deux booleans qui sert à executer les deux commandes ctrl_z et ctrl_c
bool ctrl_z, ctrl_c;


void handler_SIGCHILD() {
    int status, endFils;

    do {
        endFils = (int) waitpid(-1, &status,  WNOHANG | WUNTRACED | WCONTINUED);
        if (endFils == -1)
        {
            perror("ErrorWaitpid");
            exit(1);
        } else if (endFils > 0)
        {
            if (WIFEXITED(status))
            {
                if (isIn(tabProcess, endFils))
                {
                    editEtatProcess(tabProcess, endFils, Termine);
                    pidProces = 0;
                }
                
            } else if (WIFCONTINUED(status))
            {
                if (isIn(tabProcess, endFils) && (ctrl_z == false))
                {
                    editEtatProcess(tabProcess, endFils, EnCours);
                }
            }
            
            
        }
        
        
    } while (endFils > 0);
}

void handler_SIGSTP(){
    if (pidProces != 0) {
        kill(pidProces, SIGSTOP);
        printf("\n");
        printf("[%d]+ KILLED\n", pidProces);
        editEtatProcess(tabProcess, pidProces, suspendu);
        ctrl_z = true;
    }
    fflush(stdin);
}

void handler_SIGINT(){
    if (pidProces != 0) {
        kill(pidProces, SIGKILL);
        printf("\n");
        printf("[%d]+ KILLED\n", pidProces);
        editEtatProcess(tabProcess, pidProces, Killed);
        ctrl_c = true;
    }
    fflush(stdin);
}

//Function Error que j'ai fait en tp des fichiers:
int handler_error(int rslt, const char *message) {
    if (rslt < 0){
        perror(message);
        exit(1);
    }
    return rslt;
}

int main() {
    char BUF[250];
    int ret;
    int n = 0;
    tabProcess = malloc(200);
    struct cmdline* cmd;
    struct sigaction sa_SIGCHLD, sa_SIGSTP, sa_SIGINT;
    sa_SIGCHLD.sa_handler = handler_SIGCHILD;
    sa_SIGSTP.sa_handler = handler_SIGSTP;
    sa_SIGINT.sa_handler = handler_SIGINT;
    int pipe1[2], pipe2[2];
    
    sigaction(SIGCHLD, &sa_SIGCHLD, NULL);
    sigaction(SIGTSTP, &sa_SIGSTP, NULL);
    sigaction(SIGINT, &sa_SIGINT, NULL);
    while (1)
    {
        printf("Akkar@Khadija:%s>>> ", getcwd(BUF,250));
        cmd = readcmd();
        pidProces = 0;
        ctrl_c = false;
        ctrl_z = false;
        
        sigaction(SIGCHLD, &sa_SIGCHLD, NULL);
        sigaction(SIGTSTP, &sa_SIGSTP, NULL);
        sigaction(SIGINT, &sa_SIGINT, NULL);

        if (cmd->seq[0] != NULL) {
            // Reponse à la question 4 (cd, exit)
            if (strcmp(cmd->seq[0][0], "cd") == 0){
                chdir(cmd->seq[0][1]);
            } else if (strcmp(cmd->seq[0][0], "exit") == 0){
                exit(0);
            } 
            // Reponse à la question 6 (lj, sj, bg, fg)
            else if (strcmp(cmd->seq[0][0], "lj") == 0){
                afficherProcess(tabProcess);
            } else if (strcmp(cmd->seq[0][0], "sj") == 0){
                if (cmd->seq[0][1] == NULL){
                    printf("Error: identifiant inoutrouvable!!\n");
                } else {
                    pid_t pid1 = pidProcess(tabProcess, atoi(cmd->seq[0][1]));
                    if (isIn(tabProcess, pid1)){
                        if (etatProcess(tabProcess, pid1) == EnCours){
                            printf("[%d]+ KILLED\n", pid1);
                            kill(pid1, SIGSTOP);
                            editEtatProcess(tabProcess, pid1, suspendu);
                        } else {
                            printf("Error: processus ne fonctionne pas!!\n");
                        }
                        
                    } else {
                        printf("Error: processus n'est pas trouvé!!\n");
                    }
                }
                pidProces = 0;
            } else if (strcmp(cmd->seq[0][0], "bg") == 0){
                if (cmd->seq[0][1] == NULL){
                    printf("Error: identifiant inoutrouvable!!\n");
                } else {
                    pid_t pid1 = pidProcess(tabProcess, atoi(cmd->seq[0][1]));
                    if (isIn(tabProcess, pid1)){
                        printf("Exécution en arrière-plan du processus!!\n");
                        editEtatProcess(tabProcess, pid1, EnCours);
                        kill(pid1, SIGCONT);
                    } else {
                        printf("Error: processus n'est pas trouvé!!\n");
                    }
                }
            } else if (strcmp(cmd->seq[0][0], "fg") == 0){
                if (cmd->seq[0][1] == NULL){
                    printf("Error: identifiant inoutrouvable!!\n");
                } else {
                    pid_t pid1 = pidProcess(tabProcess, atoi(cmd->seq[0][1]));
                    if (isIn(tabProcess, pid1)){
                        kill(pid1, SIGCONT);
                        printf("Exécution en avant-plan du processus!!\n");
                        editEtatProcess(tabProcess, pid1, EnCours);
                        pidProces = pid1;
                        int status;
                        waitpid(pid1, &status, WUNTRACED);
                        continue;
                    } else {
                        printf("Error: processus n'est pas trouvé!!\n");
                        continue;
                    }
                    pidProces = pid1;
                }
                pidProces = 0;
            } else {
                ret = handler_error(fork(), "Errorfork");

                if (ret == 0){ // fils

                    if (!(cmd->in == NULL)){
                        if ((int) freopen(cmd->in,"r", strdin) == -1){
                            fprintf(stderr, "%s\n", strerror(errno));
                        }
                        
                    }

                    if (!(cmd->in == NULL)){
                        if ((int) freopen(cmd->in,"w", strdin) == -1){
                            fprintf(stderr, "%s\n", strerror(errno));
                        }
                        
                    }
                    

                    // Question 9 : la gestion des tubes simples.

                    if (!(cmd->seq[1] == NULL)){
                        handler_error(pipe(pipe1), "Error : la création de pipe\n");
                    
                        int ret1 = handler_error(fork(), "Errorfork");;
                        if (ret1 == 0){
                            close(pipe1[0]);   //fermeture de la sortie de pipe1.

                            handler_error(dup2(pipe1[1], STDOUT_FILENO), "Error : dup2\n");

                            handler_error(execvp(cmd->seq[0][0], cmd->seq[0]), "Errorexecvp\n");
                            
                        } else {
                            close(pipe1[1]); // fermeture de l'entré du pipe1

                            handler_error(dup2(pipe1[0], STDOUT_FILENO), "Error : dup2\n");

                            handler_error(execvp(cmd->seq[1][0], cmd->seq[1]), "Errorexecvp\n"); 
                            
                        }
                        
                    } else {
                        handler_error(execvp(cmd->seq[0][0], cmd->seq[0]), "Errorexecvp\n"); 
                    }

                    // Question 10 : Création des pipelines.
                    handler_error(pipe(pipe1), "Error : la création de pipe\n");

                    int ret2 = handler_error(fork(), "Error : fork\n");
                    if (ret2 == 0){
                        close(p1[0]);
                        handler_error(dup2(pipe1[1],STDOUT_FILENO), "Error : dup2\n");
                            
                        close(pipe1[1]);
                        
                        andler_error(pipe(pipe2), "Error : la création de pipe\n");
                        
                        int ret3 = handler_error(fork(), "Error : fork\n");

                        else if (ret3 == 0) {
                            close(pipe2[0]);
                            handler_error(dup2(pipe1[1],STDOUT_FILENO), "Error : dup2\n");
                           
                            close(pipe2[1]);
                            handler_error(execvp(cmd->seq[0][0], cmd->seq[0]), "Error : execvp\n");
                            
                        } else {
                            close(pipe2[1]);
                            handler_error(dup2(pipe2[0],STDIN_FILENO), "Error : dup2\n");
                           
                            close(pipe2[0]);
                            
                            handler_error(execlp(cmd->seq[1][0],cmd->seq[1][0],cmd->seq[1][1],NULL), "Error : execvp\n");
                            
                        }
                    }

                } else {
                    listProcess *p = malloc(sizeof(listProcess));
                    p->etat = EnCours;
                    p->id = ++n;
                    p->pid = ret;
                    strcat(p->buf, cmd->seq[0][0]);
                    addProcess(tabProcess, p);
                    if (cmd->backgrounded == NULL){
                        pidProces = ret;
                        int status;
                        if (!WIFSTOPPED(status)){
                            if((isIn(tabProcess, ret)) && (ctrl_z = false) && (ctrl_c == false)){
                                editEtatProcess(tabProcess, ret, Termine);
                            }
                        }
                        pidProces = 0;
                    }
                }                
            }              
        }
    }
    exit(EXIT_SUCCESS);
}
