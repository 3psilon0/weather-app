const iconPathMap = import.meta.glob('../assets/icons/weather/*.svg', {eager: true});

const iconMap = Object.entries(iconPathMap).reduce((acc, [path, module]) => {
    const filename = path.split('/').pop().replace('.svg', '');
    acc[filename] = module.default;
    return acc;
}, {});

export default iconMap;