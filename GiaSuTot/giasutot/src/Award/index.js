const makeAward = (star) => {
    if (star >= 24 * 10 * 100) return ('Siêu cấp gia sư'); // 24 thasng 
    else if (star >= 20 * 10 * 100) return ('Người đặc biệt'); //20thasng 
    else if (star >= 15 * 10 * 100) return ('Master'); // 15 thasng 
    else if (star >= 10 * 10 * 100) return ('Chuyên gia');//10 thasngs
    else if (star >= 5 * 10 * 100) return ('Kì cựu');// 5 thang
    else if (star >= 3 * 10 * 100) return ('Chiến binh');//3 thang
    else if (star >= 2 * 10 * 100) return 'Ưu tú';//2 thang 
    else return ('Newbie');//
}
function quyVeHangNghin(x) {
    if (!x) return 0;
    if (x < 1000) {
        return (x / 1000).toFixed(2);
    } else {
        return (parseInt(x.toString()?.slice(0, -3)) + parseInt(x.toString()?.slice(-3)) / 1000).toFixed(2);
    }
}
const colors = {
    'Legendary Grandmaster': '#ff0000',
    'Grandmaster': '#ff7777',
    'Master': '#ff8c00',
    'Candidate Master': '#0693e3',
    'Expert': '#aa00aa',
    'Specialist': '#03a89e',
    'Pupil': '#008000',
    'Newbie': '#8080a1'
}
const makeColor = (star) => {
    if (star >= 24 * 10 * 100) return colors['Legendary Grandmaster']; // 24 thasng 
    else if (star >= 20 * 10 * 100) return colors['Grandmaster']; //20thasng 
    else if (star >= 15 * 10 * 100) return colors['Master']; // 15 thasng 
    else if (star >= 10 * 10 * 100) return colors['Candidate Master'];//10 thasngs
    else if (star >= 5 * 10 * 100) return colors['Expert'];// 5 thang
    else if (star >= 3 * 10 * 100) return colors['Specialist'];//3 thang
    else if (star >= 2 * 10 * 100) return colors['Pupil'];//2 thang 
    else return colors['Newbie'];//
}
export { makeAward, quyVeHangNghin, makeColor }; 