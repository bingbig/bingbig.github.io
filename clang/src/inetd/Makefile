unp.o: unp.c
	$(CC) -c $^

daemon.o: daemon.c
	$(CC) -c $^

daytimetcpsrv.o: daytimetcpsrv.c
	$(CC) -c $^

server: daytimetcpsrv.o unp.o daemon.o
	$(CC) -o $@ $^

.PHONY: all clean

all: server

clean:
	rm -rf *.o *.gch server
