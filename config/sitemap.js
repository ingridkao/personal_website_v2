import CodingList from './CodingList'
export const MainLink = [
    {
        url: '/coding',
        title: '叩叮',
        subtitle: 'Coding',
        priority: 1,
        lastmod: '2022-03-30T13:30:00.000Z'
    },
    {
        url: '/investment',
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
        ...MainLink,
        ...Object.keys(CodingList)
    ]
}