#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define ERR 0
#define OK 1

typedef struct Queue
{
    int front, rear, size;
    unsigned capacity;
    int * array;
} Queue;

Queue *createQueue(unsigned capacity);
int isFull(Queue *queue);
int isEmpty(Queue *queue);
int enqueue(Queue *queue, int item);
int dequeue(Queue *queue);
int front(Queue *queue);
int rear(Queue *queue);
void printQueue(Queue *queue);

Queue *createQueue(unsigned capacity)
{
    Queue *queue = (Queue *) malloc(sizeof(Queue));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = (int *)malloc(queue->capacity * sizeof(int));
    return queue;
}

int isFull(Queue *queue)
{
    return (queue->size == queue->capacity);
}

int isEmpty(Queue *queue)
{
    return queue->size == 0;
}

int enqueue(Queue *queue, int item)
{
    if(isFull(queue))
        return ERR;
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
    printf("%d enqueued to queue\n", item);
    return OK;
}

int dequeue(Queue *queue)
{
    int item;
    if(isEmpty(queue))
        return INT_MIN;
    item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size--;

    printf("%d dequeue from queue\n", item);
    return item;
}

int rear(Queue *queue)
{
    if(isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->rear];
}

int front(Queue *queue)
{
    if(isEmpty(queue))
        return INT_MIN;
    return queue->array[queue->front];
}

void printQueue(Queue *queue)
{
    if(isEmpty(queue)){
        printf("Empty queue\n");
        return;
    }
    int idx = queue->front;
    while(idx != queue->rear){
        printf("%d->", queue->array[idx]);
        idx = (idx + 1) % queue->capacity;
    }

    printf("%d\n", queue->array[idx]);
}

int main(int argc, char const *argv[])
{
    Queue *queue = createQueue(3);
    enqueue(queue, 1);
    printQueue(queue);
    enqueue(queue, 2);
    printQueue(queue);
    enqueue(queue, 3);
    printQueue(queue);
    dequeue(queue);
    printQueue(queue);
    dequeue(queue);
    printQueue(queue);
    dequeue(queue);
    printQueue(queue);
    return 0;
}

