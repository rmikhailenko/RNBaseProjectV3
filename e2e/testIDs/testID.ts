export default {
    splash: {
        container: "Splash Container",
    },
    menuScreen: {
        container: "Menu Container",
        item: {
            container: (title: string) => `Menu Item Container ${title}`,
            button: (title: string) => `Menu Link Container ${title}`,
        },
        selectedRegion: {
            container: 'Selected Region Container',
            item: (region: string) => `All region list item ${region}`
        },
        all_countries: {
            container: 'All countries container',
            item: (name: string) => `All countries list item ${name}`
        }
    }
};