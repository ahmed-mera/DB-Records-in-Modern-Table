/* global varibales */
let table, rows , columns, dataTable = [];
$('.openModelTable').click();

 let setSelect = id => {
   const rows = document.querySelectorAll('.my-row');
   rows.forEach((row, index) => {
     index == (id - 1) ?  row.classList.toggle('tr-color-selected') : row.classList.remove('tr-color-selected');
   })
  rowSelected();
}


let rowSelected = () => {
  const rows = document.querySelectorAll('.tr-color-selected').length;
  $('#rowSelected').html(rows);
  rows ? $('.buttonDelete, .buttonEdit ').removeAttr('disabled') : $('.buttonDelete, .buttonEdit ').attr('disabled', true);

}




$('.createTable').click(function () {
  let inputs = $(this).parents('.container').find('.modelTable .modal-body > div > input'), // get inputs
      close = $(this).parents('.container').find('.close'), // get inputs
      nameOfRows = $('#nameOfRows').find('.modal-body'), // get inputs
      dataTaregtOld = $('.openModelTable').attr('data-target');

  if(!validate(inputs, inputs.length, 'number').includes(false)){
    rows = $(inputs[0]).val();
    columns = $(inputs[1]).val();
    createModel(nameOfRows);
    close.click();
    $('.openModelTable').attr('data-target', '#nameOfRows').click();
    $('.openModelTable').attr('data-target', dataTaregtOld);
  }

})


const validate = (inputs, length, typeInput , errors = []) => {
  if (!length)
    return  errors;

  const input = $(inputs[length - 1]);
       let condition ;
   if(typeInput !== 'number')
        condition = (input.val() !== '')
   else
     condition = ( input.val() !== '' && input.val() <= parseInt(input.attr('max'))  && input.val() >= parseInt(input.attr('min')));

  if(condition){
    input.addClass('valid').removeClass('invalid');
  }else {
    input.addClass('invalid').removeClass('valid');
    errors.push(condition);
  }

  return validate(inputs.slice(0, length - 1), length - 1,typeInput , errors);
}



let sendData = DATA => {
  $.post('./php/mange_request.php', {data : DATA}).done(res => $('.my-table').html(res));
}



$('.informationRow').click(function () {

  let inputs = $('#nameOfRows').find('.modal-body input'), // get inputs
      close = $('#nameOfRows').find('.close'), // get button close
      valuesOfRows = $('#valueOfRows').find('.modal-body'); // get inputs

  if(!validate(inputs, inputs.length, 'text').includes(false)){
    getDataHeader(inputs, inputs.length);
    createModel(valuesOfRows,dataTable[0]);
    $('.openModelTable').attr('data-target', '#valueOfRows').click();
    close.click();
  }

})

$('.valuesRow').click(function () {

  let inputs = $('#valueOfRows').find('.modal-body input'), // get inputs
      close = $('#valueOfRows').find('.close'), // get button close
      valuesOfRows = $('#valueOfRows').find('.modal-body'), // get inputs
      dataTaregtOld = $('.openModelTable').attr('data-target');

  if(!validate(inputs, inputs.length, 'text').includes(false)){
    getDataValues(inputs);
    createModel(valuesOfRows,dataTable[0]);
    $('.openModelTable').attr('data-target', '#valueOfRows').click();
    $('.openModelTable').attr('data-target', dataTaregtOld).click();
    $('.wrapper-editor').removeClass('d-none');
    $('.openModelTable').addClass('d-none');
    sendData(dataTable);
    close.click();
  }

})




let createModel = (place, names = []) => {
  let input = '';
  if(names.length){
    for (let j = 0; j < rows; j++ ){
      input += `<h4 class="modal-title w-100 font-weight-bold mb-5 mt-5"> ${j + 1})  Row </h4>`;
      for (let i = 0; i < columns; ++i){
        let name =  names[i];
        const ID = uniqid();
        input += `        
              <div class="md-form mb-4">
                    <input type="text" id="${ID}" class="form-control validate" required>
                    <label data-error="wrong" data-success="right" for="${ID}" >${name}</label>
               </div>`
      }
    }
  }else{
    for (let i = 0; i < columns; ++i){
      let name = `Name Of Column ${i + 1}`;
      const ID = uniqid();
      input += `        
              <div class="md-form mb-4">
                    <input type="text" id="${ID}" class="form-control validate" required>
                    <label data-error="wrong" data-success="right" for="${ID}" >${name}</label>
               </div>`
    }
  }
  place.html(input);
}



const uniqid = () => Math.random().toString(16).slice(2)+(new Date()).getTime()+Math.random().toString(16).slice(2);




let getDataHeader = (inputs) => {
  let  data = [];

  for (let i = 0; i < inputs.length; ++i){
    data.push($(inputs[i]).val());
  }

  dataTable.push(data);
}


let getDataValues = inputs => {
  for (let j = 0; j < inputs.length; j++){
    let  data = [];
    for (let i = 0; i < columns; ++i){
      data.push($(inputs[j]).val());
    }
    j += columns;
    dataTable.push(data);
  }
}
