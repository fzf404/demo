const nav = [
  {
    title: 'Github',
    link: 'https://github.com/fzf404/Docute/',
  },
]

// 获取 SideBar
fetch('./static/custom.json')
  .then((res) => {
    return res.json()
  })
  .then((sidebar) => {
    // 初始化 Docute
    new Docute({
      title: 'Docute',
      theme: 'dark',
      highlight: [],
      darkThemeToggler: true,
      cssVariables(theme) {
        return theme === 'dark'
          ? {
              pageBackground: '#1f1f1f',
              headerBackground: '#161616',
              headerTextColor: '#ad4e00',
              sidebarWidth: '240px',
              sidebarBackground: '#1c1c1c',
              mainBackground: '#242424',
              borderColor: '#454545',
              sidebarLinkActiveColor: 'var(--accent-color)',
            }
          : {
              pageBackground: '#efefef',
              headerBackground: '#dadada',
              headerTextColor: '#ad4e00',
              sidebarWidth: '240px',
              sidebarBackground: '#e8e8e8',
              mainBackground: '#f6f6f6',
              borderColor: '#c4c4c4',
              inlineCodeBackground: '#dedede',
              sidebarLinkActiveColor: 'var(--accent-color)',
            }
      },
      nav: nav,
      sidebar: [...sidebar],
      footer: `Build by <a href="https://fzf404.art">fzf404 <ExternalLinkIcon /> </a>, Power by <a href="https://github.com/egoist/docute">docute <ExternalLinkIcon /> </a>`,
    })
  })
