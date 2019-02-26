#include <stdio.h>
#include <stdlib.h>

typedef struct QNode
{
    int key;
    struct QNode *next;
} QNode;

typedef struct Queue
{
    QNode *front, *rear;
} Queue;

QNode *newNode(int k);
Queue *createQueue();
void enQueue(Queue *q, int k);
QNode *deQueue(Queue *q);
void printQueue(Queue *q);

QNode *newNode(int k)
{
    QNode *tmp = (QNode *) malloc(sizeof(QNode));
    tmp->key = k;
    tmp->next = NULL;
    return tmp;
}

Queue *createQueue()
{
    Queue *q = (Queue *) malloc(sizeof(Queue));
    q->front = q->rear = NULL;
    return q;
}

void enQueue(Queue *q, int k)
{
    QNode *tmp = newNode(k);
    if(q->rear == NULL){
        q->rear = q->front = tmp;
        return;
    }
    q->rear->next = tmp;
    q->rear = tmp;
}

QNode *deQueue(Queue *q)
{
    if(q->front == NULL)
        return NULL;
    QNode *tmp;
    tmp = q->front;
    q->front = q->front->next;

    if(q->front == NULL)
        q->rear = NULL;

    return tmp;
}

void printQueue(Queue *q)
{
    if(q->front == NULL){
        printf("Empty queue\n");
        return;
    }
    QNode *tmp = q->front;
    while(tmp != NULL){
        printf("%d", tmp->key);
        tmp = tmp->next;
        if(tmp != NULL)
            printf("->");
    }
    printf("\n");
}

int main()
{
    Queue *q = createQueue();
    enQueue(q, 10);
    printQueue(q);
    enQueue(q, 20);
    printQueue(q);
    deQueue(q);
    printQueue(q);
    deQueue(q);
    printQueue(q);
    enQueue(q, 30);
    printQueue(q);
    enQueue(q, 40);
    printQueue(q);
    enQueue(q, 50);
    printQueue(q);
    return 0;
}
