let page = {
    selectBtn: document.getElementById('j_multi_select'),
    approBtn: document.getElementById('j_approve_group'),
    covers: document.getElementsByClassName('j-cover'),
    checks: document.getElementsByClassName('j-check'),
    checkbox: document.getElementsByClassName('j-identity'),
    card: document.getElementsByClassName('j-card'),
    maniBtn: document.querySelectorAll('.j-mani-btn button[type="button"]'),
    checkboxInput: document.getElementsByClassName('j-option'),
    selectAll: document.getElementById('j_select_all')
}

// window.onload = function () {

//     // 绑定事件：点击多选
//     page.selectBtn.addEventListener('click', function () {
//         if (!hasClass(this, 'active')) {
//             addClass(this, 'active');
//             addClass(page.approBtn, 'approve-btn-display');
//             [].forEach.call(page.covers, function (item, i) {
//                 addClass(item, 'cover-display');
//             });
//             [].forEach.call(page.checkbox, function (item, i) {
//                 addClass(item, 'change-status-display');
//             });
//         } else {
//             removeClass(this, 'active');
//             removeClass(page.approBtn, 'approve-btn-display');
//             [].forEach.call(page.covers, function (item, i) {
//                 removeClass(item, 'cover-display');
//             });
//             [].forEach.call(page.checks, function (item, i) {
//                 item.className.baseVal = item.className.baseVal.replace(new RegExp('(\\s|^)check-green(\\s|$)'), '');
//             });
//             [].forEach.call(page.checkbox, function (item, i) {
//                 removeClass(item, 'change-status-display');
//             });
//             [].forEach.call(page.checkboxInput, function (item, i) {
//                 item.checked = false;
//             })
//         }
//     });

//     // 绑定事件：选择照片
//     [].forEach.call(page.covers, function (item, index) {
//         item.addEventListener('click', function () {
//             let check = this.getElementsByClassName('j-check')[0];
//             if (!check) return;
//             if (!check.className.baseVal.match(new RegExp('(\\s|^)check-green(\\s|$)'))) {
//                 check.className.baseVal += ' ' + 'check-green';
//             } else {
//                 check.className.baseVal = check.className.baseVal.replace(new RegExp('(\\s|^)check-green(\\s|$)'), '');
//             }
//         })
//     });

//     // 修改照片状态为合格/不合格/未审核 & 修改用户群组为管理员/普通用户/黑名单
//     page.maniBtn.forEach(function (item, index) {

//     });

//     [].forEach.call(page.maniBtn, function (item, index) {
//         item.addEventListener('click', function () {
//             let type = parseInt(this.children[0].dataset.id);
//             let data = [];
//             if (hasClass(page.selectBtn, 'active')) {
//                 let _check = document.getElementsByClassName('check-green');
//                 let _input = [].filter.call(page.checkboxInput, function (item) {
//                     return item.checked;
//                 });
//                 let checked = _check.length > 0 ? _check : _input;
//                 [].forEach.call(checked, function (item, i) {
//                     data.push(parseInt(item.parentNode.parentNode.dataset.id));
//                 });
//             } else {
//                 data.push(parseInt(item.parentNode.parentNode.dataset.id));
//             }
//             console.log(data, type)
//             send('POST', { data: data, type: type }, '/' + window.location.pathname.split('/')[1]);
//             window.location.reload();
//         })
//     })

//     // 全选/取消
//     page.selectAll && page.selectAll.addEventListener('click', function () {
//         if (!hasClass(this, 'active')) {
//             addClass(this, 'active');
//             [].forEach.call(page.checks, function (item, i) {
//                 item.className.baseVal += ' ' + 'check-green';
//             });
//         } else {
//             removeClass(this, 'active');
//             [].forEach.call(page.checks, function (item, i) {
//                 item.className.baseVal = item.className.baseVal.replace(new RegExp('(\\s|^)check-green(\\s|$)'), '');
//             });
//         }
//     })
// }

$(document).ready(function () {

    // 照片－“操作”
    $('.j-mani-btn button[type="button"]').on('click', function () {

        let that = $(this);

        let isApproved = that.attr('data-approve');
        let id = that.closest('.j-row').attr('data-id');

        $.ajax(`/photos/${id}`, {
            type: 'put',
            data: { isApproved },
            complete(res) {
                if (res.status === 200 && res.responseJSON.status === 0) {
                    location.reload()
                }
            }
        })
    });

    // 用户－“操作”
    $('.j-users-btn button[type="button"]').on('click', function () {

        let that = $(this);

        let userType = that.attr('data-type');
        let id = that.closest('.j-row').attr('data-id');

        $.ajax(`/users/${id}`, {
            type: 'put',
            data: { userType },
            complete(res) {
                if (res.status === 200 && res.responseJSON.status === 0) {
                    location.reload()
                }
            }
        })
    });
})