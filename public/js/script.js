(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  })
  let taxSwitch=document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click",()=>{
    let taxInfo=document.getElementsByClassName("tax-info")
    for(info of taxInfo){
      if(info.style.display!="inline"){
        info.style.display="inline";
      }
      else{
        info.style.display="none";
      }
    }
  })
const icons = document.getElementsByClassName("icon1");
const icon2 = document.getElementsByClassName("icon");
const rightArrow = document.getElementById("right-arrow");
clicking=1;
rightArrow.addEventListener('click', ()=> {
      console.log("clicked");
      console.log(icons);
      if(clicking==0){
        for(icon of icons){
          icon.style.display="inline";
        }
        for (icont of icon2){
          icont.style.display="inline";
        }
        clicking+=1;
      }
      else if(clicking%2!=0){
        for(icon of icons){
          icon.style.display="none";
        }
        for (icont of icon2){
          icont.style.display="inline";
        }
        clicking+=1;
      }
     else{
      for(icon of icons){
        icon.style.display="inline";
      }
      for (icont of icon2){
        icont.style.display="none";
      }
      clicking+=1;
     }
      
});
// const icon3 = document.getElementsByClassName("icon3");
// const icon4 = document.getElementsByClassName("icon4");
// const icon5 = document.getElementsByClassName("icon5");
// const rightArrow2 = document.getElementById("right-arrow2");
// clicking2=0;
// rightArrow2.addEventListener('click', ()=> {
//   console.log(clicking2);
//        if(clicking2%3==0){
//         for(icon of icon3){
//           icon.style.display="none";
//         }
//         for (iconb of icon4){
//           iconb.style.display="none";
//         }
//         for (iconc of icon5){
//           iconc.style.display="inline";
//         }
//         clicking2+=1;
//       }
//       else if(clicking2%2!=0){
//         for(icon of icon3){
//           icon.style.display="inline";
//         }
//         for (iconb of icon4){
//           iconb.style.display="none";
//         }
//         for (iconc of icon5){
//           iconc.style.display="none";
//         }
//         clicking2+=1;
//       }
//      else{
//       for(icon of icon3){
//         icon.style.display="none";
//       }
//       for (iconb of icon4){
//         iconb.style.display="inline";
//       }
//       for (iconc of icon5){
//         iconc.style.display="none";
//       }
//       clicking2+=1;
//      }    
// });

