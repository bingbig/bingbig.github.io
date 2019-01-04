udpserv.o: udpserv.c
	$(CC) -c $^

server:udpserv.o
	$(CC) $^ -o $@

udpcli.o: udpcli.c
	$(CC) -c $^
client: udpcli.o
	$(CC) $^ -o $@

.PHONY: all clean

all: clean server client
	
clean:
	rm -rf *.o server client