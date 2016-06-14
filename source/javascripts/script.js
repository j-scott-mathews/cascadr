(function() {
  $(function() {
    return console.log("hello");
  });
   $(function(){
      // $("#card").flip();
      $("#card").flip({
        autosize: true,
      });
      $("#card").flip({
        axis: "x", // y or x
        reverse: false, // true and false
        trigger: "hover", // click or hover
        speed: 1500
      });
      console.log('hello')
      // $("#card").flip({
      //   axis: "x",
      //   reverse: true,
      //   trigger: "click"
      // });
});


}).call(this);
