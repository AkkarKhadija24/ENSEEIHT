SOURCES=01_MPI_Scan 02_Contraste

all: collect


collect:
	echo ${USER}
	(cd 01_MPI_Scan; make clean)
	(cd 02_Contraste; make clean)
	tar cvf Calcul_${USER}_`hostname | cut -d'.' -f1`.tar ${SOURCES}
