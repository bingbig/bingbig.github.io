#include <stdio.h>
#include <stdlib.h>

typedef struct stackNode
{
    int data;
    struct stackNode *next;
} stackNode;

typedef struct stack
{
    stackNode *top;
    int size;
} stack;

stack *stackInit();
int isEmpty(stack *s);
int stackGet(stack *s);
int stackPop(stack *s);
int stackPush(stack *s, int data);
void stackPrint(stack *s);

stack *stackInit()
{
    stack *s = malloc(sizeof(stack));
    s->top = NULL;
    s->size = 0;
    return s;
}

int isEmpty(stack *s)
{
    if(s == NULL || s->size == 0)
        return 1;

    return 0;
}

int stackPush(stack *s, int data)
{
    stackNode *node = malloc(sizeof(stackNode));
    node->data = data;
    node->next = NULL;

    if(s->top == NULL)
        s->top = node;
    else {
        node->next = s->top;
        s->top = node;
    }
    s->size++;
    return s->size;
}

void stackPrint(stack *s)
{
    if(s->size == 0)
        return;

    stackNode *node;
    node = s->top;
    while(node != NULL){
        printf(" %d ", node->data);
        node = node->next;
    }
    printf("\n");
}

int stackPop(stack *s)
{
    if(s->size < 1){
        printf("Error: stack is empty!\n");
        exit(0);
    }
        
    int data = s->top->data;
    stackNode *node = s->top->next;
    free(s->top);
    s->top = node;
    return data;
}

int stackGet(stack *s)
{
    if (s->size < 1){
        printf("Error: stack is empty!\n");
        exit(0);
    }

    return s->top->data;
}

// int main(int argc, char const *argv[])
// {
//     stack *s = stackInit();
//     printf("s is empty ? %s \n", isEmpty(s) ? "Y" : "N");
//     stackPush(s, 1);
//     stackPush(s, 2);
//     stackPush(s, 3);
//     printf("s is empty ? %s \n", isEmpty(s) ? "Y" : "N");
//     stackPrint(s);
//     printf("Pop out %d\n", stackPop(s));
//     stackPrint(s);

//     return 0;
// }
