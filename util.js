/* exported rectangle,validate */
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
 * 对数据进行合法性校验
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