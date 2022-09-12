export default interface Location {
    name: string,
    label_location: {
        latitude: number,
        longitude: number
    },
    forecast: string,
}
