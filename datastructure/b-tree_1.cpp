// C++ 实现搜索和bianli
#include <iostream>
using namespace std;

// BTree node
class BTreeNode
{
    int *keys; // 键数组
    int t;  // 最小的度，定义键值的范围
    BTreeNode **C; // 子节点指针
    int n; // 当前键的数目
    bool leaf; // 是否是叶结点

public:
    BTreeNode(int _t, bool _leaf);   // 构造器
    void traverse(); // 从根节点开始遍历所有的结点
    BTreeNode *search(int k); // 查找k是否存在

friend class BTree; // 声明友元类
};

class BTree
{
    BTreeNode *root; // 根节点指针
    int t; // 最小度
public:
    // 构造器
    BTree(int _t){
        root = NULL;
        t = _t;
    }

    // 遍历树的函数
    void traverse()
    {
        if(root != NULL) root->traverse();
    }

    // 查找
    BTreeNode *search(int k){
        return (root == NULL) ? NULL : root->search(k);
    }
};

BTreeNode::BTreeNode(int _t, bool _leaf)
{
    t = _t;
    leaf = _leaf;
    keys = new int[2*t -1];
    C = new BTreeNode *[2*t];
    n = 0;
}

void BTreeNode::traverse()
{
    int i;
    for(i = 0; i < n; i ++)
    {
        if(leaf == false)
            C[i]->traverse();
        cout << " " << keys[i];
    }
    if(leaf == false)
        C[i]->traverse();
}

BTreeNode *BTreeNode::search(int k)
{
    int i = 0;
    while(i < n && k > keys[i])
        i++;
    // 假如找到键值为k的结点，返回这个结点
    if(keys[i] == k)
        return this;
    // 键值为k的结点没有找到，当前结点是叶结点
    if(leaf == true)
        return NULL;
    
    return C[i]->search;
}

