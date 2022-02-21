class ScoreTable {
    constructor() {
        this.table = JSON.parse(getItem('table')) || [];
    }

    get() {
        this.table.sort(function (a, b) { return b[2] - a[2];});
        let content = "";
        for (let i = 0; i < this.table.length; i++) {
            content += "<tr><td>" +
                this.table[i][0] + "</td><td>" +
                this.table[i][1] + "</td><td>" +
                this.table[i][2] + "</td></tr>";
        }
        return content;
    }

    add(name, data) {
        const date = new Date();
        const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.table.push([time, name, data]);
        setItem("table", JSON.stringify(this.table));
    }


}