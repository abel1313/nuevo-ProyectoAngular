import { NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceFerreteriaService } from "src/app/Service/service-ferreteria.service";
import { ICliente } from "../Clientes/ICliente";
import { IDireccion } from "../Direccion/IDireccion";



export class VentasServidor
{

    private guardarCliente$: Observable<ICliente>;
    private guardarDireccion$: Observable<IDireccion>;

    private idCliente : number;
    public constructor( private _ngZone: NgZone, 
        private service: ServiceFerreteriaService )
        {
            this.idCliente = 0;
        }
    public ejemplo( addCliente: Boolean, cliente: ICliente ): number
    {
        
        if( addCliente)
        {

            return cliente.id;
        }else
        {
     
         this.addCliente( cliente );


            setTimeout(() => {
                return this.idCliente;
            }, 3000);
        }
    }


      
      
 

    public addCliente( cliente: ICliente)
    {
        return new Promise( (resolve, err )=>
        {
            this._ngZone.runOutsideAngular(()=>
            {
                this.guardarCliente$ = this.service.serviceCliente.guardarCliente(cliente);
                this.guardarCliente$.subscribe
                (
                    (res: ICliente)=>
                    {
                        this._ngZone.run(()=>
                        {
                            this.idCliente = res.id;
                            
                            
                                resolve(res.id);
                            //    sessionStorage.setItem("idCliente", JSON.stringify(res.id) );
                            
      
                        });
                    }
                    ,err=>console.log(err)
                );
            });
        });
    }
    public addDireccion( direccion: IDireccion )
    {
        this._ngZone.runOutsideAngular(()=>
        {
            this.guardarDireccion$ = this.service.serviceDireccion
            .guardarDireccion(direccion);
            this.guardarDireccion$.subscribe
            (
                (res: IDireccion)=>
                {
                    this._ngZone.run(()=>
                    {
                        sessionStorage.setItem("idDireccion", JSON.stringify(res.id) );
  
                    });
                }
                ,err=>console.log(err)
            );
        });
    }

}