module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
          ).getFullYear()}`;
    },

    // format_plural: (string, count) => {

    //     if (count !== 1) {
    //         return `${string}s`;
    //     }

    //     return string
    // },

    // format_url: url => {
    //     return url
    //         .replace('http://', '')
    //         .replace('https://', '')
    //         .replace('www.', '')
    //         .split('/')[0]
    //         .split('?')[0];
    // }

    format_department_tag: name => {
        return name.replace(/\s+/g, '');
    },


}