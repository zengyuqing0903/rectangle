/* global $ rectangle, validate,checkKey: true */
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
      $widthValidate = $('#width-validation-message'),
      $heightValidate = $('#height-validation-message'),
      isPassValidate = false;
    
  $forkMeGH.show("https://github.com/zengyuqing0903/rectangle");
  $bszPageFooter.show("body");

  // 字符校验
  
  $width.keypress(function(e){
    var con = e.target.value,
        pos = e.target.selectionStart;
    if(!checkKey(e.key,con,pos)) {
      e.preventDefault();
    }
  });
  $height.keypress(function(e){
    var con = e.target.value,
        pos = e.target.selectionStart;
    if(!checkKey(e.key,con,pos)) {
      e.preventDefault();
    }
  });
  // 字段级校验
  $width.focusout(function() {
    var result = validate($width.val());
    isPassValidate = result.isOK;
    if(!result.isOK) {
      $widthValidate.html('宽度' + result.reason);
      $width.select();
    } else {
      $widthValidate.html('');
    }
  });
  $height.focusout(function() {
    var result = validate($height.val());
    isPassValidate = result.isOK;
    if(!result.isOK) {
      $heightValidate.html('高度' + result.reason);
      $height.select();
    } else {
      $heightValidate.html('');
    }
  });
  /**calc button click event */
  $btn.click(function(){
    // 集中校验
    if(!isPassValidate) return;
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
});  