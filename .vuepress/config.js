module.exports = {
    title: 'Bing',
    description: '文档空间',
    head: [
        ['link', {
            rel: 'icon',
            href: 'https://avatars.githubusercontent.com/bingbig'
        }]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [{
                text: '主页',
                link: '/'
            },
            {
                text: '归档',
                items: [{
                        text: 'C',
                        link: '/clang/content'
                    },
                    {
                        text: 'PHP',
                        link: '/PHP/content'
                    },
                    {
                        text: '网络',
                        link: '/network/content'
                    },
                    {
                        text: 'Linux',
                        link: '/Linux/content'
                    },
                    {
                        text: 'Docker',
                        link: '/docker/content'
                    },
                    {
                        text: '操作系统',
                        link: '/OS/content'
                    },
                    {
                        text: 'JavaScipt',
                        link: '/JavaScript/content'
                    },
                    {
                        text: '数据库',
                        link: '/Database/content'
                    },
                    {
                        text: '生物信息',
                        link: '/Bioinformatics/content'
                    },
                ]
            },
            {
                text: '专栏',
                items: [{
                        text: 'Redis',
                        link: '/topic/redis/redis'
                    },
                    {
                        text: '更多...',
                        link: '/topic/centent'
                    },
                ]
            },
            {
                text: '杂谈',
                link: '/gossip/content'
            },
            {
                text: '关于',
                link: '/aboutme'
            }
        ],
        sidebar: {
            '/clang/': [
                'content',
                'examples/byteorder',
                'examples/readn-writen-readline',
            ],
            '/PHP/': [
                'content',
                'basic',
                'tips',
                'sugs',
                'static',
                'router',
                'composer',
                'OOP/SRP',
                'OOP/OCP',
                'OOP/LSP',
                'OOP/ISP',
                'OOP/DIP',
                'OOP/abstract_class',
                'Laravel/Container',
                'pattern/singleton'
            ],
            '/network/': [
                'content',
                'physical',
                'DataLink',
                'network',
                'transport',
                'TCP',
                'DNS',
                'OSI',
                'protocals'
            ],
            '/Linux/': [
                'content',
                'centos_ssh_login_too_slowly',
                'centos5_yum_source',
                'R730Linux_driver',
                'iptables',
                'LC_CTYPE_error',
                'netstat',
                'PBS',
                'yum_Segmentation_fault',
                'zombie_process',
                'cpu_frequence_controller',
                'mount_panasass_storage',
                'log_analysis',
                'change_perl_module_locations',
                'sys_info',
                'sys_and_hardware_clock',
                'compile_gcc',
                'track_process',
                'web_security',
            ],
            '/docker/': [
                'content',
                'command',
                'dockerfile',
                'network',
                'container_process',
            ],
            '/OS/': [
                'content',
                'history',
                'memory',
                'process_thread',
                'deadlock_hungry',
                'sync',
            ],
            '/JavaScript/': [
                'content',
                'es6_import_jquery',
                'js_deepcopy',
                'js_tips',
                'XMLHttpRequest',
                'React.js/React_webpack_babel_config'
            ],
            '/Database/': [
                'content',
                'MySQL/basic',
                'MySQL/leetcode',
                'MySQL/optimization',
                'Redis/Redis',
            ],
            '/Bioinformatics/': [
                'content',
                'softwares_install/easy_install',
                'softwares_install/augustus',
                'softwares_install/interproscan',
                'scripts/gtf2gff3.md'
            ],
            '/gossip/' : [
                'my-vscode-configuration',
                'curl-multipart-form-data'
            ],
            '/': [
                '',
                'aboutme',
                'INSTALL',
            ],
        },
        lastUpdated: '最近更新', // string | boolean
        serviceWorker: {
            updatePopup: {
                message: "您所看的内容有更新啦！",
                buttonText: "刷新"
            }
        }
    }
}