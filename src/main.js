const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [

    { logo: "C", url: "https://css-tricks.com/" },
    { logo: "D", url: "https://developer.mozilla.org/" },
    { logo: "L", url: "https://www.liaoxuefeng.com/" },
    { logo: "R", url: "http://www.ruanyifeng.com/" },
]
const removePrefix = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${removePrefix(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-baseline-close-px"></use>
                    </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt("请输入要添加的网址:")
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: removePrefix(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        });

        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem("x", string)
}

// $(document).on('keypress', (e) => {
//     const { key } = e  //简写 const key = e.key
//     for (let i = 0; i < hashMap.length; i++) {
//         if (hashMap[i].logo.toLowerCase() === key) {
//             window.open(hashMap[i].url)
//         }
//     }
// })