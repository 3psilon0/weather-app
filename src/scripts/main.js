import iconMap from './iconManager.js'

Object.keys(iconMap).forEach((filename) => {
    const svg = document.createElement('img');
    svg.className = 'icon'
    svg.alt = filename
    svg.src = iconMap[filename]
    document.querySelector('#app').append(svg)
})