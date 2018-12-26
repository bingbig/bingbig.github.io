tcpcli.o: tcpcli.c
	$(CC) -c $^

tcpserv.o: tcpserv.c
	$(CC) -c $^

cli: tcpcli.o
	$(CC) $^ -o $@

ser: tcpserv.o
	$(CC) $^ -o $@

.PHONY: all clean

all: clean cli ser
	
clean:
	rm -rf *.o cli ser