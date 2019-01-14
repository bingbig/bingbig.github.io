hostent.o: hostent.c unp.h
	$(CC) -c $^

hostent: hostent.o
	$(CC) $^ -o $@

daytimetcpcli.o: daytimetcpcli.c unp.h
	$(CC) -c $^

daytimetcpcli: daytimetcpcli.o
	$(CC) $^ -o $@ 

daytimetcpsrv.o: daytimetcpsrv.c unp.h
	$(CC) -c $^

daytimetcpsrv: daytimetcpsrv.o
	$(CC) $^ -o $@ 

.PHONY: all clean

all: hostent daytimetcpcli daytimetcpsrv
	
clean:
	rm -rf *.o *.gch hostent daytimetcpcli daytimetcpsrv