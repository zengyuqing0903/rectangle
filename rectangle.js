/* global $ rectangle: true */
/**
 * 小数点后面保留第 n 位
 *
 * @param x 做近似处理的数
 * @param n 小数点后第 n 位
 * @returns 近似处理后的数 
 */
function roundFractional(x, n) {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}
$(function(){
  // get dom ele
  var $width = $('#width'),
      $height = $('#height'),
      $btn = $('#calculate'),
      $perimeter = $('#perimeter'),
      $area = $('#area');
  /**calc button click event */
  $btn.click(function(){
    // 集中校验
    if(!validate('#width') || !validate('#height')) return;

    // get value
    var w = Number($width.val()),
        h = Number($height.val());
    // calculate
    var rect = rectangle();
    // decimalsave
    var p = roundFractional(rect.perimeter(w,h),2);
    var a = roundFractional(rect.area(w,h),2);
    // output
    $perimeter.val(p);
    $area.val(a);
  });
// 字段级校验
  $width.focusout(function(){
    if(!validate('#width')) $width.select();
  });

  $height.focusout(function(){
    if(!validate('#height')) $height.select();
  });
  function validate(field){
    var $data = $(field),
        name=$data.attr('data-label')
        $msg = $(field + '-validation-message');
    // validate null
    if($data.val() === ''){
      $msg.html(name+'不能为空！');
      $data.select();
      return false
    }
    // validate number
    if(!(/^-?(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?$/.test($data.val()))){
      $msg.html(name+'必须是数值！');
      $data.select();
      return false
    }
    // validate > 0
    if(Number($data.val()) < 0){
      $msg.html(name+'必须大于零！');
      $data.select();
      return false
    }
    
    $msg.html('');
    return true;
  }
});  