export default function longComparator(a: any, b: any) {
    if (a.label_location.longitude < b.label_location.longitude) {
        return -1;
    }
    if (a.label_location.longitude > b.label_location.longitude) {
        return 1;
    }
    return 0;
}
