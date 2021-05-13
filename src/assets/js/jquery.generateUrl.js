
// Title to a URL slug in jQuery

// function convertToSlug(Text) {
//     return Text
//         .toLowerCase()
//         .replace(/ /g, '-')
//         .replace(/[^\w-]+/g, '')
//         ;
// }

var generateUrlFunction = (function () {
    return {
        convertToSlug: function (Text) {
            Text = Text.replace(/^\s+|\s+$/g, ''); // trim
            Text = Text.toLowerCase();

            // remove accents, swap ñ for n, etc
            var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
            var to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
            for (var i = 0, l = from.length; i < l; i++) {
                Text = Text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            Text = Text.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            return Text;
        }
    }
})(generateUrlFunction || {})