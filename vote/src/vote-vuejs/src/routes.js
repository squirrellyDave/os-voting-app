import Vue from 'vue'

// Wir binden den vue-router ein und weisen Vue.js an, diesen zu verwenden
import VueRouter from 'vue-router'
Vue.use(VueRouter);

// Wir brauchen nicht die Dateinamenserweiterung angeben, Vue.js ergänzt automatisch .vue an die 'import' Statements
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'

// In diesem Array werden alle Routes der Anwendung definiert und anschließend dem instantiierten VueRouter Objekt als Parameter übergeben
const routes = [    
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '*', // '*' ist für alle sonstigen erdenklichen Pfade, die wir witer oben nicht explizit für die App vorgesehen haben, dieser Fallback muss ganz unten im Array stehen!
        name: 'NotFound', // Optionales Attribut
        component: NotFound // Die Komponente, die unter diesem Pfad aufgerufen werden soll
    }
]

const router = new VueRouter({
    mode: 'history', // Achtung: Viele ISPs unterstützen diesen Modus nicht, der dafür sorgt, dass die URL lesbarer wird (ohne '/#' im Pfad)
    //base: process.env.BASE_URL,
    routes
});

// Globaler Route Guard, der *für jede* oben definierte Route ausgeführt wird
//router.beforeEach((to, from, next) => {    
//});

/* Der folgende Befehl definiert, dass dieses Modul (d.h. diese Datei) standardmäßig nur das oben definierte 'router' Objekt exportiert.
   Ein Import dieses 'router' Objekts erfolgt dann mit: "import router from './routes'" (der Pfad ist relativ zu schreiben, die Erweiterung .js ergänzt Vue.js automatisch).
   Ansonsten wäre der Import einzig des 'router' Objekts mit folgendem Befehl zu bewerkstelligen: "import { router } from './routes'".
*/
export default router; 