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
                        text: 'GO',
                        link: '/GO/content'
                    },
                    {
                        text: '网络',
                        link: '/network/content'
                    },
                    {
                        text: '数据结构',
                        link: '/datastructure/content'
                    },
                    {
                        text: '算法',
                        link: '/algorithms/content'
                    },
                    {
                        text: '数据库',
                        link: '/Database/content'
                    }
                ]
            },
            {
                text: '专栏',
                items: [
                    {
                        text: 'Redis',
                        link: '/topics/redis/content'
                    },
                    {
                        text: 'Linux 容器',
                        link: '/topics/container/content'
                    },
                    {
                        text: '更多...',
                        link: '/topics/centent'
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
            '/topics/': [
                'redis/server',
                'redis/redisinit',
                'redis/event_driven_library',
                'redis/anet',
            ],
            '/clang/': [
                'content',
                'unp/byteorder',
                'unp/intro',
                'unp/tcp-socket',
                'unp/tcpcliserv',
                'unp/io-multiplexing',
                'unp/udp-socket',
                'unp/names',
                'unp/daemon_inetd',
                'ipc/shared-memory',
                'ipc/system-v-shm'
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
            '/Database/': [
                'content',
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
            '/gossip/' : [],
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