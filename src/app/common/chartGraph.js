export function barGraph(config) {
    return {
        title: {
            text: config.title,
            x: "center",
            y: "top"
        },
        tooltip: {},
        legend: {
            data: ["用户调用次数"]
        },
        xAxis: {
            data: config.xData
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: config.yData
            }
        ]
    };
}

export function lineGraph(config) {
    return {
        title: {
            text:config.title,
            x: "center",
            y: "top"
        },
        xAxis: {
            type: "category",
            data: config.xData
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: config.yData,
                type: "line"
            }
        ]
    }
};
export function pieGraph(config) {
    return {
        title: {
            text: config.title,
            x: "center",
            y: "top"
        },
        tooltip: {
            trigger: "item",
            formatter: "{a}<br/>{b}:{c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            x: "left",
            y:'bottom',
            data: config.opinion
        },
        series: [
            {
                name: "用户数量",
                type: "pie",
                radius: ["30%", "40%"],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: "center"
                    }
                },
                data: config.pieData
            }
        ]
    }
}