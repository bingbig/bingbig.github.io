module.exports = {
    title: 'Bing Docs',
    description: 'Personal staffs',
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
                            { text: '路由技术和原理', link: '/PHP/路由技术和原理' },
                        ]
                    },
                    {
                        text: '网络',
                        items: [
                            { text: '协议', link: '/OSI/协议' },
                            { text: '物理层', link: '/OSI/物理层' },
                            { text: '链路层', link: '/OSI/链路层' },
                            { text: '网络层', link: '/OSI/网络层' },
                            { text: '传输层', link: '/OSI/传输层' },
                            { text: 'TCP', link: '/OSI/TCP' },
                            { text: 'DNS', link: '/OSI/DNS' },
                            { text: 'OSI', link: '/OSI/OSI' },
                        ]
                    }
                ]
            },
            { text: '关于', link: '' }
        ],
        displayAllHeaders: true, // 默认值：false
        sidebar: 'auto',
        lastUpdated: 'Last Updated', // string | boolean
    }
}