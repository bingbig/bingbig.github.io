daytimetcpsrv.o: daytimetcpsrv.c daemon_init.c
	$(CC) -c $^
server: daytimetcpsrv.o daemon_init.o
	$(CC) -o $@ $^

.PHONY: all clean

all: server

clean:
	rm -rf *.o *.gch server
