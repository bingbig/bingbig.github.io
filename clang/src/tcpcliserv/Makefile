tcpcli01.o: tcpcli01.c
	$(CC) -c $^

tcpserv01.o: tcpserv01.c
	$(CC) -c $^

cli: tcpcli01.o
	$(CC) $^ -o $@

ser: tcpserv01.o
	$(CC) $^ -o $@

.PHONY: all clean

all: clean cli ser
	
clean:
	rm -rf *.o cli ser