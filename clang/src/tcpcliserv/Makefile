tcpcli02.o: tcpcli02.c
	$(CC) -c $^

tcpserv02.o: tcpserv02.c
	$(CC) -c $^

cli: tcpcli02.o
	$(CC) $^ -o $@

ser: tcpserv02.o
	$(CC) $^ -o $@

.PHONY: all clean

all: clean cli ser
	
clean:
	rm -rf *.o cli ser