export const MainLink = [
    {
        url: '/BlogMD',
        title: 'Blog',
        subtitle: 'BlogMD',
        priority: 1,
        lastmod: '2022-03-30T13:30:00.000Z'
    },
    {
        url: '/Book',
        title: '閱讀',
        subtitle: 'Read',
        priority: 1,
        lastmod: '2022-04-14T13:30:00.000Z'
    },
    // {
    //     url: '/about',
    //     title: '關於',
    //     subtitle: 'About',
    //     priority: 1,
    //     lastmod: '2022-03-30T13:30:00.000Z'
    // },
    {
        url: '/Coding',
        title: '叩叮',
        subtitle: 'Coding',
        priority: 1,
        lastmod: '2022-03-30T13:30:00.000Z'
    },
    {
        url: '/Investment',
        title: '投資',
        subtitle: 'Investment',
        priority: 1,
        lastmod: '2022-03-30T13:30:00.000Z'
    }
]
export default {
    hostname: 'https://ingridkao.github.io/personal_website_v2/',
    lastmod: '2022-03-24',
    gzip: true,
    exclude: [
        '/404',
    //    '/admin/**'
    ],
    routes: [
        {
            url: '/',
            priority: 1, // 網頁的重要程度，0.1 - 1
            lastmod: '2022-03-30T13:30:00.000Z'
        },
        ...MainLink
    ]
}