/* exported rectangle,validate,checkKey */
function rectangle(){
  return{
    'perimeter': function(width,height){
      return 2 * (width + height);
    },
    'area': function(width,height){
      return width * height;
    }
  };
} 

/**
 * 对数据进行合法性校验（字段）
 *
 * @param msg 被验证的信息
 * @returns result 有两个字段
 *          isOK boolean 验证通过为 true，验证不通过为 false
 *          reason 验证不通过的理由
 */
function validate(data) {
  var result = {
    isOK: false,
    reason: ''
  };

  if(data === '') {
    result.reason = '不能为空！';
    return result;
  }

  if(!/^-?(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?$/.test(data)) {
    result.reason = '必须是数值';
    return result;
  }

  if(Number(data) < 0) {
    result.reason = '必须大于零';
    return result;
  }

  result.isOK = true;
  return result;
}

//字符级校验 
// key:键盘按键 con:输入框内容 pos:按键位置
function checkKey(key, con, pos) {
  if(/[abcdf-zABCDF-Z`~!@#$%^&*()\-=_+[\]{}|;:'",<>/?\\]/.test(key)) {
    return false;
  }

  if(key === '.') {
    if(pos === 0 || con.indexOf('.') !== -1) return false;//按下.的位置是否是首位，查询再次按.时前面是否出现过.

    if(pos === 1 && con.substring(0,1) === '-') return false;//.排在首位，.在负号后面
  }

  // 合法字符 e
  // 允许出现在非科学计数法的数字末尾
  // 允许出现在非科学计数法的数字中间
  //
  // 不允许出现在非科学计数法的数字前面
  //不允许出现在空文本中 
  // 不允许出现在负号后面
  //
  // 不允许出现在科学计数法数字（e和E）的末尾
  // 不允许出现在科学计数法数字的前面
  // 不允许出现在科学计数法数字的中间
  if(key === 'e') {
    if(pos === 0 || con.indexOf('e') !== -1 || con.indexOf('E') !== -1) 
      return false;//按下e的位置是否是首位，查询再次按e时前面是否出现过e，E
    if(pos === 1 && con.substring(0,1) === '-') return false;//e排在首位，e在负号后面
  }
  // E:同e
  if(key === 'E') {
    if(pos === 0 || con.indexOf('e') !== -1 
        || con.indexOf('E') !== -1) return false;

    if(pos === 1 && con.substring(0,1) === '-') return false;
  }

  return true;
}