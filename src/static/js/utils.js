import {saveAs} from 'file-saver';

/**
 * 导出数据为CSV文件
 * @param {object} obj 文件名、表头、数据
 */
export function exportCsv(obj) {
    const name = obj.name,
        title = obj.title,
        data = obj.data,
        str = [];
    str.push(obj.title.join(","));
    data.forEach(v => {
        let temp = [];
        obj.columns.forEach(c => {
            temp.push(v[c]);
        });
        str.push(temp.join(","));
    });
    const blob = new Blob(['\uFEFF' + str.join('\n')], { type: "text/plain;charset=utf-8" });
    saveAs(blob, name + ".csv");
}

/**
 * Date转年月日String
 * @param {Date} date 日期
 */
export function toDateString(date){
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}