!function(e,f){var a=$("#article-form"),b=$("#title"),c=$("#article"),d=$("#meta");a.unbind("submit").bind("submit",function(a){if(2<b.val().length&&100<c.val().length&&1<d.val().length)this.submit();else return a.preventDefault(),!1})}("undefined"!==typeof window?window:this,document);