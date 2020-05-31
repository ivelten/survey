
const pages = {}

export default function(config) {
    return function(Component) {
        pages[config.name] = {
            ...config,
            Component: Component
        }
    }
}

export const getTypes = () => Object.values(pages)

export const getPage = (name) => pages[name]
