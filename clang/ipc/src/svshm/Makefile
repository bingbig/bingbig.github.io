shmget.o: shmget.c unpipc.h
	$(CC) -c $^
shmget:	shmget.o
	$(CC) $^ -o $@

shmrmid.o: shmrmid.c unpipc.h
	$(CC) -c $^
shmrmid: shmrmid.o
	$(CC) $^ -o $@

shmwrite.o: shmwrite.c unpipc.h
	$(CC) -c $^
shmwrite: shmwrite.o
	$(CC) $^ -o $@

shmread.o: shmread.c unpipc.h
	$(CC) -c $^
shmread: shmread.o
	$(CC) $^ -o $@

.PHONY: all clean
all: shmget shmrmid shmwrite shmread
clean:
	rm *.o shmget *gch shmrmid shmwrite shmread
