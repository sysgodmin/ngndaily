String.prototype.escape = function() {
  return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};