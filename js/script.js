const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll('.filter button'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterslider = document.querySelector('.silder input'),
rotateOption = document.querySelectorAll('.rotate button'),
previewImage = document.querySelector('.preview-image img'),
resetFilter = document.querySelector('.reset-filter'),
chooseImage = document.querySelector('.choose-image'),
saveImage = document.querySelector('.save-image');


// Set Options
let brightness = 100 , saturation = 100 , inversion = 0 , grayscale = 0 ;
let rotate = 0, flipHorizontal = 1 ,flipVertical = 1;


// genrate function applyFliters
const applyFliters = () => {
  previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
  previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}





// Function To Slect Image and add in place
const loadImage = () =>{
  let file = fileInput.files[0];  //getting file select image
  if(!file)return; //return if user not select
  previewImage.src = URL.createObjectURL(file);//passing image to preview image
  previewImage.addEventListener('load',() => {
    resetFilter.click();
    document.querySelector('.container').classList.remove('disable');
  });
} 


// Function To Remove active for all and add to click
filterOptions.forEach(option => {
  option.addEventListener('click' , () =>{
    document.querySelector('.filter .active').classList.remove('active');
    option.classList.add('active');
    filterName.innerText = option.innerText;

    if(option.id === "brightness"){
      filterslider.max ="200";
      filterslider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    }else if(option.id === "saturation"){
      filterslider.max ="200";
      filterslider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    }else if(option.id === "inversion"){
      filterslider.max ="100";
      filterslider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    }else{
      filterslider.max ="100";
      filterslider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  }); 
});




// function to update filter (Range)
const updateFilter = () => {
  filterValue.innerText = `${filterslider.value}%`;
  const selectedFilter = document.querySelector('.filter .active');//getting selected filter btn active now
  if(selectedFilter.id === "brightness"){
    brightness = filterslider.value;
  }else if(selectedFilter.id === "saturation"){
    saturation = filterslider.value;
  }else if(selectedFilter.id === "inversion"){
    inversion = filterslider.value;
  }else{
    grayscale = filterslider.value;
  }
  applyFliters();
}


// rotate and flip
rotateOption.forEach(option => {
  option.addEventListener('click',() => {
    if(option.id === "left"){
      rotate -=90;
    }else if(option.id === "left"){
      rotate +=90;
    }else if(option.id === "horizontal"){
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    }else{
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFliters();
  });
});

// function to return defult value to variable
const resetValue = () => {
  // Return All Value To Defult Value
  brightness = 100 ; saturation = 100 ; inversion = 0 ; grayscale = 0 ;
  rotate = 0; flipHorizontal = 1 ;flipVertical = 1;
  filterOptions[0].click();
  applyFliters();
}


// function to save change and new value
const saveImageChange = () => {
  const canvas = document.createElement('canvas');//to create canvas
  const cxt = canvas.getContext('2d');//to return draw in canvas(new image)
  canvas.width = previewImage.naturalWidth;
  canvas.height = previewImage.naturalHeight;
  cxt.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  cxt.translate(canvas.width / 2 ,canvas.height / 2);
  if(rotate !==0){
    cxt.rotate(rotate * Math.PI / 180);
  }
  cxt.scale(flipHorizontal ,flipVertical);
  cxt.drawImage(previewImage , -canvas.width / 2 ,-canvas.height / 2,canvas.width,canvas.height);
  const link = document.createElement('a');
  link.download = 'image.jpg';
  link.href = canvas.toDataURL();
  link.click();
}




fileInput.addEventListener('change',loadImage);
filterslider.addEventListener('input', updateFilter);
resetFilter.addEventListener('click' , resetValue);
saveImage.addEventListener('click' , saveImageChange);
chooseImage.addEventListener('click',() => fileInput.click());