export default function latComparator(a: any, b: any) {
    if (a.label_location.latitude > b.label_location.latitude) {
        return -1;
    }
    if (a.label_location.latitude < b.label_location.latitude) {
        return 1;
    }
    return 0;
}
