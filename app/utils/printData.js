export const printDiv = (divtoprint) => {
    //console.log('print');
    let printContents = document.getElementById(divtoprint).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };