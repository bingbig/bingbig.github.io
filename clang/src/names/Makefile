hostent.o: hostent.c unp.h
	$(CC) -c $^

hostent: hostent.o
	$(CC) $^ -o $@

daytimetcpcli.o: daytimetcpcli.c unp.h
	$(CC) -c $^

daytimetcpcli: daytimetcpcli.o
	$(CC) $^ -o $@ 


.PHONY: all clean

all: hostent daytimetcpcli
	
clean:
	rm -rf *.o *.gch hostent daytimetcpcli