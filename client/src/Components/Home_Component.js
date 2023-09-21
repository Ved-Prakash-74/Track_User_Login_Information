export const getDeviceType = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1024) {
        return 'Desktop / Laptop';
    } else if (screenWidth < 1024 && screenWidth > 768) {
        return 'Tablet';
    } else {
        return 'Mobile';
    }
}


export const getBrowserName = () => {
    let userAgent = navigator.userAgent;
    if (userAgent.match(/edg/i)) {
        return "Edge"
    }
    else if (userAgent.match(/firebox|fxios/i)) {
        return "Firebox"
    }
    else if (userAgent.match(/opr/i)) {
        return "Opera"
    }
    else if (userAgent.match(/chrome|chromium|crios/i)) {
        return "Chrome"
    }
    else if (userAgent.match(/safari/i)) {
        return "Safari"
    }
    else {
        return "Other Browser"
    }
}

export const getOsName = () => {
    let os = navigator.userAgent
    if (os.search('Windows') !== -1) {
        return "Windows";
    }
    else if (os.search('Mac') !== -1) {
        return "MacOS";
    }
    else if (os.search('X11') !== -1 && !(os.search('Linux') !== -1)) {
        return "UNIX";
    }
    else if (os.search('Linux') !== -1 && os.search('X11') !== -1) {
        return "Linux"
    }
   else if (os.search('andriod')) {
        return "Andriod"
    }
    else if (os.search('ios')) {
        return "Apple"
    }
    else {
        return "Other OS";
    }
}
