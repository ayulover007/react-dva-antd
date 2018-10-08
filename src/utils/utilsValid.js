
export function validPhone(rule, value, callback) {
  if(!!value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))){
    callback("手机号码格式不正确")
  } else {
    callback()
  }
}

export function validateContact(rule, value, callback) {
  if(value.number === '' || value.number === null) {
    callback(value.contactType + '号必须填写');
  } else if (value.number.length > 12) {
    callback(value.contactType + '号长度过长');
  } else {
    callback();
  }
}
