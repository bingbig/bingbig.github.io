module.exports = {
    title: 'Bing Docs',
    description: '文档空间',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: '主页', link: '/' },
            {
                text: '归档',
                items: [
                    {text: 'PHP', link: '/PHP/content'},
                    {text: '网络', link: '/OSI/content'},
                    {text: 'Linux', link: '/Linux/content'},
                    {text: 'Docker', link: '/docker/content'},
                    {text: '操作系统', link: '/OS/content'},
                    {text: '更多归档', link: '/content'},
                ]
            },
            {
                text: '专栏',
                items: [
                    { text: 'Redis', link: '/topic/redis/redis' },
                    { text: '更多...', link: '/topic/centent' },
                ]
            },
            {
                text: '杂谈',
                items: [
                    { text: '谈谈Redis', link: '/gossip/redis/redis' },
                    { text: '更多...', link: '/gossip/centent' },
                ]
            },
            { text: '关于', link: '/aboutme' }
        ],
        sidebar: {
            '/PHP/': [
                'PHP基础知识',
                'PHP编程技巧与优化',
                '安全建议',
                'static',
                'PHP路由技术和原理',
                'composer',
                'OOP/SRP',
                'OOP/OCP',
                'OOP/LSP',
                'OOP/ISP',
                'OOP/DIP',
                'OOP/abstract_class',
                'Laravel/Container',
                'pattern/单例模式'
            ],
            '/': [
                '',
                'INSTALL'
            ],
        },
        lastUpdated: '最近更新', // string | boolean
    }
}