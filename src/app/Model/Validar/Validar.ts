


export class Validar
{


    constructor(){}
    validarDatos()
    {         
          // Example starter JavaScript for disabling form submissions if there are invalid fields
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
          .forEach(function (form: any) {
            form.addEventListener('submit', function (event: any) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
           
              }
              form.classList.add('was-validated')
            }, false)
          });
        
        }

}