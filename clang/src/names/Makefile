hostent.o: hostent.c
	$(CC) -c $^

hostent: hostent.o
	$(CC) $^ -o $@


.PHONY: all clean

all: hostent
	
clean:
	rm -rf *.o hostent