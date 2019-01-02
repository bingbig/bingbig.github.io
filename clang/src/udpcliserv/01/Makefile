udpserv.o: udpserv.c
	$(CC) -c $^

server:udpserv.o
	$(CC) $^ -o $@

.PHONY: all clean

all: clean server
	
clean:
	rm -rf *.o server