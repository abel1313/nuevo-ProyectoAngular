const host: string = 'localhost:';
const port: string = '8080';
const nombreProyecto: string = 'ferreteria';

export const environment = {
  production: true,
  appUri: `http://${host}${port}/${nombreProyecto}`
};
