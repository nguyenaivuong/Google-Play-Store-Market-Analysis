function uniqApp(data, key) {
    let seen = new Set();
    return data.filter((item) => {
        let k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}
