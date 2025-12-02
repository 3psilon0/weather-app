const getIcon = (iconName) => {
    const iconPathMap = import.meta.glob('../assets/icons/weather/*.svg', {eager: true});
    const iconMap = Object.entries(iconPathMap).reduce((acc, [path, module]) => {
        const filename = path.split('/').pop().replace('.svg', '');
        acc[filename] = module.default;
        return acc;
    }, {});

    if(Object.hasOwn(iconMap, iconName)){
        return iconMap[iconName];
    }
    else {
        throw new Error('Icon not found!')
    }
}

const getBg = (bgName) => {
    const bgPathMap = import.meta.glob('../assets/bg/*.jpg', {eager: true});
    const bgMap = Object.entries(bgPathMap).reduce((acc, [path, module]) => {
        const filename = path.split('/').pop().replace('.jpg', '');
        acc[filename] = module.default;
        return acc;
    }, {});

    if(Object.hasOwn(bgMap, bgName)){
        return bgMap[bgName];
    }
    else {
        throw new Error('Background image not found!')
    }
}


export {getIcon, getBg};