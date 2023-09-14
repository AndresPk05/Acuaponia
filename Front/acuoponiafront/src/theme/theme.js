import {createTheme} from '@material-ui/core/styles';

// Se generan paleta de colores con la herramienta https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=303F9F&primary.text.color=FFB300
const theme = createTheme({
    palette :{
        primary:{
            light: "#666ad1", // color hover
            main: "#303f9f", // color base pagina
            dark: "#001970", // color oscuro
            contrastText: "#ffb300" // color texto
        }
    }
});

export default theme;