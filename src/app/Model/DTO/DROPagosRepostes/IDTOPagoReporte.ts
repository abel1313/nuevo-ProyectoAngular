export interface IDTOPagoReporte
{
	id?: number;
    nombreCliente: string;
	totalVenta: number;
	pagoRealizado: number;
	fechaDeposito: string;
	adeudo: number;
	totalPagos:number;
}