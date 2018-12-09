module.exports = {
    title: 'Bing Docs',
    description: '文档空间',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: '主页', link: '/' },
            {
                text: '归档',
                items: [
                    { 
                        text: 'PHP', 
                        items: [
                            { text: 'PHP基础知识', link: '/PHP/PHP基础知识' },
                            { text: 'PHP编程技巧与优化', link: '/PHP/PHP编程技巧与优化' },
                            { text: '安全建议', link: '/PHP/安全建议' },
                            { text: '更多...', link: '/PHP/centent' },
                        ]
                    },
                    {
                        text: '网络',
                        items: [
                            { text: '物理层', link: '/OSI/物理层' },
                            { text: '链路层', link: '/OSI/链路层' },
                            { text: '网络层', link: '/OSI/网络层' },
                            { text: '更多...', link: '/PHP/centent' },
                        ]
                    },
                    {
                        text: 'Linux',
                        items: [
                            { text: 'iptables', link: '/Linux/iptables' },
                            { text: 'natstat', link: '/Linux/natstat' },
                            { text: '跟踪ps进程', link: '/Linux/跟踪ps进程' },
                            { text: '更多...', link: '/Linux/centent' },
                        ]
                    },
                    {
                        text: 'Docker',
                        items: [
                            { text: 'Docker命令', link: '/docker/docker_command' },
                            { text: 'Docker网络', link: '/docker/docker_network' },
                            { text: 'Dockerfile', link: '/docker/dockerfile' },
                            { text: '更多...', link: '/docker/centent' },
                        ]
                    },
                    {
                        text: '操作系统',
                        items: [
                            { text: '操作系统发展史', link: '/OS/1_操作系统发展史' },
                            { text: '进程和线程', link: '/OS/2_进程和线程' },
                            { text: '互斥与同步', link: '/OS/3_互斥与同步' },
                            { text: '更多...', link: '/OS/centent' },
                        ]
                    },
                    {
                        text: '更多归档',
                        items: [
                            { text: '更多...', link: '/content' },
                        ]
                    },
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
            { text: '关于', link: 'aboutme' }
        ],
        displayAllHeaders: true, // 默认值：false
        sidebar: 'auto',
        lastUpdated: 'Last Updated', // string | boolean
        markdown: {
            lineNumbers: true
        }
    }
}